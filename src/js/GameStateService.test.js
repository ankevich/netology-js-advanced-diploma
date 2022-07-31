import GameStateService from "./GameStateService";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

test("функция save записывает в локальное хранилище", () => {
  const gameStateService = new GameStateService(localStorage);
  const state = {
    boardSize: 3,
    positions: [
      {
        position: 0,
        character: {
          type: "bowman",
          health: 50,
          damage: 25,
          level: 1,
        },
      },
      {
        position: 1,
        character: {
          type: "swordsman",
          health: 50,
          damage: 25,
          level: 1,
        },
      },
      {
        position: 2,
        character: {
          type: "magician",
          health: 50,
          damage: 25,
          level: 1,
        },
      },
    ],
  };
  gameStateService.save(state);
  expect(localStorage.getItem("state")).toBe(JSON.stringify(state));
});

test("функция load загружает из локального хранилища", () => {
  const gameStateService = new GameStateService(localStorage);
  const state = {
    boardSize: 3,
    positions: [
      {
        position: 0,
        character: {
          type: "bowman",
          health: 50,
          damage: 25,
          level: 1,
        },
      },
      {
        position: 1,
        character: {
          type: "swordsman",
          health: 50,
          damage: 25,
          level: 1,
        },
      },
      {
        position: 2,
        character: {
          type: "magician",
          health: 50,
          damage: 25,
          level: 1,
        },
      },
    ],
  };
  localStorage.setItem("state", JSON.stringify(state));
  expect(gameStateService.load()).toEqual(state);
});

test("функция load выдает ошибку при невалидном состоянии", () => {
  const gameStateService = new GameStateService(localStorage);
  localStorage.setItem("state", "invalid");
  expect(() => gameStateService.load()).toThrowError("Invalid state");
});
