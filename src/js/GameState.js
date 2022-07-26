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

    this.currentPlayer = 0; // 0 - player, 1 - computer

    this.playerTeam = generateTeam([Magician, Bowman, Swordsman], 1, 2);
    this.computerTeam = generateTeam([Daemon, Undead, Vampire], 1, 2);

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

  static restoreFrom(object) {
    // TODO: create object
  }

  asObject() {
    return {
      boardSize: this.boardSize,
      positions: this.positions,
      currentPlayer: this.currentPlayer,
      playerTeam: this.playerTeam,
      computerTeam: this.computerTeam,
    };
  }
}
