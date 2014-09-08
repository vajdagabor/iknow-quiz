/* global APP */

APP.controller('Quiz', function () {
  
  'use strict';

  var self = this;

  self.init = function () {
    self.quiz = new APP.models.Quiz();
    self.quiz.startNewGame(round);

    $('#mixed_sentence_container').on('click', '.sentence-word', addWord);
  };

  function round () {
    showMixedWords();
  }

  function showMixedWords () {
    var mixedWords = self.quiz.task.mixedWords;
    var wordsHTML = $.map(mixedWords, function (word) {
                      return '<div class="sentence-word">' + word + '</div>';
                    }).join('\n');
    $('#mixed_sentence_container').html(wordsHTML);
  }

  function addWord () {
    console.log( $(this).text() );
  }

});
