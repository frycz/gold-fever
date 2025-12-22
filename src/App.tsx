import React from "react";
import { Game } from "./Game";

import "./App.css";

const App = () => {
  const [level, setLevel] = React.useState<number>();

  return (
    <div>
      {level === undefined ? (
        <div className="grid-wrapper">
          <div className="grid-container">
            <div className="side" style={{ textAlign: "center" }}>
              <div className="game-title">Gold Fever</div>
              <div className="game-description">Collect all the gold</div>
              <div className="difficulty-prompt">
                Select difficulty level
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {["Easy", "Medium", "Hard", "Master"].map((level, index) => (
                  <div
                    className="button"
                    style={{ marginBottom: "10px" }}
                    onClick={() => setLevel(index)}
                  >
                    {level}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Game currentLevel={level} maxLevel={3} />
      )}
    </div>
  );
};

export default App;
