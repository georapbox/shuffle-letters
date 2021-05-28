/**
 * Get a pseudo-random character from an available pool depending on the type of the character.
 *
 * @param {string} charType The type of the character. Available values are "lowerCase", "upperCase" and "symbol".
 * @returns {string} Returns the pseudo-random character.
 */
export function getRandomCharacterForType(charType) {
  let charsPool = '';

  if (charType === 'lowerCase') {
    charsPool = 'abcdefghijklmnopqrstuvwxyz0123456789';
  } else if (charType === 'upperCase') {
    charsPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  } else if (charType === 'symbol') {
    charsPool = ',.?/\\(^)![]{}*&^%$#\'"';
  }

  const charsPoolArray = charsPool.split('');

  return charsPoolArray[Math.floor(Math.random() * charsPoolArray.length)];
}
