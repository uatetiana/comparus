export type CellColor = 'blue' | 'yellow' | 'green' | 'red';

export interface Cell {
  /** 0..99 */
  id: number;
  color: CellColor;
}

export const GRID_SIZE = 10;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

export function createInitialGrid(): Cell[] {
  return Array.from({ length: TOTAL_CELLS }, (_, id) => ({
    id,
    color: 'blue' as const,
  }));
}

export function isFinalCellColor(color: CellColor): boolean {
  return color === 'green' || color === 'red';
}
