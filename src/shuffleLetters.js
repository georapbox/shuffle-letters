import { getRandomCharacterForType } from './getRandomCharacterForType';
import { isElement } from './isElement';

/**
 * Shuffle the text content of a DOM element
 *
 * @param {HTMLElement} element The HTML element whose `textContent` we want to apply the shuffle effect.
 * @param {object} [config={}] Configurable object to override the default options.
 * @param {string} [config.text=''] Alternative text that can be used instead of the `textContent` of the `element`.
 * @param {number} [config.iterations=8] The number of times the characters will be shuffled before the animation ends.
 * @param {number} [config.fps=30] The amount of frames per second that the animation runs.
 * @param {function} [config.onComplete=() => void] A callback function that is called when the animation of the effect is complete.
 * @returns {function} Returns a function that when called, it clears the `timeoutID` which identifies the timer created by the call to `setTimeout()` that is used internally for the shuffle effect.
 */
export function shuffleLetters(element, config = {}) {
  /**
   * Default options, if not provided by the user.
   * @type {object}
   */
  const defaults = {
    text: '',
    iterations: 8,
    fps: 30,
    onComplete: () => void 0
  };

  const options = {
    ...defaults,
    ...config
  };

  if (!isElement(element)) {
    throw new TypeError('Expected element to be a valid HTML element.');
  }

  /**
   * Holds all characters of the string to process.
   * @type {string[]}
   */
  const charsArray = options.text && typeof options.text === 'string'
    ? options.text.split('')
    : element.textContent.split('');

  /**
   * Holds the type for each character.
   * @type {string[]}
   */
  const charsTypes = [];

  /**
   * Holds the positions of non-space characters.
   * @type {number[]}
   */
  const charsPositions = [];

  for (let i = 0; i < charsArray.length; i += 1) {
    const char = charsArray[i];

    if (/\s/.test(char)) {
      charsTypes[i] = 'space';
      continue;
    } else if (/[a-z]/.test(char)) {
      charsTypes[i] = 'lowerCase';
    } else if (/[A-Z]/.test(char)) {
      charsTypes[i] = 'upperCase';
    } else {
      charsTypes[i] = 'symbol';
    }

    charsPositions.push(i);
  }

  element.textContent = '';

  let timeout = null;

  (function shuffle(start) {
    const charsArrayCopy = [...charsArray];
    const charsPositionsLength = charsPositions.length;

    if (start > charsPositionsLength) {
      if (typeof options.onComplete === 'function') {
        options.onComplete(element);
      }

      return;
    }

    for (let i = Math.max(start, 0); i < charsPositionsLength; i += 1) {
      if (i < start + options.iterations) {
        charsArrayCopy[charsPositions[i]] = getRandomCharacterForType(charsTypes[charsPositions[i]]);
      } else {
        charsArrayCopy[charsPositions[i]] = '';
      }
    }

    element.textContent = charsArrayCopy.join('');

    timeout = setTimeout(() => {
      shuffle(start + 1);
    }, 1000 / options.fps);
  })(-options.iterations);

  return () => {
    clearTimeout(timeout);
    timeout = null;
  };
}
