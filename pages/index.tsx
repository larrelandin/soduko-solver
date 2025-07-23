import { useState } from "react";
import { solveSudoku } from "../lib/solveSudoku";

export default function Home() {
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  const handleSolve = () => {
    const copy = board.map((row) => [...row]);
    solveSudoku(copy);
    setBoard(copy);
  };

  const handleChange = (row: number, col: number, value: string) => {
    const updated = board.map((r) => [...r]);
    const num = parseInt(value);
    updated[row][col] = isNaN(num) ? 0 : num;
    setBoard(updated);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sudoku-lösare</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gap: "4px",
        }}
      >
        {board.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val === 0 ? "" : val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              style={{ width: "40px", height: "40px", textAlign: "center" }}
              min="1"
              max="9"
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
