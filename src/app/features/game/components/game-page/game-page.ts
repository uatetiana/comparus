import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../../services/game.service';
import { GameGrid } from '../game-grid/game-grid';
import { GameControls } from '../game-controls/game-controls';
import { GameScore } from '../game-score/game-score';

@Component({
  standalone: true,
  selector: 'app-game-page',
  imports: [CommonModule, MatCardModule, GameGrid, GameControls, GameScore],
  templateUrl: './game-page.html',
  styleUrls: ['./game-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePage {
  gameService = inject(GameService);
  vm$ = this.gameService.vm$;
}
