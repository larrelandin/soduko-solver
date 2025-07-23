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
    if (value === "") {
      const updated = board.map((r) => [...r]);
      updated[row][col] = 0;
      setBoard(updated);
      return;
    }

    if (/^[1-9]$/.test(value)) {
      const updated = board.map((r) => [...r]);
      updated[row][col] = parseInt(value, 10);
      setBoard(updated);
    }
  };

  const getCellStyle = (row: number, col: number) => ({
    width: "40px",
    height: "40px",
    textAlign: "center" as const,
    border: "1px solid #000",
    borderRightWidth: col === 2 || col === 5 ? "3px" : "1px",
    borderBottomWidth: row === 2 || row === 5 ? "3px" : "1px",
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sudoku-lösare</h1>
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
