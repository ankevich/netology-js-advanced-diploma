import {calcTileType} from "./utils";


test('функция calcTileType должна возвращать правильный тип тайла', () => {
    expect(calcTileType(0, 8)).toBe('top-left');
    expect(calcTileType(1, 8)).toBe('top');
    expect(calcTileType(7, 8)).toBe('top-right');
    expect(calcTileType(40, 8)).toBe('left');
    expect(calcTileType(15, 8)).toBe('right');
    expect(calcTileType(56, 8)).toBe('bottom-left');
    expect(calcTileType(58, 8)).toBe('bottom');
    expect(calcTileType(63, 8)).toBe('bottom-right');
    expect(calcTileType(10, 8)).toBe('center');
})