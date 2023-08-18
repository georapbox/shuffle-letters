/**
 * Get a pseudo-random character from an available pool depending on the type of the character.
 *
 * @param {string} charType The type of the character. Available values are "lowerCase", "upperCase" and "symbol".
 * @returns {string} Returns the pseudo-random character.
 */
export function getRandomCharacterForType(charType) {
  let charsPool = '';

  if (charType === 'lowerCase') {
    charsPool = 'abcdefghijklmnopqrstuvwxyz';
  } else if (charType === 'upperCase') {
    charsPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  } else if (charType === 'symbol') {
    charsPool = ',.?/\\(^)![]{}*&^%$#\'"';
  } else if (charType === 'digit') {
    charsPool = '0123456789';
  }

  const charsPoolArray = charsPool.split('');

  return charsPoolArray[Math.floor(Math.random() * charsPoolArray.length)];
}
