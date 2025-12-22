import * as React from "react";

import "./Grid.css";

type Props = {
  width: number;
  height: number;
  playerX: number;
  playerY: number;
  items: Array<{ x: number; y: number }>;
  enemies: Array<{ x: number; y: number }>;
};

const CELL_SIZE = 54; // 48px cell + 6px margin

export const Grid = ({
  width,
  height,
  playerX,
  playerY,
  items,
  enemies,
}: Props) => (
  <div className="grid">
    <div className="grid-inner">
      {Array(height)
        .fill(null)
        .map((_, y) => (
          <div key={y} style={{ display: "flex" }}>
            {Array(width)
              .fill(null)
              .map((_, x) => (
                <div key={`${x}-${y}`} className="grid-field">
                  {items.find((item) => item.x === x && item.y === y) ? (
                    <div className="item-field" />
                  ) : null}
                </div>
              ))}
          </div>
        ))}
      <div
        className="player-field"
        style={{
          transform: `translate(${playerX * CELL_SIZE}px, ${playerY * CELL_SIZE}px)`,
        }}
      />
      {enemies.map((enemy, index) => (
        <div
          key={index}
          className="enemy-field"
          style={{
            transform: `translate(${enemy.x * CELL_SIZE}px, ${enemy.y * CELL_SIZE}px)`,
          }}
        />
      ))}
    </div>
  </div>
);
