import themes from "./themes";
import GameState from "./GameState";
import GamePlay from "./GamePlay";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState(8);
  }

  init() {
    // Инициализируем UI
    this.gamePlay.drawUi(themes.prairie);

    // -------------------------------------
    // Инициация состояния игры
    // -------------------------------------
    this.gamePlay.redrawPositions(this.gameState.positions);

    // -------------------------------------
    // Добавляем обработчики игровых событий
    // -------------------------------------

    // Наведение на клетку
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));

    // Выход из клетки
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    // Клик по клетке
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    // -------------------------------------
    // Загрузка и сохранение стейта игры
    // -------------------------------------

    // Клик по кноке New Game
    this.gamePlay.addNewGameListener(this.onNewGame.bind(this));

    // Клик по кнопке Save Game
    this.gamePlay.addSaveGameListener(this.onSaveGame.bind(this));

    // Клик по кнопке Load Game
    this.gamePlay.addLoadGameListener(this.onLoadGame.bind(this));
  }

  onCellClick(index) {
    console.log(`Cell ${index} clicked`);
    const character = this.gameState.getCharacterAt(index);

    if (character && this.gameState.playerTeam.includes(character)) {
      if (this.gameState.currentSelection) { this.gamePlay.deselectCell(this.gameState.currentSelection); }
      this.gamePlay.selectCell(index);
      this.gameState.currentSelection = index;
    } else if (character && this.gameState.computerTeam.includes(character)) {
      GamePlay.showError("Нельзя выбирать не вашего персонажа");
    }
  }

  onCellEnter(index) {
    const character = this.gameState.getCharacterAt(index);
    if (character) {
      const message = `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  onNewGame() {
    console.log("New game");
  }

  onSaveGame() {
    console.log("Save game");
  }

  onLoadGame() {
    console.log("Load game");
  }
}
