import { JSDOM } from 'jsdom';
import { shuffleLetters } from '../src/shuffleLetters';
import { isElement } from '../src/isElement';

jest.mock('../src/isElement', () => ({
  isElement: jest.fn()
}));

describe('shuffle-letters.js', () => {
  const defaultText = 'This is a funcy title!';
  const { document } = new JSDOM(`<!DOCTYPE html><h1>${defaultText}</h1>`).window;
  const el = document.querySelector('h1');

  const options = {
    iterations: 1,
    fps: 60
  };

  beforeEach(() => {
    isElement.mockImplementation(() => true);
  });

  it('should throw error if first argument is not HTMLElement', () => {
    isElement.mockImplementation(() => false);

    expect(() => {
      return shuffleLetters(el);
    }).toThrow(new TypeError('Expected element to be a valid HTML element.'));
  });

  it('should call the onComplete callback', done => {
    const fn = jest.fn();

    shuffleLetters(el, {
      ...options,
      onComplete: el => {
        done();
        fn(el);
        expect(fn).toHaveBeenCalledWith(el);
      }
    });
  });

  it('the final text content of the element should be the same as in the beginning', done => {
    shuffleLetters(el, {
      ...options,
      onComplete: el => {
        done();
        expect(el.textContent).toBe(defaultText);
      }
    });
  });

  it('should override the element\'s default text content', done => {
    shuffleLetters(el, {
      ...options,
      text: 'Custom text',
      onComplete: el => {
        done();
        expect(el.textContent).toBe('Custom text');
      }
    });
  });

  it('should cleanup when called', () => {
    const clearShuffleLetters = shuffleLetters(el);

    expect(typeof clearShuffleLetters).toBe('function');

    clearShuffleLetters();
  });
});
