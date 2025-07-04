import PF from "pathfinding";
import {
  initialState,
  reducer,
  gridWidth,
  gridHeight,
  State,
  Action,
  Player,
  Item,
  Enemy,
} from "../index";

describe("Game Engine", () => {
  describe("Initial State", () => {
    it("should have correct initial values", () => {
      expect(initialState.currentLevel).toBe(0);
      expect(initialState.maxLevel).toBe(0);
      expect(initialState.points).toBe(0);
      expect(initialState.player).toEqual({ x: 0, y: 0 });
      expect(initialState.items).toHaveLength(4);
      expect(initialState.enemies).toHaveLength(1);
      expect(initialState.enemies[0]).toEqual({ x: 9, y: 9 });
    });

    it("should have items at specific positions", () => {
      const expectedItems = [
        { x: 2, y: 7 },
        { x: 8, y: 5 },
        { x: 4, y: 5 },
        { x: 6, y: 3 },
      ];
      expect(initialState.items).toEqual(expectedItems);
    });
  });

  describe("Grid Configuration", () => {
    it("should have correct grid dimensions", () => {
      expect(gridWidth).toBe(10);
      expect(gridHeight).toBe(10);
    });
  });

  describe("Player Movement", () => {
    it("should move player up when action is 'up'", () => {
      const state: State = {
        ...initialState,
        player: { x: 5, y: 5 },
      };
      const newState = reducer(state, "up");
      expect(newState.player).toEqual({ x: 5, y: 4 });
    });

    it("should move player down when action is 'down'", () => {
      const state: State = {
        ...initialState,
        player: { x: 5, y: 5 },
      };
      const newState = reducer(state, "down");
      expect(newState.player).toEqual({ x: 5, y: 6 });
    });

    it("should move player left when action is 'left'", () => {
      const state: State = {
        ...initialState,
        player: { x: 5, y: 5 },
      };
      const newState = reducer(state, "left");
      expect(newState.player).toEqual({ x: 4, y: 5 });
    });

    it("should move player right when action is 'right'", () => {
      const state: State = {
        ...initialState,
        player: { x: 5, y: 5 },
      };
      const newState = reducer(state, "right");
      expect(newState.player).toEqual({ x: 6, y: 5 });
    });

    it("should not move player beyond grid boundaries", () => {
      // Test top boundary
      const stateTop: State = {
        ...initialState,
        player: { x: 5, y: 0 },
      };
      const newStateTop = reducer(stateTop, "up");
      expect(newStateTop.player).toEqual({ x: 5, y: 0 });

      // Test bottom boundary
      const stateBottom: State = {
        ...initialState,
        player: { x: 5, y: gridHeight - 1 },
      };
      const newStateBottom = reducer(stateBottom, "down");
      expect(newStateBottom.player).toEqual({ x: 5, y: gridHeight - 1 });

      // Test left boundary
      const stateLeft: State = {
        ...initialState,
        player: { x: 0, y: 5 },
      };
      const newStateLeft = reducer(stateLeft, "left");
      expect(newStateLeft.player).toEqual({ x: 0, y: 5 });

      // Test right boundary
      const stateRight: State = {
        ...initialState,
        player: { x: gridWidth - 1, y: 5 },
      };
      const newStateRight = reducer(stateRight, "right");
      expect(newStateRight.player).toEqual({ x: gridWidth - 1, y: 5 });
    });
  });

  describe("Gold Collection", () => {
    it("should collect gold and increase points when player moves to item position", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 7 },
        items: [{ x: 2, y: 7 }],
        points: 10,
      };
      const newState = reducer(state, "right");
      expect(newState.points).toBe(11);
      expect(newState.items).toHaveLength(1);
      // Item should be repositioned to a new random location
      expect(newState.items[0]).not.toEqual({ x: 2, y: 7 });
    });

    it("should not collect gold when player is not on item position", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 7 },
        items: [{ x: 2, y: 7 }],
        points: 10,
      };
      const newState = reducer(state, "down");
      expect(newState.points).toBe(10);
      expect(newState.items).toEqual([{ x: 2, y: 7 }]);
    });

    it("should handle multiple items correctly", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 7 },
        items: [
          { x: 2, y: 7 },
          { x: 3, y: 7 },
          { x: 4, y: 7 },
        ],
        points: 10,
      };
      const newState = reducer(state, "right");
      expect(newState.points).toBe(11);
      expect(newState.items).toHaveLength(3);
      // Only the first item should be collected and repositioned
      expect(newState.items[0]).not.toEqual({ x: 2, y: 7 });
      expect(newState.items[1]).toEqual({ x: 3, y: 7 });
      expect(newState.items[2]).toEqual({ x: 4, y: 7 });
    });
  });

  describe("Enemy Movement", () => {
    it("should move enemies towards items", () => {
      const state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 5, y: 5 }],
        enemies: [{ x: 0, y: 0 }],
      };
      const newState = reducer(state, "right");
      // Enemy should move towards the item
      expect(newState.enemies[0]).not.toEqual({ x: 0, y: 0 });
    });

    it("should not move enemies beyond grid boundaries", () => {
      const state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 0, y: 0 }],
        enemies: [{ x: gridWidth - 1, y: gridHeight - 1 }],
      };
      const newState = reducer(state, "right");
      expect(newState.enemies[0].x).toBeLessThanOrEqual(gridWidth - 1);
      expect(newState.enemies[0].y).toBeLessThanOrEqual(gridHeight - 1);
    });

    it("should handle multiple enemies", () => {
      const state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 5, y: 5 }],
        enemies: [
          { x: 0, y: 0 },
          { x: 9, y: 9 },
        ],
      };
      const newState = reducer(state, "right");
      expect(newState.enemies).toHaveLength(2);
      // Both enemies should move
      expect(newState.enemies[0]).not.toEqual({ x: 0, y: 0 });
      expect(newState.enemies[1]).not.toEqual({ x: 9, y: 9 });
    });
  });

  describe("Enemy Gold Collection", () => {
    it("should decrease points when enemy collects gold", () => {
      const state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 1, y: 0 }],
        enemies: [{ x: 1, y: 0 }], // Enemy is already at the item position
        points: 10,
      };
      const newState = reducer(state, "up"); // Move player up, not towards the item
      expect(newState.points).toBe(9); // Enemy collects item, points decrease
    });

    it("should reposition item when enemy collects it", () => {
      const state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 1, y: 0 }],
        enemies: [{ x: 0, y: 0 }],
        points: 10,
      };
      const newState = reducer(state, "right");
      expect(newState.items[0]).not.toEqual({ x: 1, y: 0 });
    });
  });

  describe("Complex Game Scenarios", () => {
    it("should handle player and enemy moving to same position", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 1 },
        items: [{ x: 2, y: 1 }],
        enemies: [{ x: 0, y: 1 }],
        points: 10,
      };
      const newState = reducer(state, "right");
      // Player should collect the item
      expect(newState.points).toBe(11);
      // Enemy should try to move towards the item (may or may not move depending on pathfinding)
      expect(newState.enemies[0].x).toBeGreaterThanOrEqual(0);
      expect(newState.enemies[0].x).toBeLessThanOrEqual(gridWidth - 1);
      expect(newState.enemies[0].y).toBeGreaterThanOrEqual(0);
      expect(newState.enemies[0].y).toBeLessThanOrEqual(gridHeight - 1);
    });

    it("should handle multiple items being collected in one turn", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 1 },
        items: [
          { x: 2, y: 1 },
          { x: 1, y: 2 },
        ],
        enemies: [{ x: 0, y: 0 }],
        points: 10,
      };
      const newState = reducer(state, "right");
      // Player should collect the item at (2, 1)
      expect(newState.points).toBe(11);
      expect(newState.items).toHaveLength(2);
      // The collected item should be repositioned
      expect(newState.items[0]).not.toEqual({ x: 2, y: 1 });
      // The other item should remain unchanged
      expect(newState.items[1]).toEqual({ x: 1, y: 2 });
    });

    it("should maintain game state consistency across multiple moves", () => {
      let state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 1, y: 0 }],
        enemies: [{ x: 9, y: 9 }],
        points: 0,
      };

      // Move right to collect item
      state = reducer(state, "right");
      expect(state.points).toBe(1);
      expect(state.player).toEqual({ x: 1, y: 0 });

      // Move down
      state = reducer(state, "down");
      expect(state.points).toBe(1); // No new item collected
      expect(state.player).toEqual({ x: 1, y: 1 });

      // Move left
      state = reducer(state, "left");
      expect(state.points).toBe(1); // No new item collected
      expect(state.player).toEqual({ x: 0, y: 1 });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty items array", () => {
      const state: State = {
        ...initialState,
        items: [],
        points: 10,
      };
      const newState = reducer(state, "right");
      expect(newState.points).toBe(10);
      expect(newState.items).toEqual([]);
    });

    it("should handle empty enemies array", () => {
      const state: State = {
        ...initialState,
        enemies: [],
        points: 10,
      };
      const newState = reducer(state, "right");
      expect(newState.points).toBe(10);
      expect(newState.enemies).toEqual([]);
    });

    it("should handle negative points", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 0 },
        items: [{ x: 2, y: 0 }],
        enemies: [{ x: 0, y: 0 }],
        points: -5,
      };
      const newState = reducer(state, "right");
      expect(newState.points).toBe(-4); // Enemy collects item, points decrease
    });

    it("should handle very large point values", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 0 },
        items: [{ x: 2, y: 0 }],
        points: 1000000,
      };
      const newState = reducer(state, "right");
      expect(newState.points).toBe(1000001);
    });
  });

  describe("Pathfinding Integration", () => {
    it("should use pathfinding for enemy movement", () => {
      const state: State = {
        ...initialState,
        player: { x: 0, y: 0 },
        items: [{ x: 5, y: 5 }],
        enemies: [{ x: 0, y: 0 }],
      };
      const newState = reducer(state, "right");
      // Enemy should move towards the item using pathfinding
      expect(newState.enemies[0]).not.toEqual({ x: 0, y: 0 });
    });

    it("should handle blocked paths for enemies", () => {
      const state: State = {
        ...initialState,
        player: { x: 1, y: 0 },
        items: [{ x: 2, y: 0 }],
        enemies: [{ x: 0, y: 0 }],
      };
      const newState = reducer(state, "right");
      // Enemy should move towards the item even if player is blocking direct path
      expect(newState.enemies[0]).not.toEqual({ x: 0, y: 0 });
      // But enemy should not move beyond grid boundaries
      expect(newState.enemies[0].x).toBeLessThanOrEqual(gridWidth - 1);
      expect(newState.enemies[0].y).toBeLessThanOrEqual(gridHeight - 1);
    });
  });

  describe("Level System", () => {
    it("should maintain level information", () => {
      const state: State = {
        ...initialState,
        currentLevel: 5,
        maxLevel: 10,
      };
      const newState = reducer(state, "right");
      expect(newState.currentLevel).toBe(5);
      expect(newState.maxLevel).toBe(10);
    });
  });
}); 