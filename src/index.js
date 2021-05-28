import { getRandomCharacterForType } from './getRandomCharacterForType';
import { isElement } from './isElement';

/**
 * Shuffle the text content of a DOM element
 *
 * @param {HTMLElement} element
 * @param {object} config
 * @param {string} config.text
 * @param {number} config.step
 * @param {number} config.fps
 * @param {function} config.callback
 */
export default function shuffleLetters(element, config = {}) {
  /**
   * Default options, if not provided by the user.
   * @type {object}
   */
  const defaults = {
    text: '',
    step: 8,
    fps: 30,
    callback: () => {}
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

  (function shuffle(start) {
    const charsArrayCopy = [...charsArray];
    const charsPositionsLength = charsPositions.length;

    if (start > charsPositionsLength) {
      if (typeof options.callback === 'function') {
        options.callback(element);
      }

      return;
    }

    for (let i = Math.max(start, 0); i < charsPositionsLength; i += 1) {
      if (i < start + options.step) {
        charsArrayCopy[charsPositions[i]] = getRandomCharacterForType(charsTypes[charsPositions[i]]);
      } else {
        charsArrayCopy[charsPositions[i]] = '';
      }
    }

    element.textContent = charsArrayCopy.join('');

    setTimeout(() => {
      shuffle(start + 1);
    }, 1000 / options.fps);
  })(-options.step);
}
