/* global APP */

APP.model('Quiz', function () {
  
  'use strict';

  var self = this;
  
  // self.sentences = [];    // Storage for the loaded quiz sentences.
  // self.task = {};         // Details of the current task.


  self.startNewGame = function () {
    if (!Array.isArray(self.sentences) || self.sentences.length < 1) {
      self._getSentences(function (data) {
        self._loadSentences(data.sentences);
        self.prepareGame();
      });

    } else {
      self.prepareGame();
    }
  };

  self.prepareGame = function (dontShuffle) {
    if (!dontShuffle) {
      shuffleSentences();
    }
    self.task = {};
    self.nextTask();
  };

  self.nextTask = function () {
    if (self.task.index && self.task.index + 1 >= self.sentences.length) {
      return false;
    }
    self.task.index = typeof self.task.index === 'undefined' ? 0 : self.task.index + 1;
    self.task.sentence = self.sentences[ self.task.index ];
    self.task.mixedWords = self.task.sentence.mixWords();
    return true;
  };

  self.guess = function (words) {
    return self.task.sentence.isOrderRight(words);
  };

  self._getSentences = function (callback) {
    $.ajax({
      url: APP.config.apiEndpoint,
      dataType: 'jsonp'
    
    }).done(function (data) {
      callback(data);
    
    }).fail(function (jqXHR, textStatus, errorThrown) {
      throw('Oops. Couldn\'t get the sentences: ' + errorThrown + '  (' + textStatus + ')');
    });
  };

  self._loadSentences = function (sentences) {
    self.sentences = [];
    
    for (var i = 0, l = sentences.length; i < l; i++) {
      self.sentences[i] = new APP.models.Sentence( sentences[i] );
    }
  };

  function shuffleSentences() {
    APP.helpers.quizHelper.shuffle(self.sentences, true);
  }

});
