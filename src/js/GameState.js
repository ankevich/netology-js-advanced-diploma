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

export default class GameState {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.cells = new Array(boardSize * boardSize).fill(null);

    this.currentPlayer = "player"; // player or computer
    this.currentSelection = null; // PositionedCharacter

    this.allowedPlayerClasses = [Magician, Bowman, Swordsman];
    this.allowedComputerClasses = [Vampire, Undead, Daemon];

    this.playerTeam = generateTeam(this.allowedPlayerClasses, 1, 2);
    this.computerTeam = generateTeam(this.allowedComputerClasses, 1, 2);

    this.positions = [];
    this.assignPositions();
  }

  assignPositions() {
    var allowedPlayerStartPositions = [
      0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57,
    ];
    var allowedComputerPositions = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55,
    ];

    this.playerTeam.forEach((character) => {
      const index = Math.floor(
        Math.random() * allowedPlayerStartPositions.length
      );
      const position = allowedPlayerStartPositions[index];
      // remove selected position from allowed positions
      allowedPlayerStartPositions.splice(index, 1);
      this.positions.push(new PositionedCharacter(character, position));
    });

    this.computerTeam.forEach((character) => {
      const index = Math.floor(Math.random() * allowedComputerPositions.length);
      const position = allowedComputerPositions[index];
      // remove selected position from allowed positions
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

  attackBySelectedCharacterOn(opponent, damage) {
    const character = this.currentSelection.character;
    if (character) {
      const opponentIndex = this.positions.findIndex(
        (pc) => pc.character === opponent
      );

      this.positions[opponentIndex].character.health -= damage;
    }
  }

  getCharacterAt(position) {
    const positionedCharacter = this.positions.find(
      (pc) => pc.position === position
    );
    return positionedCharacter ? positionedCharacter.character : null;
  }

  static restoreFrom(object) {
    // TODO: create object
  }

  asObject() {}
}
