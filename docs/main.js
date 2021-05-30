(function () {
  'use strict';

  var element = document.getElementById('element');
  var form = document.getElementById('form');
  var clearShuffleLetters;

  window.shuffleLetters(element);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (typeof clear === 'function') {
      clearShuffleLetters();
    }

    clearShuffleLetters = window.shuffleLetters(element, {
      text: evt.target['text'].value || 'Test it for yourself!',
      onComplete: (el) => {
        console.log('Finished', el);
      }
    });
  });
}());
