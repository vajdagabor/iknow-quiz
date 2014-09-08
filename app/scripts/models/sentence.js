/* global APP */

APP.model('Sentence', function (attrs) {

  'use strict';


  var self = this;
  var allowedAttrs = [ 'id', 'language', 'uri', 'difficulty', 'text', 'image', 'square_image', 'sound', 'item_id', 'translations'];

  self.attrs = { };
  
  // self.words = undefined;


  function init () {
    setAttrs();
    splitText();
  }

  function setAttrs () {
    for (var attrName in attrs) {
      if (allowedAttrs.indexOf(attrName) !== -1) {
        self.attrs[attrName] = attrs[attrName];
      }
    }
  }

  function cleanText () {
    return self.attrs.text.replace(/<[^>]*>/g, '');
  }

  function splitText () {
    return (self.words = self.words || cleanText().split(/\s+/) );
  }

  self.mixWords = function () {
    var mixedWords = APP.helpers.quizHelper.shuffle( splitText() );
    if (self.isOrderRight(mixedWords)) {
      mixedWords = self.mixWords();
    }
    return mixedWords;
  };

  self.isOrderRight = function (mixedWords) {
    return mixedWords.join('') === self.words.join('');
  };


  init();
});
