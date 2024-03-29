/* global APP, localSentences */

APP.model('Quiz', function () {
  
  'use strict';

  var self = this;
  
  // self.sentences = [];    // Storage for the loaded quiz sentences.
  // self.task = {};         // Details of the current task.


  self.startNewGame = function (done) {
    if (!Array.isArray(self.sentences) || self.sentences.length < 1) {
      self._getSentences(function (data) {
        self._loadSentences(data.sentences);
        self.prepareGame();
        done();
      });

    } else {
      self.prepareGame();
      done();
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
    if ((typeof self.task.index === 'undefined') ||
        (self.task.index + 1 >= self.sentences.length))
    {
      self.task.index = 0;
    } else {
      self.task.index++;
    }
    self.task.sentence = self.sentences[ self.task.index ];
    self.task.mixedWords = self.task.sentence.mixWords();
    self.task.myGuess = [];
  };

  self.guess = function (words) {
    return self.task.sentence.isOrderRight(words || self.task.myGuess);
  };

  self._getSentences = function (callback) {
    /* If this variable present and contains the sentences in the same format
     * what the API provides, then we can test the app without
     * network connection.
     */
    if (window.localSentences) {
      callback(window.localSentences);

    } else {
      $.ajax({
        url: APP.config.apiEndpoint,
        dataType: 'jsonp'
      
      }).done(function (data) {
        callback(data);
      
      }).fail(function (jqXHR, textStatus, errorThrown) {
        throw('Oops. Couldn\'t get the sentences: ' + errorThrown + '  (' + textStatus + ')');
      });
    }
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
