import type { Cell } from './cell.model';
import { createInitialGrid } from './cell.model';

export type GameStatus = 'idle' | 'running' | 'ended';
export type Winner = 'player' | 'computer' | null;

export interface GameState {
  grid: Cell[];

  /** time limit in milliseconds */
  nMs: number;

  playerScore: number;
  computerScore: number;

  status: GameStatus;

  /** currently highlighted yellow cell id */
  highlightedId: number | null;

  winner: Winner;
}

export const DEFAULT_N_MS = 1000;
export const WIN_SCORE = 10;

export const initialGameState: GameState = {
  grid: createInitialGrid(),
  nMs: DEFAULT_N_MS,
  playerScore: 0,
  computerScore: 0,
  status: 'idle',
  highlightedId: null,
  winner: null,
};
