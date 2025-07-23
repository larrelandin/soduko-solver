import { useState } from "react";
import { solveSudoku } from "../lib/solveSudoku";

export default function Home() {
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );
  const [initialBoard, setInitialBoard] = useState<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  );

  const handleTest = () => {
    const test = [
      [0, 2, 0, 0, 0, 3, 0, 0, 0],
      [8, 9, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 3, 0, 0, 8, 6, 1, 0],
      [0, 0, 0, 0, 5, 9, 3, 0, 0],
      [0, 5, 6, 1, 0, 2, 7, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 8, 0],
      [0, 0, 7, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 0, 0, 0, 2, 0, 9],
      [0, 0, 9, 3, 0, 0, 0, 0, 0],
    ];
    setBoard(test);
    setInitialBoard(test.map((row) => row.map((v) => v !== 0)));
  };

  const handleSolve = () => {
    const copy = board.map((row) => [...row]);
    solveSudoku(copy);
    setBoard(copy);
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (value === "") {
      const updated = board.map((r) => [...r]);
      updated[row][col] = 0;
      setBoard(updated);
      const initialCopy = initialBoard.map((r) => [...r]);
      initialCopy[row][col] = false;
      setInitialBoard(initialCopy);
      return;
    }

    if (/^[1-9]$/.test(value)) {
      const updated = board.map((r) => [...r]);
      updated[row][col] = parseInt(value, 10);
      setBoard(updated);
      const initialCopy = initialBoard.map((r) => [...r]);
      initialCopy[row][col] = true;
      setInitialBoard(initialCopy);
    }
  };

  const getCellStyle = (row: number, col: number) => ({
    width: "40px",
    height: "40px",
    textAlign: "center" as const,
    fontWeight: initialBoard[row][col] ? "bold" : "normal",
    border: "1px solid #000",
    borderLeftWidth: col === 3 || col === 6 || col === 0 ? "3px" : "1px",
    borderTopWidth: row === 3 || row === 6 || row === 0 ? "3px" : "1px",
    borderRightWidth: col === 8 ? "3px" : "1px",
    borderBottomWidth: row === 8 ? "3px" : "1px",
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sudoku-lösare</h1>
      <button onClick={handleTest} style={{ marginBottom: "1rem" }}>
        TEST
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gap: 0,
        }}
      >
        {board.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val === 0 ? "" : val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              style={getCellStyle(i, j)}
            />
          ))
        )}
      </div>
      <button onClick={handleSolve} style={{ marginTop: "1rem" }}>
        Lös
      </button>
    </div>
  );
}
