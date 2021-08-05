import * as React from "react";

import { Item } from "./App";
import "./Grid.css";

type Props = {
  width: number;
  height: number;
  playerX: number;
  playerY: number;
  items: Array<Item>;
  enemies: Array<{ x: number; y: number }>;
};

export const Grid = ({
  width,
  height,
  playerX,
  playerY,
  items,
  enemies,
}: Props) => (
  <div className="grid">
    {Array(height)
      .fill(null)
      .map((_, y) => (
        <div key={y} style={{ display: "flex" }}>
          {Array(width)
            .fill(null)
            .map((_, x) => (
              <div key={`${x}-${y}`} className="grid-field">
                {playerX === x && playerY === y ? (
                  <div className="player-field" />
                ) : null}
                {items.find(
                  (item) => item.x === x && item.y === y && item.type === "gold"
                ) ? (
                  <div className="item-field gold-field" />
                ) : null}
                {items.find(
                  (item) =>
                    item.x === x && item.y === y && item.type === "fakeGold"
                ) ? (
                  <div className="item-field fake-gold-field" />
                ) : null}
                {enemies.find((enemy) => enemy.x === x && enemy.y === y) ? (
                  <div className="enemy-field" />
                ) : null}
              </div>
            ))}
        </div>
      ))}
  </div>
);
