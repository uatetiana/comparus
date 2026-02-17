import { ChangeDetectionStrategy, Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import type { GameState } from '../../services/game.service';
import { GameService } from '../../services/game.service';

@Component({
  standalone: true,
  selector: 'app-game-controls',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './game-controls.html',
  styleUrls: ['./game-controls.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControls implements OnChanges {
  private gameService = inject(GameService);

  @Input({ required: true }) vm!: GameState;

  nControl = new FormControl<number>(1000, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(100), Validators.max(5000)],
  });

  ngOnChanges() {
    if (!this.vm) return;

    if (this.vm.status === 'running') {
      this.nControl.disable({ emitEvent: false });
    } else {
      this.nControl.enable({ emitEvent: false });
    }
  }

  onStart() {
    if (this.nControl.invalid) {
      this.nControl.markAsTouched();
      return;
    }

    this.gameService.setN(this.nControl.value);
    this.gameService.start();
  }

  onRestart() {
    if (this.nControl.valid) {
      this.gameService.setN(this.nControl.value);
    }
    this.gameService.start();
  }

  get isRunning() {
    return this.vm.status === 'running';
  }

  onReset() {
    this.gameService.reset();
  }
}
