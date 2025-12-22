import React from "react";
import { Game } from "./Game";

import "./App.css";

const App = () => {
  const [level, setLevel] = React.useState<number>();
  const [gameKey, setGameKey] = React.useState(0);

  const handleFinish = () => setLevel(undefined);
  const handleRestart = () => setGameKey((k) => k + 1);

  return (
    <div>
      {level === undefined ? (
        <div className="app-wrapper">
          <div className="menu-container">
            <div className="menu-title">Gold Fever</div>
            <div className="menu-description">Collect all the gold</div>
            <div className="difficulty-prompt">Select difficulty level</div>
            <div className="difficulty-buttons">
              {["Easy", "Medium", "Hard", "Master"].map((levelName, index) => (
                <div
                  key={levelName}
                  className="menu-button"
                  onClick={() => setLevel(index)}
                >
                  {levelName}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Game
          key={gameKey}
          currentLevel={level}
          maxLevel={3}
          onFinish={handleFinish}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
