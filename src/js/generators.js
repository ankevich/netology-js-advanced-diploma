import Character from "./Character";

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator(allowedTypes, maxLevel) {
  while (true) {
    const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    const level = Math.floor(Math.random() * maxLevel) + 1;
    yield new type(level);
  }
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  return new Array(characterCount)
    .fill(0)
    .map(() => characterGenerator(allowedTypes, maxLevel).next().value);
}
