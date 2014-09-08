/* global APP */

APP.model('Quiz', function () {
  
  'use strict';

  var self = this;
  
  self.attrs = { };
  
  // self.sentences = null;  // Storage for the loaded quiz sentences.


  self.startNewGame = function () {
    if (!Array.isArray(self.sentences) || self.sentences.length < 1) {
      self._getSentences(function (data) {
        self._loadSentences(data.sentences);
        shuffleSentences();
      });

    } else {
      shuffleSentences();
    }
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
