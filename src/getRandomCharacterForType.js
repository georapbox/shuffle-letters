/**
 * Get a pseudo-random character from an available pool depending on the type of the character.
 *
 * @param {string} charType The type of the character. Available values are "lowerCase", "upperCase" and "symbol".
 * @returns {string} Returns the pseudo-random character.
 */
export function getRandomCharacterForType(charType) {
  let charsPool = '';

  switch (charType) {
    case 'lowerCase':
      charsPool = 'abcdefghijklmnopqrstuvwxyz';
      break;
    case 'upperCase':
      charsPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
    case 'digit':
      charsPool = '0123456789';
      break;
    case 'symbol':
      charsPool = ',.?/\\(^)![]{}*&^%$#\'"';
      break;
    default:
      // Handle a default case if needed
      break;
  }

  const charsPoolArray = charsPool.split('');

  return charsPoolArray[Math.floor(Math.random() * charsPoolArray.length)];
}
