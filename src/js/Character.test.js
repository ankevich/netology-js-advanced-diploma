import Character from './Character';

test('нельзя создавать экземпляры Character', () => {
  expect(() => new Character()).toThrowError('Нельзя создавать экземпляры базового класса');
});

test('можно создавать экземпляры класса унаследованных от Character', () => {
  class Daemon extends Character {}

  const newCharacter = new Daemon(1);
  expect(newCharacter.level).toBe(1);
});
