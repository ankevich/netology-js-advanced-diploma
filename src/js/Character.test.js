import Character from "./Character";

test('Character class should not be instantiable', () => {
  expect(() => new Character()).toThrowError('Нельзя создавать экземпляры базового класса');
})
