import React from "react";
import { Grid } from "./Grid";

import "./App.css";

type Player = {
  x: number;
  y: number;
};

type Item = {
  x: number;
  y: number;
};

type Enemy = {
  x: number;
  y: number;
};

type Action = "up" | "down" | "left" | "right";

type State = {
  points: number;
  player: Player;
  items: Array<Item>;
  enemies: Array<Enemy>;
};

const gridWidth = 10;
const gridHeight = 10;

const initialState: State = {
  points: 0,
  player: { x: 0, y: 0 },
  items: [
    { x: 2, y: 7 },
    { x: 8, y: 5 },
    { x: 4, y: 5 },
    { x: 6, y: 3 },
  ],
  enemies: [
    { x: 0, y: 9 },
    { x: 9, y: 0 },
    { x: 9, y: 9 },
  ],
};

const init = () => initialState;



const reducer = (state: State, action: Action): State => {
  let newX = 0;
  let newY = 0;
  let itemIndex = -1;
  let newItem: Array<Item> = [];

  switch (action) {
    case "up":
      newX = state.player.x;
      newY = state.player.y > 0 ? state.player.y - 1 : state.player.y;
      itemIndex = state.items.findIndex(
        (item) => item.x === newX && item.y === newY
      );
      newItem =
        itemIndex !== -1
          ? [
              {
                x: Math.floor(gridWidth * Math.random()),
                y: Math.floor(gridHeight * Math.random()),
              },
            ]
          : [];

      return {
        ...state,
        player: {
          x: newX,
          y: newY,
        },
        points: itemIndex !== -1 ? state.points + 1 : state.points,
        items: [
          ...(itemIndex !== -1
            ? state.items.filter((_, index) => index !== itemIndex)
            : state.items),
          ...newItem,
        ],
        enemies: state.enemies.map((enemy) => {
          const newEnemyX =
            enemy.x +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          const newEnemyY =
            enemy.y +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          return {
            x: newEnemyX <= 9 && newEnemyX >= 0 ? newEnemyX : enemy.x,
            y: newEnemyY <= 9 && newEnemyY >= 0 ? newEnemyY : enemy.y,
          };
        }),
      };
    case "down":
      newX = state.player.x;
      newY =
        state.player.y < gridHeight - 1 ? state.player.y + 1 : state.player.y;
      itemIndex = state.items.findIndex(
        (item) => item.x === newX && item.y === newY
      );
      newItem =
        itemIndex !== -1
          ? [
              {
                x: Math.floor(gridWidth * Math.random()),
                y: Math.floor(gridHeight * Math.random()),
              },
            ]
          : [];

      return {
        ...state,
        player: {
          x: newX,
          y: newY,
        },
        points: itemIndex !== -1 ? state.points + 1 : state.points,
        items: [
          ...(itemIndex !== -1
            ? state.items.filter((_, index) => index !== itemIndex)
            : state.items),
          ...newItem,
        ],
        enemies: state.enemies.map((enemy) => {
          const newEnemyX =
            enemy.x +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          const newEnemyY =
            enemy.y +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          return {
            x: newEnemyX <= 9 && newEnemyX >= 0 ? newEnemyX : enemy.x,
            y: newEnemyY <= 9 && newEnemyY >= 0 ? newEnemyY : enemy.y,
          };
        }),
      };
    case "left":
      newX = state.player.x > 0 ? state.player.x - 1 : state.player.x;
      newY = state.player.y;
      itemIndex = state.items.findIndex(
        (item) => item.x === newX && item.y === newY
      );
      newItem =
        itemIndex !== -1
          ? [
              {
                x: Math.floor(gridWidth * Math.random()),
                y: Math.floor(gridHeight * Math.random()),
              },
            ]
          : [];

      return {
        ...state,
        player: {
          x: newX,
          y: newY,
        },
        points: itemIndex !== -1 ? state.points + 1 : state.points,
        items: [
          ...(itemIndex !== -1
            ? state.items.filter((_, index) => index !== itemIndex)
            : state.items),
          ...newItem,
        ],
        enemies: state.enemies.map((enemy) => {
          const newEnemyX =
            enemy.x +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          const newEnemyY =
            enemy.y +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          return {
            x: newEnemyX <= 9 && newEnemyX >= 0 ? newEnemyX : enemy.x,
            y: newEnemyY <= 9 && newEnemyY >= 0 ? newEnemyY : enemy.y,
          };
        }),
      };
    case "right":
      newX =
        state.player.x < gridWidth - 1 ? state.player.x + 1 : state.player.x;
      newY = state.player.y;
      itemIndex = state.items.findIndex(
        (item) => item.x === newX && item.y === newY
      );
      newItem =
        itemIndex !== -1
          ? [
              {
                x: Math.floor(gridWidth * Math.random()),
                y: Math.floor(gridHeight * Math.random()),
              },
            ]
          : [];

      return {
        ...state,
        player: {
          x: newX,
          y: newY,
        },
        points: itemIndex !== -1 ? state.points + 1 : state.points,
        items: [
          ...(itemIndex !== -1
            ? state.items.filter((_, index) => index !== itemIndex)
            : state.items),
          ...newItem,
        ],
        enemies: state.enemies.map((enemy) => {
          const newEnemyX =
            enemy.x +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          const newEnemyY =
            enemy.y +
            (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.5 ? 1 : 0);
          return {
            x: newEnemyX <= 9 && newEnemyX >= 0 ? newEnemyX : enemy.x,
            y: newEnemyY <= 9 && newEnemyY >= 0 ? newEnemyY : enemy.y,
          };
        }),
      };
    default:
      return { ...state };
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState, init);

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

  return (
    <div className="grid-wrapper">
      <div className="grid-container">
        <div className="side">
          <div className="game-title">Gold Fever</div>
          <div className="game-description">Collect all the gold</div>
          <div className="game-instruction">Use arrow keys to move</div>
        </div>
        <Grid
          width={gridWidth}
          height={gridHeight}
          playerX={state.player.x}
          playerY={state.player.y}
          items={state.items}
          enemies={state.enemies}
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
}

export default App;
