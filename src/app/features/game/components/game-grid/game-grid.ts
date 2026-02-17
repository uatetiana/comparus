import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Cell } from '../../../../core/models/cell.model';

@Component({
  selector: 'app-game-grid',
  imports: [CommonModule],
  templateUrl: './game-grid.html',
  styleUrl: './game-grid.scss',
})
export class GameGrid {
  @Input({ required: true }) grid!: Cell[];
  @Output() cellClick = new EventEmitter<number>();

  trackById = (_: number, cell: Cell) => cell.id;

  onCellClick(id: number) {
    this.cellClick.emit(id);
  }
}
