import themes from "./themes";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // Инициализируем UI
    this.gamePlay.drawUi(themes.prairie);

    // -------------------------------------
    // Добавляем обработчики игровых событий
    // -------------------------------------

    // Наведение на клетку
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));

    // Выход из клетки

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
  }

  onCellEnter(index) {
    console.log(`onCellEnter: ${index} entered`);
    
    const character = this.stateService.getCharacter(index);
    if (character) {
      const message = `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    console.log(`Cell ${index} left`);
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
