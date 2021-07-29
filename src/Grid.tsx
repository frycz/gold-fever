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

export const Grid = ({ width, height, playerX, playerY, items, enemies }: Props) => (
  <div className="grid">
    {Array(height)
      .fill(null)
      .map((_, y) => (
        <div style={{ display: "flex" }}>
          {Array(width)
            .fill(null)
            .map((_, x) => (
              <div
                className={`grid-field${
                  playerX === x && playerY === y ? " player-field" : ""
                }${
                  items.find((item) => item.x === x && item.y === y)
                    ? " item-field"
                    : ""
                }${
                  enemies.find((enemy) => enemy.x === x && enemy.y === y)
                    ? " enemy-field"
                    : ""
                }`}
              />
            ))}
        </div>
      ))}
  </div>
);
