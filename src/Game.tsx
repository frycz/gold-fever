import React from "react";
import { Grid } from "./Grid";
import { reducer, initialState, gridWidth, gridHeight } from "./game-engine";

import "./Game.css";

type Props = {
  currentLevel: number;
  maxLevel: number;
  onFinish: () => void;
  onRestart: () => void;
};

const Game = ({ currentLevel, maxLevel, onFinish, onRestart }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    currentLevel,
    maxLevel,
  });

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      dispatch("up");
    }
    if (e.key === "ArrowDown") {
      dispatch("down");
    }
    if (e.key === "ArrowLeft") {
      dispatch("left");
    }
    if (e.key === "ArrowRight") {
      dispatch("right");
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, []);

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    dispatch(direction);
  };

  return (
    <div className="game-wrapper">
      <div className="game-header">
        <div className="game-title">Gold Fever</div>
        <div className="game-buttons">
          <div className="button" onClick={onRestart}>
            Restart
          </div>
          <div className="button button-secondary" onClick={onFinish}>
            Finish
          </div>
        </div>
        <div className="score">
          <span className="score-title">Score:</span>
          <span className="score-value">{state.points}</span>
        </div>
      </div>
      <div className="game-area">
        <Grid
          width={gridWidth}
          height={gridHeight}
          playerX={state.player.x}
          playerY={state.player.y}
          items={state.items}
          enemies={state.enemies}
        />
        <div className="arrow-controls">
          <div className="arrow-controls-row">
            <div
              className="arrow-btn"
              onClick={() => handleMove("up")}
            >
              ▲
            </div>
          </div>
          <div className="arrow-controls-row">
            <div
              className="arrow-btn"
              onClick={() => handleMove("left")}
            >
              ◀
            </div>
            <div
              className="arrow-btn"
              onClick={() => handleMove("down")}
            >
              ▼
            </div>
            <div
              className="arrow-btn"
              onClick={() => handleMove("right")}
            >
              ▶
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Game };
