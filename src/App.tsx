import React from "react";
import PF from "pathfinding";
import { Grid } from "./Grid";

import "./App.css";

type Player = {
  x: number;
  y: number;
};

export type Item = {
  x: number;
  y: number;
  type: "gold" | "fakeGold";
};

type Enemy = {
  x: number;
  y: number;
};

type Action = "up" | "down" | "left" | "right" | "space";

type State = {
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
  points: 0,
  player: { x: 0, y: 0 },
  items: [
    { x: 2, y: 7, type: "gold" },
    { x: 8, y: 5, type: "gold" },
    { x: 4, y: 5, type: "gold" },
    { x: 6, y: 3, type: "gold" },
  ],
  enemies: [
    // { x: 0, y: 9 },
    // { x: 9, y: 0 },
    { x: 9, y: 9 },
  ],
};

const init = () => initialState;

const collectGold = (
  state: State,
  character: Player | Enemy,
  onItemCollected: (state: State) => State
) => {
  const itemIndex = state.items.findIndex(
    (item) =>
      item.x === character.x && item.y === character.y && item.type === "gold"
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
                    type: "gold",
                  } as const,
                  ...state.items.slice(itemIndex + 1, state.items.length),
                ]
              : state.items,
        }
      : {}),
  };
};

const collectFakeGold = (
  state: State,
  character: Player | Enemy,
  onItemCollected: (state: State) => State
) => {
  const itemIndex = state.items.findIndex(
    (item) =>
      item.x === character.x &&
      item.y === character.y &&
      item.type === "fakeGold"
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

  const maxLevel = 3;
  const level = 0;
  const itemsToCut = maxLevel - level;

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
    // collect fake gold reducer
    (accState, action, config) =>
      stateReducer(
        accState,
        action,
        accState.enemies.map(
          (enemy, index) => (accState: State, action: Action, config: Config) =>
            collectFakeGold(accState, enemy, (newState) => newState)
        )
      ),
    // handle space press
    (state: State, action: Action, config: Config) => {
      if (action === "space") {
        return {
          ...state,
          points: state.points - 1,
          items: [
            ...state.items,
            {
              x: state.player.x,
              y: state.player.y,
              type: "fakeGold",
            },
          ],
        };
      }

      return state;
    },
  ]);

type TestState = {
  points: number;
  sum: number,
  rounds: number,
  items: Array<number>;
};

const initialPoints = 100;
const initialItems = [-10, 10, 10, 10, 10, 10]
const initialSum = initialItems.reduce(
  (accSum, item) => accSum + item,
  initialPoints
);

const SomeTests = () => {
  const [state, setState] = React.useState<TestState>({
    points: initialPoints,
    sum: initialSum,
    rounds: 0,
    items: initialItems,
  });

  

  const generateItem = (state: TestState) => {
    const lowestSumLimit = 10 // the lower the limit the harder the game
    const availableMargin = state.sum - lowestSumLimit
    const range = 1 + state.rounds
    if (availableMargin < 0) {
      return 10 * Math.ceil(Math.random() * range)
    }

    return -10 * Math.ceil(Math.random() * range)
  }

  const applyItemAt = (index: number) => {
    setState(state => {
      const newItem = generateItem(state)
      return {
      ...state,
      rounds: state.rounds + 1,
      points: state.points + state.items[index],
      sum: state.sum + newItem,
      items: [
        ...state.items.slice(0, index),
        newItem,
        ...state.items.slice(index + 1, state.items.length),
      ]
    }})
  }

  return (
    <div>
      <div>Some tests</div>
      <div>{`Points: ${state.points}`}</div>
      <div>{`Game sum: ${state.sum}`}</div>
      <div>
        {state.items.map((item, index) => (
          <div key={index}>
            <button onClick={() => applyItemAt(index)}>{item}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [level, setLevel] = React.useState<number>(3);
  const [state, dispatch] = React.useReducer(reducer, initialState, init);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.code === "ArrowUp") {
      dispatch("up");
    }
    if (e.code === "ArrowDown") {
      dispatch("down");
    }
    if (e.code === "ArrowLeft") {
      dispatch("left");
    }
    if (e.code === "ArrowRight") {
      dispatch("right");
    }
    if (e.code === "Space") {
      console.log("space");
      dispatch("space");
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => window.removeEventListener("keydown", keyDownHandler);
  }, []);

  return (
    <div>
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
      {/*<SomeTests />*/}
    </div>
  );
}

export default App;
