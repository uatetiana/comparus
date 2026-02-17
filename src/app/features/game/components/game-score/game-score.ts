import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import type { GameState } from '../../services/game.service';

@Component({
  standalone: true,
  selector: 'app-game-score',
  imports: [CommonModule, MatChipsModule],
  templateUrl: './game-score.html',
  styleUrls: ['./game-score.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameScore {
  @Input({ required: true }) vm!: GameState;
}
