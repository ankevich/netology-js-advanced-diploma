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
    const character = this.gameState.getCharacterAt(index);
    if (character) {
      const [_, currentPosition] = this.gameState.currentSelection;
      currentPosition && this.gamePlay.deselectCell(currentPosition);

      if (this.isCharacterInPlayerTeam(character)) {
        this.gamePlay.selectCell(index);
        this.setCurentSlection(character, index);
      } else if (character && !this.isCharacterInPlayerTeam(character)) {
        GamePlay.showError("Нельзя выбирать не вашего персонажа");
      }
    }
  }

  onCellEnter(index) {
    const character = this.gameState.getCharacterAt(index);
    const [currentCharacter, currentPosition] = this.gameState.currentSelection;

    // tooltip
    if (character) {
      const message = `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }

    // Selection
    if (
      character &&
      currentPosition != index &&
      this.isCharacterInPlayerTeam(character)
    ) {
      this.gamePlay.setCursor("pointer");
    }

    // Move
    if (
      !character &&
      currentPosition &&
      currentPosition != index &&
      this.isCellInRange(index, currentPosition, currentCharacter.range)
    ) {
      this.gamePlay.setCursor("pointer");
      this.gamePlay.selectCell(index, "green");
    }

    // Attack
    if (
      character &&
      currentPosition &&
      currentPosition != index &&
      this.isCellInRange(index, currentPosition, currentCharacter.range) &&
      this.isCharacterInEnemyTeam(character)
    ) {
      this.gamePlay.setCursor("crosshair");
      this.gamePlay.selectCell(index, "red");
    } else if (
      character &&
      currentPosition &&
      currentPosition != index &&
      !this.isCellInRange(index, currentPosition, currentCharacter.range) &&
      this.isCharacterInEnemyTeam(character)
    ) {
      this.gamePlay.setCursor("not-allowed");
    }
  }

  onCellLeave(index) {
    const [_, currentPosition] = this.gameState.currentSelection;

    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor("default");
    currentPosition &&
      currentPosition != index &&
      this.gamePlay.deselectCell(index);
  }

  setCurentSlection(character, index) {
    this.gameState.currentSelection = [character, index];
  }

  isCharacterInPlayerTeam(character) {
    return this.gameState.playerTeam.includes(character);
  }

  isCharacterInEnemyTeam(character) {
    return this.gameState.computerTeam.includes(character);
  }

  isCellInRange(cellIndex, centerIndex, radius) {
    const boardSize = 8;

    const x = Math.floor(cellIndex / boardSize);
    const y = cellIndex % boardSize;

    const cx = Math.floor(centerIndex / boardSize);
    const cy = centerIndex % boardSize;

    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);

    return dx <= radius && dy <= radius;
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
