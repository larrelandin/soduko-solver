export function solveSudoku(board: number[][]): boolean {
  const rowHas = (row: number, num: number): boolean =>
    board[row].includes(num);

  const colHas = (col: number, num: number): boolean =>
    board.some((r) => r[col] === num);

  /**
   * Return all empty cells in the given row where the column does not
   * already contain the digit.
   */
  const rowCandidates = (row: number, num: number): [number, number][] => {
    const candidates: [number, number][] = [];
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) continue;
      if (colHas(col, num)) continue;
      candidates.push([row, col]);
    }
    return candidates;
  };

  /**
   * Return all empty cells in the given column where the row does not
   * already contain the digit.
   */
  const columnCandidates = (col: number, num: number): [number, number][] => {
    const candidates: [number, number][] = [];
    for (let row = 0; row < 9; row++) {
      if (board[row][col] !== 0) continue;
      if (rowHas(row, num)) continue;
      candidates.push([row, col]);
    }
    return candidates;
  };

  let changed = true;
  while (changed) {
    changed = false;

    // Try placing each digit in rows where it fits in exactly one column
    for (let num = 1; num <= 9; num++) {
      for (let row = 0; row < 9; row++) {
        if (rowHas(row, num)) continue;
        const positions = rowCandidates(row, num);
        if (positions.length === 1) {
          const [, col] = positions[0];
          board[row][col] = num;
          changed = true;
        }
      }

      // Then check each column for a single possible row
      for (let col = 0; col < 9; col++) {
        if (colHas(col, num)) continue;
        const positions = columnCandidates(col, num);
        if (positions.length === 1) {
          const [row] = positions[0];
          board[row][col] = num;
          changed = true;
        }
      }
    }
  }

  // After no more placements can be made, verify there are no empty cells
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return true;
}
