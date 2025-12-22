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
  const [hasMoved, setHasMoved] = React.useState(false);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      setHasMoved(true);
    }
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

  return (
    <div className="grid-wrapper">
      <div className="grid-container">
        <div className="side">
          <div className="game-title">Gold Fever</div>
          <div className="game-description">Collect all the gold</div>
          <div className="game-buttons">
            <div className="button" onClick={onRestart}>
              Restart
            </div>
            <div className="button button-secondary" onClick={onFinish}>
              Finish
            </div>
          </div>
        </div>
        <Grid
          width={gridWidth}
          height={gridHeight}
          playerX={state.player.x}
          playerY={state.player.y}
          items={state.items}
          enemies={state.enemies}
          showHints={!hasMoved}
        />
        <div className="side">
          <div className="score">
            <div className="score-title">Score:</div>
            <div className="score-value">{state.points}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Game };
