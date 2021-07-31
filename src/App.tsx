import React from "react";
import PF from "pathfinding";
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

var pathfinder = new PF.AStarFinder();

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
    // { x: 0, y: 9 },
    // { x: 9, y: 0 },
    { x: 9, y: 9 },
  ],
};

const init = () => initialState;

const movePlayer = (state: State, action: Action): State => {
  let newX = state.player.x;
  let newY = state.player.y;
  let itemIndex = -1;
  let newItem: Array<Item> = [];

  if (action === "up") {
    newX = state.player.x;
    newY = state.player.y > 0 ? state.player.y - 1 : state.player.y;
  }
  if (action === "down") {
    newX = state.player.x;
    newY =
      state.player.y < gridHeight - 1 ? state.player.y + 1 : state.player.y;
  }
  if (action === "left") {
    newX = state.player.x > 0 ? state.player.x - 1 : state.player.x;
    newY = state.player.y;
  }
  if (action === "right") {
    newX = state.player.x < gridWidth - 1 ? state.player.x + 1 : state.player.x;
    newY = state.player.y;
  }

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
  };
};

const moveEnemy = (
  state: State,
  enemyIndex: number,
  pathfinder: PF.AStarFinder
): State => {
  const enemy = { ...state.enemies[enemyIndex] };
  const grid = new PF.Grid(gridWidth, gridHeight);

  grid.setWalkableAt(state.player.x, state.player.y, false);
  state.enemies.forEach((_, index) => {
    if (index !== enemyIndex) {
      grid.setWalkableAt(state.enemies[index].x, state.enemies[index].y, false);
    }
  });

  const paths = state.items
    .map((item) =>
      pathfinder.findPath(enemy.x, enemy.y, item.x, item.y, grid.clone())
    )
    .sort((pathA, pathB) => pathA.length - pathB.length);

  const [newEnemyX, newEnemyY] = paths[0][1] ? paths[0][1] : [enemy.x, enemy.y];

  enemy.x = newEnemyX <= 9 && newEnemyX >= 0 ? newEnemyX : enemy.x;
  enemy.y = newEnemyY <= 9 && newEnemyY >= 0 ? newEnemyY : enemy.y;

  const itemIndex = state.items.findIndex(
    (item) => item.x === enemy.x && item.y === enemy.y
  );
  const newItem =
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
    items: [
      ...(itemIndex !== -1
        ? state.items.filter((_, index) => index !== itemIndex)
        : state.items),
      ...newItem,
    ],
    points: itemIndex !== -1 ? state.points - 1 : state.points,
    enemies: [
      ...state.enemies.slice(0, enemyIndex),
      enemy,
      ...state.enemies.slice(enemyIndex + 1, state.enemies.length),
    ],
  };
};

const reducer = (state: State, action: Action): State => {
  const playerState = movePlayer(state, action);

  return state.enemies.reduce((acc, _, index) => {
    return moveEnemy(acc, index, pathfinder);
  }, playerState);
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
