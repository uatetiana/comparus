import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subscription, timer, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResultDialog, ResultDialogData } from '../components/result-dialog/result-dialog';
import type { Cell } from '../../../core/models/cell.model';
import { createInitialGrid } from '../../../core/models/cell.model';

export type GameStatus = 'idle' | 'running' | 'ended';
export type Winner = 'player' | 'computer' | null;

export interface GameState {
  grid: Cell[];

  countdown: number | null;

  nMs: number;

  playerScore: number;
  computerScore: number;

  status: GameStatus;

  highlightedId: number | null;

  winner: Winner;

  message?: string | null;
}

export const DEFAULT_N_MS = 1000;
export const WIN_SCORE = 10;

export const initialGameState: GameState = {
  grid: createInitialGrid(),
  countdown: null,
  nMs: DEFAULT_N_MS,
  playerScore: 0,
  computerScore: 0,
  status: 'idle',
  highlightedId: null,
  winner: null,
  message: null,
};

@Injectable({ providedIn: 'root' })
export class GameService {
  private dialog = inject(MatDialog);

  private readonly stateSubject = new BehaviorSubject<GameState>({ ...initialGameState });
  readonly vm$ = this.stateSubject.asObservable();

  private timeoutSub: Subscription | null = null;

  private get state(): GameState {
    return this.stateSubject.value;
  }

  private setState(patch: Partial<GameState>) {
    this.stateSubject.next({ ...this.state, ...patch });
  }

  setN(ms: number) {
    const n = Number(ms);
    if (!Number.isFinite(n)) {
      this.setState({ message: 'N must be a number' });
      return;
    }
    if (n < 100 || n > 5000) {
      this.setState({ message: 'Time must be between 100 and 5000 ms' });
      return;
    }

    if (this.state.status === 'running') return;

    this.setState({ nMs: n, message: null });
  }

  start() {
    this.clearTimer();

    const nMs = this.state.nMs;

    this.stateSubject.next({
      ...initialGameState,
      grid: createInitialGrid(),
      status: 'idle',
      nMs,
      countdown: 3,
    });

    let count = 3;

    const interval = setInterval(() => {
      count--;

      if (count > 0) {
        this.setState({ countdown: count });
      } else {
        clearInterval(interval);

        this.setState({
          countdown: null,
          status: 'running',
        });

        this.pickNextCell();
      }
    }, 1000);
  }

  reset() {
    this.clearTimer();

    this.stateSubject.next({
      ...initialGameState,
      grid: createInitialGrid(),
      nMs: this.state.nMs,
    });
  }

  handleCellClick(cellId: number) {
    if (this.state.status !== 'running') return;
    if (this.state.highlightedId == null) return;
    if (this.state.highlightedId !== cellId) return;

    this.markPlayerHit(cellId);
  }

  // ---------- internals ----------

  private pickNextCell() {
    if (this.state.status !== 'running') return;

    // available = only BLUE cells (not final red/green, and not current yellow)
    const available = this.state.grid.filter((c) => c.color === 'blue');

    // If no blue cells left, end game (edge case)
    if (available.length === 0) {
      this.endGame(null);
      return;
    }

    const random = available[Math.floor(Math.random() * available.length)];

    const grid = this.updateCellColor(this.state.grid, random.id, 'yellow');

    this.setState({ grid, highlightedId: random.id });

    this.startTimer();
  }

  private startTimer() {
    this.clearTimer();

    const nMs = this.state.nMs;

    this.timeoutSub = timer(nMs).subscribe(() => {
      if (this.state.status !== 'running') return;

      const id = this.state.highlightedId;
      if (id === null) return;

      this.markTimeout(id);
    });
  }

  private markPlayerHit(id: number) {
    this.score(id, 'green', 'player');
  }

  private markTimeout(id: number) {
    this.score(id, 'red', 'computer');
  }

  private score(id: number, color: 'green' | 'red', scorer: 'player' | 'computer') {
    this.clearTimer();

    const grid = this.updateCellColor(this.state.grid, id, color);

    const scoreKey = scorer === 'player' ? 'playerScore' : 'computerScore';

    const newScore = this.state[scoreKey] + 1;

    this.setState({
      grid,
      [scoreKey]: newScore,
      highlightedId: null,
    } as Partial<GameState>);

    if (newScore >= WIN_SCORE) {
      this.endGame(scorer);
      return;
    }

    this.pickNextCell();
  }

  private endGame(winner: 'player' | 'computer' | null) {
    this.clearTimer();

    this.setState({
      status: 'ended',
      winner,
      highlightedId: null,
    });

    if (!winner) {
      return;
    }

    const data: ResultDialogData = {
      winner,
      playerScore: this.state.playerScore,
      computerScore: this.state.computerScore,
    };

    const ref = this.dialog.open(ResultDialog, {
      disableClose: true,
      data,
    });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result === 'restart') {
          this.start();
        }
      });
  }

  private clearTimer() {
    this.timeoutSub?.unsubscribe();
    this.timeoutSub = null;
  }

  private updateCellColor(grid: Cell[], id: number, color: Cell['color']): Cell[] {
    return grid.map((cell) => (cell.id === id ? { ...cell, color } : cell));
  }
}
