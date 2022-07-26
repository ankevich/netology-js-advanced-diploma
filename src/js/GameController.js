import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // Инициализируем UI
    this.gamePlay.drawUi(themes.prairie) 


    // -------------------------------------
    // Добавляем обработчики игровых событий
    // -------------------------------------
    
    // Наведение на клетку
    this.gamePlay.addCellEnterListener(this.onCellEnter)
    
    // Выход из клетки
    this.gamePlay.addCellLeaveListener(this.onCellLeave)
    
    // Клик по клетке
    this.gamePlay.addCellClickListener(this.onCellClick)


    // -------------------------------------
    // Загрузка и сохранение стейта игры
    // -------------------------------------

    // Клик по кноке New Game
    this.gamePlay.addNewGameListener(this.onNewGame)

    // Клик по кнопке Save Game
    this.gamePlay.addSaveGameListener(this.onSaveGame)

    // Клик по кнопке Load Game
    this.gamePlay.addLoadGameListener(this.onLoadGame)

    
  }

  onCellClick(index) {
    // TODO: react to click
    console.log(`Cell ${index} clicked`);
  }

  onCellEnter(index) {
    const character = this.stateService.getCharacter(index);
    if (character) {
      const message = `🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  onNewGame() {
    console.log('New game');
  }

  onSaveGame() {
    console.log('Save game');
  }

  onLoadGame() {
    console.log('Load game');
  }
}
