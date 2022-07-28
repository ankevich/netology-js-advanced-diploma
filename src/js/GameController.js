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

  onCellEnter(index) {
    const character = this.gameState.getCharacterAt(index);
    const selection = this.gameState.currentSelection;

    // -------------------------------------
    // Показываем tooltip
    // -------------------------------------
    if (character) {
      const message = `${character.type}: 🎖${character.level} ⚔${character.attack} 🛡${character.defence} ❤${character.health} 🦶${character.range}`;
      this.gamePlay.showCellTooltip(message, index);
    }

    // -------------------------------------
    // Показываем что персонажа можно выбрать
    // -------------------------------------
    if (                                      // Персонаж еще не выбран
      (selection == null &&                       // На поле нет выбранного персонажа
        character &&                              // В клетке есть персонаж
        this.isCharacterInPlayerTeam(character))  // Персонаж из команды игрока
      ||                                      // Персонаж выбран, но мы хотим другого
      (selection &&                               // На поле есть выбранный персонаж
        selection.position != index &&            // Позиция выбранного персонажа не совпадает с текущей (нет смысла выбирать что уже выбранно)
        character &&                              // В клетке есть персонаж
        this.isCharacterInPlayerTeam(character))  // Персонаж из команды игрока
    ) {
      this.gamePlay.setCursor("pointer");     // Устанавливаем курсор выбора
    }

    // -------------------------------------
    // Подсветить зеленым если возможен переход в клетку
    // -------------------------------------
    if (
      character == null &&                        // Клетка пустая
      selection &&                                // Выбран персонаж
      selection.position != index &&              // Текущая позиция не совпадает с позицией выделенного персонажа
      this.isInRange(index, selection.position, selection.character.range) // Клетка в диапазоне действия персонажа
    ) {
      this.gamePlay.setCursor("pointer"); // Сделать курсок активным
      this.gamePlay.selectCell(index, "green"); // Подсветить поле зеленым
    }

    // -------------------------------------
    // Показать атаку или невозможность атаки
    // -------------------------------------
    if (
      character &&                               // В клетке есть персонаж
      this.isCharacterInEnemyTeam(character) &&  // Персонаж из команды противника
      selection &&                               // Есть атакующий персонаж 
      selection.position != index &&             // Атакуемая позиция не совпадает с позицией выделенного персонажа
      this.isInRange(index, selection.position, selection.character.range) // Клетка в диапазоне действия персонажа
    ) {
      this.gamePlay.setCursor("crosshair");      // Курсор прицел
      this.gamePlay.selectCell(index, "red");    // Подсветить поле красным
    } else if (
      character &&                               // В клетке есть персонаж
      selection &&                               // Есть атакующий персонаж 
      selection.position != index &&             // Атакуемая позиция не совпадает с позицией выделенного персонажа
      this.isCharacterInEnemyTeam(character) &&  // Персонаж из команды противника
      this.isInRange(index, selection.position, selection.character.range) == null // Клетка НЕ в диапазоне действия
    ) {
      this.gamePlay.setCursor("not-allowed");
    }
  }

  onCellClick(index) {
    const selection = this.gameState.currentSelection;
    const clickedCharacter = this.gameState.getCharacterAt(index);

    // Не кликать если кликаем по уже выделенному персонажу
    if (
      clickedCharacter != null &&
      selection != null &&
      clickedCharacter == selection.character
    ) {
      return;
    }

    // Выбор персонажа
    if (clickedCharacter && this.isCharacterInPlayerTeam(clickedCharacter)) {
      this.deSelect();
      this.gamePlay.selectCell(index);
      this.gameState.select(clickedCharacter);
    }

    // Запрет на выбор чужого персонажа
    else if (
      clickedCharacter &&
      selection == null &&
      this.isCharacterInEnemyTeam(clickedCharacter)
    ) {
      GamePlay.showError("Нельзя выбирать не вашего персонажа");
    } 

    // Перемещение персонажа
    else if (
      selection &&                  // Выбран персонаж
      clickedCharacter == null &&   // Клетка никем не занята
      this.isInRange(index, selection.position, selection.character.range) // Клетка в диапазоне действия персонажа
    ) {
      this.gamePlay.deselectCell(selection.position);
      this.gameState.moveSelectedCharacterTo(index);
      this.gamePlay.deselectCell(index);
      this.gamePlay.redrawPositions(this.gameState.positions);
      this.deSelect()
      this.gameState.currentPlayer = "computer";
      this.computerTurn();
    }

    // Атака
    else if (
      selection &&                                      // Выбран персонаж
      this.isCharacterInEnemyTeam(clickedCharacter) &&  // Клетка занята персонажем противника
      this.isInRange(index, selection.position, selection.character.range) // Клетка в диапазоне действия персонажа
    ) {
      this.gamePlay.deselectCell(index);
      const damage = this.calculateDamage(selection.character, clickedCharacter);
      this.gameState.attackBySelectedCharacterOn(clickedCharacter, damage);
      this.gamePlay.showDamage(index, damage).then(() => {
        this.gamePlay.redrawPositions(this.gameState.positions);
        this.deSelect();
        this.gameState.currentPlayer = "computer";
        this.computerTurn();
      });
    } 
  }

  onCellLeave(index) {
    const selection = this.gameState.currentSelection;

    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor("default");
    if (selection && selection.position != index) {
      this.gamePlay.deselectCell(index);
    }
  }

  deSelect() {
    // Снять выделение
    const selection = this.gameState.currentSelection;
    if (selection != null) {
      this.gamePlay.deselectCell(selection.position);
      this.gameState.currentSelection = null;
    }
  }

  computerTurn() {
    return
    if (this.gameState.currentPlayer == "player") {
      return;
    }

    // Взять рандомного персонажа из команды компьютера
    const character =
      this.gameState.computerTeam[
        Math.floor(Math.random() * this.gameState.computerTeam.length)
      ];

    const positionedCharacter = this.gameState.positions.find(
      (pc) => pc.character == character
    );

    // Найти ближайшего персонажа из команды игрока
    const nearestPlayer = this.gameState.positions
      .filter((pc) => this.isCharacterInPlayerTeam(pc.character))
      .reduce((nearest, player) => {
        const distance = this.getDistance(
          player.position,
          positionedCharacter.position
        );
        const nearestDistance = this.getDistance(
          nearest.position,
          positionedCharacter.position
        );
        return distance < nearestDistance ? player : nearest;
      });

    if (
      this.getDistance(positionedCharacter.position, nearestPlayer.position) <=
      positionedCharacter.range
    ) {
      // Если в радиусе атаки, то атаковать
      this.gameState.attackBySelectedCharacterOn(positionedCharacter);
      const damage = calculateDamage(character, nearestPlayer.character);
      this.gamePlay.showDamage(index, damage).then(() => {
        this.gameState.currentPlayer = "player";
        this.gamePlay.redrawPositions(this.gameState.positions);
      });
    } else {
      // Если не в радиусе атаки, то переместиться ближе к игроку
      this.moveCloser(positionedCharacter, nearestPlayer.position);
    }
  }

  moveCloser(positionedCharacter, position) {
    const boardSize = 8;

    const character = positionedCharacter.character;

    const x = positionedCharacter.position % boardSize;
    const y = Math.floor(positionedCharacter.position / boardSize);

    const targetX = position % boardSize;
    const targetY = Math.floor(position / boardSize);

    const directionX = x < targetX ? 1 : -1;
    const directionY = y < targetY ? 1 : -1;

    const dx = Math.abs(x - targetX);
    const dy = Math.abs(y - targetY);

    const moveX = directionX * Math.min(dx, character.range);
    const moveY = directionY * Math.min(dy, character.range);

    var newX = x + moveX;
    var newY = y + moveY;

    var newIndex = newX * boardSize + newY;

    // check if new position is free
    while (!this.isPositionFree(newIndex)) {
      newX -= directionX;
      if (this.isPositionFree(newX * boardSize + newY)) {
        newIndex = newX * boardSize + newY;
      } else {
        newY -= directionY;
        newIndex = newX * boardSize + newY;
      }
    }

    console.log(
      `Move ${character.type} from ${positionedCharacter.position} to ${newIndex}`
    );

    // Ищем индекс персонажа в позициях
    const characterIndex = this.gameState.positions.findIndex(
      (pc) => pc == positionedCharacter
    );

    // Назначаем персонажу новую позицию
    this.gameState.positions[characterIndex].position = newIndex;
  }

  calculateDamage = (attacker, defendant) =>
    Math.max(attacker.attack - defendant.defence, attacker.attack * 0.1);

  isInRange = (indexA, indexB, range) =>
    this.getDistance(indexA, indexB) <= range;

  getDistance(a, b) {
    const boardSize = 8;

    const x1 = Math.floor(a / boardSize);
    const y1 = a % boardSize;

    const x2 = Math.floor(b / boardSize);
    const y2 = b % boardSize;

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  isPositionFree = (index) =>
    this.gameState.positions.find((pc) => pc.position == index) ? false : true;

  isCharacterInPlayerTeam = (character) =>
    this.gameState.playerTeam.includes(character);

  isCharacterInEnemyTeam = (character) =>
    this.gameState.computerTeam.includes(character);

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
