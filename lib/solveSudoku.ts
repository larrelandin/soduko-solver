export function solveSudoku(board: number[][]): boolean {
  const rowHas = (row: number, num: number): boolean =>
    board[row].includes(num);

  const colHas = (col: number, num: number): boolean =>
    board.some((r) => r[col] === num);

  const boxHas = (
    startRow: number,
    startCol: number,
    num: number
  ): boolean => {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[startRow + r][startCol + c] === num) return true;
      }
    }
    return false;
  };

  const possiblePositions = (
    num: number,
    startRow: number,
    startCol: number
  ): [number, number][] => {
    const positions: [number, number][] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const row = startRow + r;
        const col = startCol + c;
        if (board[row][col] !== 0) continue;
        if (rowHas(row, num) || colHas(col, num)) continue;
        positions.push([row, col]);
      }
    }
    return positions;
  };

  let changed = true;
  while (changed) {
    changed = false;
    for (let num = 1; num <= 9; num++) {
      for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {
          if (boxHas(boxRow, boxCol, num)) continue;
          const positions = possiblePositions(num, boxRow, boxCol);
          if (positions.length === 1) {
            const [r, c] = positions[0];
            board[r][c] = num;
            changed = true;
          }
        }
      }
    }
  }

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return true;
}
