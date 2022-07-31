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
          armor: 25,
          level: 1,
          experience: 0,
          attackSpeed: 2,
          attackRange: 1,
          attackType: "melee",
        },
      },
      {
        position: 1,
        character: {
          type: "archer",
          health: 50,
          damage: 25,
          armor: 25,
          level: 1,
          experience: 0,
          attackSpeed: 2,
          attackRange: 3,
          attackType: "ranged",
        },
      },
      {
        position: 2,
        character: {
          type: "wizard",
          health: 50,
          damage: 25,
          armor: 25,
          level: 1,
          experience: 0,
          attackSpeed: 2,
          attackRange: 4,
          attackType: "magic",
        },
      },
    ],
  };
  gameStateService.save(state);
  expect(localStorage.getItem("state")).toBe(JSON.stringify(state));
});

test('функция load загружает из локального хранилища', () => {
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
            armor: 25,
            level: 1,
            experience: 0,
            attackSpeed: 2,
            attackRange: 1,
            attackType: "melee",
            },
        },
        {
            position: 1,
            character: {
            type: "archer",
            health: 50,
            damage: 25,
            armor: 25,
            level: 1,
            experience: 0,
            attackSpeed: 2,
            attackRange: 3,
            attackType: "ranged",
            },
        },
        {
            position: 2,
            character: {
            type: "wizard",
            health: 50,
            damage: 25,
            armor: 25,
            level: 1,
            experience: 0,
            attackSpeed: 2,
            attackRange: 4,
            attackType: "magic",
            },
        },
        ],
    };
    localStorage.setItem("state", JSON.stringify(state));
    expect(gameStateService.load()).toEqual(state);
})

test('функция load выдает ошибку при невалидном состоянии', () => {
    const gameStateService = new GameStateService(localStorage);
    localStorage.setItem("state", "invalid");
    expect(() => gameStateService.load()).toThrowError('Invalid state');
})