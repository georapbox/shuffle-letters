(function () {
  'use strict';

  var element = document.getElementById('element');
  var form = document.getElementById('form');

  window.shuffleLetters(element);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.shuffleLetters(element, {
      text: evt.target['text'].value || 'Test it for yourself!',
      onComplete: (el) => {
        console.log('Finished', el);
      }
    });
  });
}());
