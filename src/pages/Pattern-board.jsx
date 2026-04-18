import { useState, useEffect } from "react";

export default function PatternBoard() {
  const [rows, setRows] = useState("5");
  const [cols, setCols] = useState("5");
  const [grid, setGrid] = useState([]);
  const [condition, setCondition] = useState("");
  const [customCondition, setCustomCondition] = useState("");

  const getSafeNumber = (value) => {
    if (value === "") return 0;
    return Math.max(1, Math.min(11, Number(value)));
  };

  useEffect(() => {
    const r = getSafeNumber(rows);
    const c = getSafeNumber(cols);

    if (r === 0 || c === 0) {
      setGrid([]);
      return;
    }

    const newGrid = Array.from({ length: r }, (_, i) =>
      Array.from({ length: c }, (_, j) => ({ i: i + 1, j: j + 1 })),
    );

    setGrid(newGrid);
  }, [rows, cols]);

  const evaluateCondition = (i, j) => {
    const r = getSafeNumber(rows);
    const c = getSafeNumber(cols);

    switch (condition) {
      case "i>=j":
        return i >= j;
      case "i<=j":
        return i <= j;
      case "i==j":
        return i === j;
      case "i+j==col+1":
        return i + j === c + 1;
      case "i+j<=col+1":
        return i + j <= c + 1;
      case "i+j>=col+1":
        return i + j >= c + 1;
      case "i==row/2+1":
        return i === Math.ceil(r / 2);
      case "j==col/2+1":
        return j === Math.ceil(c / 2);

      case "custom":
        try {
          // Replace variables safely
          const expr = customCondition
            .replace(/i/g, i)
            .replace(/j/g, j)
            .replace(/col/g, c)
            .replace(/n/g, r);

          return Function(`"use strict"; return (${expr})`)();
        } catch {
          return false;
        }

      default:
        return false;
    }
  };
  const isInvalid =
    (rows !== "" && (Number(rows) < 1 || Number(rows) > 11)) ||
    (cols !== "" && (Number(cols) < 1 || Number(cols) > 11));

  const conditions = [
    "i>=j",
    "i<=j",
    "i==j",
    "i+j==col+1",
    "i+j<=col+1",
    "i+j>=col+1",
    "i==row/2+1",
    "j==col/2+1",
    "custom",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f11",
        fontFamily: "'IBM Plex Mono', monospace",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          borderRight: "1px solid #1e1e24",
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          background: "#0f0f11",
        }}
      >
        {/* Header */}
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "#4a4a5a",
              marginBottom: "4px",
              textTransform: "uppercase",
            }}
          >
            Pattern Board
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#e8e8f0",
              letterSpacing: "-0.02em",
            }}
          >
            Loop Visualizer
          </div>
        </div>

        {/* Inputs */}
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#4a4a5a",
              marginBottom: "12px",
              textTransform: "uppercase",
            }}
          >
            Dimensions
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#6b6b80",
                  marginBottom: "6px",
                }}
              >
                Rows (i)
              </label>
              <input
                type="number"
                value={rows}
                max={11}
                onChange={(e) => setRows(e.target.value)}
                placeholder="Rows"
                style={{
                  width: "100%",
                  height: "36px",
                  background: "#17171e",
                  border: "1px solid #2a2a35",
                  borderRadius: "6px",
                  color: "#c8f7a0",
                  fontSize: "14px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  padding: "0 10px",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#6b6b80",
                  marginBottom: "6px",
                }}
              >
                Cols (j)
              </label>
              <input
                type="number"
                value={cols}
                onChange={(e) => setCols(e.target.value)}
                placeholder="Cols"
                style={{
                  width: "100%",
                  height: "36px",
                  background: "#17171e",
                  border: "1px solid #2a2a35",
                  borderRadius: "6px",
                  color: "#7ab8f5",
                  fontSize: "14px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  padding: "0 10px",
                  outline: "none",
                }}
              />
            </div>
          </div>
          {isInvalid && (
            <p
              style={{
                marginTop: "10px",
                fontSize: "11px",
                color: "#ff6b6b",
                background: "#1a0f0f",
                border: "1px solid #3a1f1f",
                padding: "6px 10px",
                borderRadius: "6px",
                letterSpacing: "0.03em",
              }}
            >
              ⚠ Enter values between 1 and 11
            </p>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#1e1e24" }} />

        {/* Conditions */}
        <div>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#4a4a5a",
              marginBottom: "12px",
              textTransform: "uppercase",
            }}
          >
            Condition
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px",
            }}
          >
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => setCondition(cond)}
                style={{
                  gridColumn: cond === "custom" ? "1 / -1" : "auto", // ✅ full width
                  height: "34px",
                  padding: "0 12px",
                  borderRadius: "6px",
                  border:
                    condition === cond
                      ? "1px solid #3a5a3a"
                      : "1px solid #1e1e24",
                  background: condition === cond ? "#1a2e1a" : "transparent",
                  color: condition === cond ? "#c8f7a0" : "#5a5a70",
                  fontSize: "12px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  cursor: "pointer",
                  textAlign: "left",
                  letterSpacing: "0.02em",
                  transition: "all 0.15s",
                }}
              >
                {condition === cond && (
                  <span style={{ color: "#6dbf60", marginRight: "8px" }}>
                    ▶
                  </span>
                )}
                {cond}
              </button>
            ))}
            <div
              style={{
                gridColumn: "1 / -1",
                maxHeight: condition === "custom" ? "60px" : "0px",
                opacity: condition === "custom" ? 1 : 0,
                overflow: "hidden",
                transform:
                  condition === "custom"
                    ? "translateY(0)"
                    : "translateY(-10px)",
                transition: "all 0.3s ease",
              }}
            >
              <input
                type="text"
                value={customCondition}
                onChange={(e) => setCustomCondition(e.target.value)}
                placeholder="e.g. i%2==0 && j%2==1"
                style={{
                  marginTop: "6px",
                  width: "100%",
                  height: "34px",
                  background: "#17171e",
                  border: "1px solid #2a2a35",
                  borderRadius: "6px",
                  color: "#f5a67a",
                  fontSize: "12px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  padding: "0 10px",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#1e1e24" }} />

        {/* Code block */}
      </aside>

      {/* Grid area */}
      <main style={{ flex: 1, padding: "28px", overflow: "auto" }}>
        {/* Column header */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "6px",
            paddingLeft: "2px",
          }}
        >
          <div style={{ width: "20px", flexShrink: 0 }} />
          {Array.from({ length: getSafeNumber(cols) }, (_, j) => (
            <div
              key={j}
              style={{
                width: "56px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "#bebebe",
                letterSpacing: "0.05em",
                flexShrink: 0,
              }}
            >
              j={j + 1}
            </div>
          ))}
        </div>

        {/* Rows */}
        {grid.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: "flex",
              gap: "6px",
              marginBottom: "6px",
              alignItems: "center",
            }}
          >
            {/* Row label */}
            <div
              style={{
                width: "20px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                color: "#bebebe",
                flexShrink: 0,
                //   writingMode: "vertical-rl",
                letterSpacing: "0.05em",
              }}
            >
              i={ri + 1}
            </div>

            {row.map((cell, ci) => {
              const lit = evaluateCondition(cell.i, cell.j);
              return (
                <div
                  key={ci}
                  style={{
                    width: "56px",
                    height: "56px",
                    flexShrink: 0,
                    position: "relative",
                    border: lit ? "1px solid #2a4a2a" : "1px solid #1a1a22",
                    borderRadius: "7px",
                    background: lit ? "#111a11" : "#0d0d12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                >
                  {/* i badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "3px",
                      fontSize: "8px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#2e6b2e",
                      background: "#0f1f0f",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      lineHeight: "1.4",
                    }}
                  >
                    i={cell.i}
                  </div>

                  {/* star */}
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: lit ? "#c8f7a0" : "transparent",
                      transition: "color 0.15s",
                      lineHeight: 1,
                    }}
                  >
                    *
                  </span>

                  {/* j badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "3px",
                      right: "3px",
                      fontSize: "8px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#2a4f7a",
                      background: "#0c1420",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      lineHeight: "1.4",
                    }}
                  >
                    j={cell.j}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {grid.length === 0 && (
          <div
            style={{ color: "#3a3a4a", fontSize: "13px", padding: "40px 0" }}
          >
            Enter valid row and column values to generate the grid.
          </div>
        )}
      </main>

      <div
        style={{
          width: "260px",
          flexShrink: 0,
          borderRight: "1px solid #1e1e24",
          padding: "28px 20px",
          gap: "28px",
          background: "#0f0f11",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "#4a4a5a",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          Generated C Program
        </div>
        <pre
          style={{
            background: "#0a0a0d",
            border: "1px solid #1e1e24",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "10px",
            lineHeight: "1.7",
            color: "#5a5a70",
            overflow: "auto",
            margin: 0,
          }}
        >
          <span style={{ color: "#7ab8f5" }}>#include </span>
          <span style={{ color: "#f5a67a" }}>&lt;stdio.h&gt;</span>
          {"\n\n"}
          <span style={{ color: "#7ab8f5" }}>int </span>
          <span style={{ color: "#c8f7a0" }}>main</span>
          <span style={{ color: "#e8e8f0" }}>() {"{"}</span>
          {"\n    "}
          <span style={{ color: "#7ab8f5" }}>int </span>
          <span style={{ color: "#e8e8f0" }}>row=</span>
          <span style={{ color: "#f5a67a" }}>{rows}</span>
          <span style={{ color: "#e8e8f0" }}>;</span>
          {"\n    "}
          <span style={{ color: "#7ab8f5" }}>int </span>
          <span style={{ color: "#e8e8f0" }}>col=</span>
          <span style={{ color: "#f5a67a" }}>{cols}</span>
          <span style={{ color: "#e8e8f0" }}>;</span>
          {"\n\n    "}
          <span style={{ color: "#c8a8f0" }}>for </span>
          <span style={{ color: "#e8e8f0" }}>
            (int i=1;i&lt;=row;i++) {"{"}
          </span>
          {"\n        "}
          <span style={{ color: "#c8a8f0" }}>for </span>
          <span style={{ color: "#e8e8f0" }}>
            (int j=1;j&lt;=col;j++) {"{"}
          </span>
          {"\n            "}
          <span style={{ color: "#c8a8f0" }}>if </span>
          <span style={{ color: "#e8e8f0" }}>(</span>

          <span style={{ color: "#c8f7a0" }}>
            {condition === "custom" ? customCondition : condition}
          </span>
          <span style={{ color: "#e8e8f0" }}>) {"{"}</span>
          {"\n                "}
          <span style={{ color: "#c8a8f0" }}>printf</span>
          <span style={{ color: "#e8e8f0" }}>(</span>
          <span style={{ color: "#f5a67a" }}>"*"</span>
          <span style={{ color: "#e8e8f0" }}>);</span>
          {"\n            "}
          <span style={{ color: "#e8e8f0" }}>{"}"} </span>
          <span style={{ color: "#c8a8f0" }}>else </span>
          <span style={{ color: "#e8e8f0" }}>{"{"}</span>
          {"\n                "}
          <span style={{ color: "#c8a8f0" }}>printf</span>
          <span style={{ color: "#e8e8f0" }}>(</span>
          <span style={{ color: "#f5a67a" }}>" "</span>
          <span style={{ color: "#e8e8f0" }}>);</span>
          {"\n            "}
          <span style={{ color: "#e8e8f0" }}>{"}"}</span>
          {"\n        "}
          <span style={{ color: "#e8e8f0" }}>{"}"}</span>
          {"\n        "}
          <span style={{ color: "#c8a8f0" }}>printf</span>
          <span style={{ color: "#e8e8f0" }}>(</span>
          <span style={{ color: "#f5a67a" }}>{'"\\n"'}</span>
          <span style={{ color: "#e8e8f0" }}>);</span>
          {"\n    "}
          <span style={{ color: "#e8e8f0" }}>{"}"}</span>
          {"\n    "}
          <span style={{ color: "#c8a8f0" }}>return </span>
          <span style={{ color: "#f5a67a" }}>0</span>
          <span style={{ color: "#e8e8f0" }}>;</span>
          {"\n"}
          <span style={{ color: "#e8e8f0" }}>{"}"}</span>
        </pre>
      </div>
    </div>
  );
}
