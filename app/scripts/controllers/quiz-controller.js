/* global APP */

APP.controller('Quiz', function () {
  
  'use strict';

  var self = this;

  self.init = function () {
    self.quiz = new APP.models.Quiz();
    self.quiz.startNewGame(round);

    $('#mixed_sentence_container').on('click', '.sentence-word-available', addWord);
    $('#submit').on('click', guess);
  };

  function round () {
    showMixedWords();
  }

  function wordTemplate (word, isAvailable) {
    var classes = ['sentence-word'];
    classes.push(isAvailable && ('sentence-word-available'));
    return '<div class="' + classes.join(' ') +'">' + word + '</div>';
  }

  function showMixedWords () {
    var mixedWords = self.quiz.task.mixedWords;
    var wordsHTML = $.map(mixedWords, function (word) {
                      return wordTemplate(word, 'available');
                    }).join('\n');
    $('#mixed_sentence_container').html(wordsHTML);
  }

  function addWord () {
    var word = $(this).text();
    self.quiz.task.myGuess.push(word);
    $(this).removeClass('sentence-word-available')
           .addClass('sentence-word-disabled');
    $('#solved_sentence_container').append(wordTemplate(word) + '\n');
  }

  function guess () {
    if (self.quiz.guess()) {
      console.log('Yeah!');
    } else {
      console.log('Nope.');
    }
  }

});
