import { Character } from "./Character";

class Bowman extends Character {
  constructor(level) {
    super(level, 'bowman');
    this.attack = 25;
    this.defence = 25;
  }
}

class Swordsman extends Character {
  constructor(level) {
    super(level, 'swordsman');
    this.attack = 40;
    this.defence = 10;
  }
}

class Magician extends Character {
  constructor(level) {
    super(level, 'magician');
    this.attack = 10;
    this.defence = 40;
  }
}

class Vampire extends Character {
  constructor(level) {
    super(level, 'vampire');
    this.attack = 25;
    this.defence = 25;
  }
}

class Undead extends Character {
  constructor(level) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
  }
}

class Daemon extends Character {
  constructor(level) {
    super(level, 'daemon');
    this.attack = 10;
    this.defence = 40;
  }
}

export { Bowman, Swordsman, Magician, Vampire, Undead, Daemon };