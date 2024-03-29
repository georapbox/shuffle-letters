![build](https://github.com/georapbox/shuffle-letters/workflows/build/badge.svg)
[![npm version](https://img.shields.io/npm/v/shuffle-letters.svg)](https://www.npmjs.com/package/shuffle-letters)
[![Coverage Status](https://coveralls.io/repos/github/georapbox/shuffle-letters/badge.svg?branch=main)](https://coveralls.io/github/georapbox/shuffle-letters?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://georapbox.mit-license.org/@2021)

# shuffle-letters.js

A JavaScript library to shuffle the text content of a DOM element with an animated effect.

> NOTE: This library is a port to vanilla JavaScript of the [Shuffle Letters Effect](https://tutorialzine.com/2011/09/shuffle-letters-effect-jquery) jQuery plugin.

## Demo

Check [here](https://georapbox.github.io/shuffle-letters/) for a live demo.

## Install

```sh
$ npm install shuffle-letters --save
```

## Usage

The library is exported in UMD, CommonJS, and ESM formats. You can import it the following ways:

### Using ESM import statement

```js
import shuffleLetters from 'shuffle-letters';
```

### Using CommonJS require statement

```js
const shuffleLetters = require('shuffle-letters');

// If you use a bundler like Webpack, you may need to import it the following way 
// as it might try to use the ESM module instead of the CommonJS.
const shuffleLetters = require('shuffle-letters').default;
```

### Old school browser global
```html
<script src="https://unpkg.com/shuffle-letters"></script>
```

## API

```js
shuffleLetters(element, [config])
```

### Params

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> |  | The HTML element whose `textContent` we want to apply the shuffle effect. |
| [config] | <code>object</code> | <code>{}</code> | Configurable object to override the default options. |
| [config.text] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Alternative text that can be used instead of the `textContent` of the `element`. |
| [config.iterations] | <code>number</code> | <code>8</code> | The number of times the characters will be shuffled before the animation ends. |
| [config.fps] | <code>number</code> | <code>30</code> | The amount of frames per second that the animation runs. |
| [config.onComplete] | <code>function</code> | <code>() &#x3D;&gt; void</code> | A callback function that is called when the animation of the effect is complete. |

**Returns**: <code>function</code> - Returns a function that when called, it clears the `timeoutID` which identifies the timer created by the call to `setTimeout()` that is used internally for the shuffle effect. Useful for cleanup purposes, for example when you want to remove the element before the animation is completed.

## Usage examples

### Example 1 - Default options
#### HTML
```html
<h1>This is a funcy title</h1>
```

#### JavaScript
```js
  shuffleLetters(document.querySelector('h1'));
```

### Example 2 - Custom options

#### HTML
```html
<h1>This is a funcy title</h1>
```

#### JavaScript
```js
shuffleLetters(document.querySelector('h1'), {
  text: 'Yet another funcy title',
  iterations: 12,
  fps: 60,
  onComplete: el => {
    console.log('Effect was completed.');
    console.log(el);
  }
});
```

### Example 3 - Shuffle many elements

#### HTML
```html
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
  <li>List item 4</li>
</ul>
```

#### JavaScript
```js
const list = document.querySelector('ul');
const listItems = list.querySelectorAll('li');

Array.prototype.forEach.call(listItems, (element, index) => {
  shuffleLetters(element, {
    onComplete: elm => {
      if (index === listItems.length - 1) {
        console.log('All effects were completed');
      }
    }
  });
});
```

### Example 4 - Cleanup

#### HTML
```html
<h1>This is a funcy title</h1>
```

#### JavaScript
```js
  const clearShuffleLetters = shuffleLetters(document.querySelector('h1'), {
    iterations: 200
  });
  
  // Cleanup after 1 second
  setTimeout(() => clearShuffleLetters(), 1000);
```

## License

[The MIT License (MIT)](https://georapbox.mit-license.org/@2021)
