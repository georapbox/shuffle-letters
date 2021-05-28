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
