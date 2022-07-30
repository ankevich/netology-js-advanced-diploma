import { generateTeam } from "./generators";
import {
  Bowman,
  Swordsman,
  Magician,
  Vampire,
  Undead,
  Daemon,
} from "./Characters";
import PositionedCharacter from "./PositionedCharacter";
import themes from "./themes";

export default class GameState {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.maxLevel = 3;    
    this.allowedPlayerClasses = [Magician, Bowman, Swordsman];
    this.allowedComputerClasses = [Vampire, Undead, Daemon];
    
    this.resetState();
  }
  
  resetState() {
    this.currentTheme = null;
    this.currentLevel = 0;
    this.currentPlayer = "player"; // player or computer
    this.currentSelection = null; // PositionedCharacter
    this.playerTeam = [];
    this.computerTeam = [];
    this.positions = []; // PositionedCharacter[]
    
    this.nextLevel();
  }
  
  nextLevel() {
    if (this.isLevelOver()) {
      switch (this.currentTheme) {
        case themes.prairie:
          this.currentTheme = themes.desert;
          this.currentLevel = 1;
          this.playerTeam.forEach(this.healAndLevelUp);
          this.playerTeam.push(...generateTeam(this.allowedPlayerClasses, 1, 1));
          this.computerTeam = generateTeam(this.allowedComputerClasses, 2, this.playerTeam.length);
          break;
        case themes.desert:
          this.currentTheme = themes.arctic;
          this.currentLevel = 2;
          this.playerTeam.forEach(this.healAndLevelUp);
          this.playerTeam.push(...generateTeam(this.allowedPlayerClasses, 2, 2));
          this.computerTeam = generateTeam(this.allowedComputerClasses, 3, this.playerTeam.length);
          break;
        case themes.arctic:
          this.currentTheme = themes.mountain;
          this.currentLevel = 3;
          this.playerTeam.forEach(this.healAndLevelUp);
          this.playerTeam.push(...generateTeam(this.allowedPlayerClasses, 3, 2));
          this.computerTeam = generateTeam(this.allowedComputerClasses, 4, this.playerTeam.length);
          break;
        case themes.mountain:
          // заблокировать игру
          break;
        default: 
          // установка первого уровня
          this.currentTheme = themes.prairie;
          this.playerTeam = generateTeam(this.allowedPlayerClasses, 1, 2);
          this.computerTeam = generateTeam(this.allowedComputerClasses, 1, 2);
          break;
      }
      this.reassignPositions();
    }
  }

  healAndLevelUp(character) {
    character.health = 50;
    character.level ++;
    return character;
  }

  reassignPositions() {
    var allowedPlayerStartPositions = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    var allowedComputerPositions = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
    this.positions = [];

    this.playerTeam.forEach((character) => {
      const index = Math.floor(Math.random() * allowedPlayerStartPositions.length);
      const position = allowedPlayerStartPositions[index];
      allowedPlayerStartPositions.splice(index, 1);
      this.positions.push(new PositionedCharacter(character, position));
    });

    this.computerTeam.forEach((character) => {
      const index = Math.floor(Math.random() * allowedComputerPositions.length);
      const position = allowedComputerPositions[index];
      allowedComputerPositions.splice(index, 1);
      this.positions.push(new PositionedCharacter(character, position));
    });
  }

  select(character) {
    this.currentSelection = this.positions.find(
      (pc) => pc.character === character
    );
  }

  moveSelectedCharacterTo(newPosition) {
    const character = this.currentSelection.character;
    if (character) {
      const characterIndex = this.positions.findIndex(
        (pc) => pc.character === character
      );
      this.positions[characterIndex].position = newPosition;
    }
  }
  
  attack({character}, dmg) { // PositionedCharacter
    if (character) {
      const index = this.positions.findIndex(
        (pc) => pc.character === character
      );

      this.positions[index].character.health -= dmg;
      this.removeDeadCharacters();
    }
  }

  removeDeadCharacters() {
    this.positions = this.positions.filter(
      (pc) => pc.character.health > 0
    );
    this.computerTeam = this.computerTeam.filter(
      (character) => character.health > 0
    );
    this.playerTeam = this.playerTeam.filter(
      (character) => character.health > 0
    );
  }

  isGameOver() {
    return this.isLevelOver() && this.currentLevel >= this.maxLevel;
  }

  isLevelOver() {
    return this.playerTeam.length === 0 || this.computerTeam.length === 0;
  }

  getCharacterAt(position) {
    const positionedCharacter = this.positions.find(
      (pc) => pc.position === position
    );
    return positionedCharacter ? positionedCharacter.character : null;
  }

  restoreFrom({currentTheme, currentLevel, currentPlayer, positions}) { 
    this.playerTeam = []
    this.computerTeam = []
    this.currentTheme = currentTheme;
    this.currentLevel = currentLevel;
    this.currentPlayer = currentPlayer;
    
    this.positions = positions.map(({character, position}) => {
      const parsedCharacter = this.characterFromData(character);
      if (this.allowedPlayerClasses.includes(parsedCharacter.constructor)) {
        this.playerTeam.push(parsedCharacter);
      }
      if (this.allowedComputerClasses.includes(parsedCharacter.constructor)) {
        this.computerTeam.push(parsedCharacter);
      }
      return new PositionedCharacter(parsedCharacter, position);
    }); 
  }

  characterFromData = ({type, level, health, attack, defence, range}) => {
    const character = this.typeToCharacter(type, level);
    character.health = health;
    character.attack = attack;
    character.defence = defence;
    character.range = range;
    return character;
  }

  typeToCharacter(type, level) {
    switch (type) {
      case "bowman":
        return new Bowman(level);
      case "swordsman":
        return new Swordsman(level);
      case "magician":
        return new Magician(level);
      case "vampire":
        return new Vampire(level);
      case "undead":
        return new Undead(level);
      case "daemon":
        return new Daemon(level);
    }
  }

  asObject() {
    return {
      currentTheme: this.currentTheme,
      currentLevel: this.currentLevel,
      currentPlayer: this.currentPlayer,
      positions: this.positions,
    };
  }
}
