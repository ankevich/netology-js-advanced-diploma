import GameController from "./GameController"
import {Bowman} from "./Characters"

test('функция generateTooltip показывает тултип', () => {
    const gameController = new GameController();
    const character = new Bowman(1);
    const tooltip = gameController.generateTooltip(character);
    expect(tooltip).toBe(`bowman: 🎖1 ⚔25 🛡25 ❤50 🦶2`) 
})