import React from "react";
import PF from "pathfinding";
import { Grid } from "./Grid";

import "./Game.css";

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
  currentLevel: number;
  maxLevel: number;
  points: number;
  player: Player;
  items: Array<Item>;
  enemies: Array<Enemy>;
};

type Config = {
  gridWidth: number;
  gridHeight: number;
};

type Reducer = (state: State, action: Action, config: Config) => State;

const gridWidth = 10;
const gridHeight = 10;

var pathfinder = new PF.AStarFinder();

const initialState: State = {
  currentLevel: 0,
  maxLevel: 0,
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

const collectGold = (
  state: State,
  character: Player | Enemy,
  onItemCollected: (state: State) => State
) => {
  const itemIndex = state.items.findIndex(
    (item) => item.x === character.x && item.y === character.y
  );

  return {
    ...state,
    ...(itemIndex !== -1
      ? {
          ...onItemCollected(state),
          items:
            itemIndex !== -1
              ? [
                  ...state.items.slice(0, itemIndex),
                  {
                    x: Math.floor(gridWidth * Math.random()),
                    y: Math.floor(gridHeight * Math.random()),
                  },
                  ...state.items.slice(itemIndex + 1, state.items.length),
                ]
              : state.items,
        }
      : {}),
  };
};

const movePlayer = (state: State, action: Action, config: Config) => {
  let newX = state.player.x;
  let newY = state.player.y;

  if (action === "up") {
    newX = state.player.x;
    newY = state.player.y > 0 ? state.player.y - 1 : state.player.y;
  }
  if (action === "down") {
    newX = state.player.x;
    newY =
      state.player.y < config.gridHeight - 1
        ? state.player.y + 1
        : state.player.y;
  }
  if (action === "left") {
    newX = state.player.x > 0 ? state.player.x - 1 : state.player.x;
    newY = state.player.y;
  }
  if (action === "right") {
    newX =
      state.player.x < config.gridWidth - 1
        ? state.player.x + 1
        : state.player.x;
    newY = state.player.y;
  }

  return {
    ...state,
    player: {
      x: newX,
      y: newY,
    },
  };
};

const getStateReducer =
  (config: Config) =>
  (initialState: State, action: Action, reducers: Array<Reducer>) =>
    reducers.reduce(
      (accState, reducer) => reducer(accState, action, config),
      initialState
    );

const stateReducer = getStateReducer({ gridWidth, gridHeight });

const movePlayerReducer = (accState: State, action: Action, config: Config) =>
  movePlayer(accState, action, config);
const moveEnemiesReducer = (accState: State, action: Action, config: Config) =>
  stateReducer(
    accState,
    action,
    accState.enemies.map(
      (_, index) => (accState, action, config) =>
        moveEnemy(accState, index, pathfinder)
    )
  );

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

  const itemsToCut = state.maxLevel - state.currentLevel;
  const paths = state.items
    .slice(
      0,
      state.items.length > itemsToCut
        ? state.items.length - itemsToCut
        : state.items.length
    )
    .map((item) =>
      pathfinder.findPath(enemy.x, enemy.y, item.x, item.y, grid.clone())
    )
    .filter((path) => path.length)
    .sort((pathA, pathB) => pathA.length - pathB.length);

  const [newEnemyX, newEnemyY] =
    paths[0] && paths[0][1] ? paths[0][1] : [enemy.x, enemy.y];

  enemy.x = newEnemyX <= 9 && newEnemyX >= 0 ? newEnemyX : enemy.x;
  enemy.y = newEnemyY <= 9 && newEnemyY >= 0 ? newEnemyY : enemy.y;

  return {
    ...state,
    enemies: [
      ...state.enemies.slice(0, enemyIndex),
      enemy,
      ...state.enemies.slice(enemyIndex + 1, state.enemies.length),
    ],
  };
};

const reducer = (state: State, action: Action): State =>
  stateReducer(state, action, [
    movePlayerReducer,
    (accState, action, config) =>
      collectGold(accState, accState.player, (newState) => ({
        ...newState,
        points: newState.points + 1,
      })),
    moveEnemiesReducer,
    (accState, action, config) =>
      stateReducer(
        accState,
        action,
        accState.enemies.map(
          (enemy, index) => (accState: State, action: Action, config: Config) =>
            collectGold(accState, enemy, (newState) => ({
              ...newState,
              points: newState.points - 1,
            }))
        )
      ),
  ]);

type Props = {
  currentLevel: number;
  maxLevel: number;
};

const Game = ({ currentLevel, maxLevel }: Props) => {
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
};

export { Game };
