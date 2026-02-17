import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ResultDialogData {
  winner: 'player' | 'computer';
  playerScore: number;
  computerScore: number;
}

@Component({
  standalone: true,
  selector: 'app-result-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './result-dialog.html',
})
export class ResultDialog {
  readonly data = inject<ResultDialogData>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<ResultDialog>);

  restart() {
    this.dialogRef.close('restart');
  }

  close() {
    this.dialogRef.close('close');
  }
}
