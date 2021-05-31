(function () {
  'use strict';

  var element = document.getElementById('demo-element');
  var clearShuffleLetters;

  window.shuffleLetters(element);

  document.forms[0].addEventListener('submit', function (evt) {
    const form = evt.target;

    evt.preventDefault();

    if (typeof clearShuffleLetters === 'function') {
      clearShuffleLetters();
    }

    clearShuffleLetters = window.shuffleLetters(element, {
      text: form['text'].value || 'Test it for yourself!',
      iterations: Number(form['iterations'].value) || 8,
      fps: Number(form['fps'].value) || 30
    });
  });
}());
