/* global APP */

APP.controller('Quiz', function () {
  
  'use strict';

  var self = this;

  self.init = function () {
    self.quiz = new APP.models.Quiz();
    self.quiz.startNewGame(showTask);

    $('#mixed_sentence_container').on('click', '.sentence-word-available', addWord);
    $('#solved_sentence_container').on('click', '.sentence-word', removeWord);
    $('#submit').on('click', guess);
    $('#reveal').on('click', reveal);
    $('#next').on('click', nextTask);
  };

  function showTask () {
    resetScreen();
    showMixedWords();
  }

  function nextTask () {
    self.quiz.nextTask();
    showTask();
  }

  function resetScreen () {
    $('#solved_sentence_container').empty();
    $('#mixed_sentence_container').empty();
    disableButton();
    hideNextButton();
    $('#reveal').show();
  }

  function showMixedWords () {
    var mixedWords = self.quiz.task.mixedWords;
    var wordsHTML = $.map(mixedWords, function (word, index) {
                      return wordTemplate(word, index, 'available');
                    }).join('\n');
    $('#mixed_sentence_container').html(wordsHTML);
  }

  function wordTemplate (word, id, isAvailable) {
    var classes = ['sentence-word'];
    classes.push(isAvailable && ('sentence-word-available'));
    return '<div class="' + classes.join(' ') +'" data-id="' + id + '">' + word + '</div>';
  }

  function addWord () {
    var word = $(this).text();
    var id = $(this).data('id');
    self.quiz.task.myGuess.push(word);
    $(this).removeClass('sentence-word-available')
           .addClass('sentence-word-disabled');
    $('#solved_sentence_container').append(wordTemplate(word, id) + '\n');
    if ($('#mixed_sentence_container .sentence-word-available').length === 0) {
      enableButton();
    }
  }

  function removeWord () {
    var el = $(this);
    var id = el.data('id');
    var index = $('#solved_sentence_container .sentence-word').index(el);
    self.quiz.task.myGuess.splice(index, 1);
    el.remove();
    $('#mixed_sentence_container').find('.sentence-word[data-id="' + id + '"]')
                                  .removeClass('sentence-word-disabled')
                                  .addClass('sentence-word-available');
    disableButton();
  }

  function message (text, messageType, callback) {
    var el = $('<div class="message-' + messageType + '">' + text + '</div>');
    $('.message-container').html(el);
    setTimeout(function () {
      el.fadeOut(500, function () {
        el.remove();
        if (callback) {
          callback();
        }
      });
    }, 1200);
  }

  function guess () {
    disableButton();
    if (self.quiz.guess()) {
      $('#reveal').hide();
      message('Correct.', 'success', function () {
        showNextButton();
      });
    } else {
      message('Oops. No.', 'fail', function () {
        enableButton();
      });
    }
  }

  function disableButton () {
    $('#submit').prop('disabled', true);
  }

  function enableButton () {
    $('#submit').prop('disabled', false);
  }

  function showNextButton () {
    $('#submit').hide();
    $('#next').show();
  }

  function hideNextButton () {
    $('#next').hide();
    $('#submit').show();
  }

  function reveal () {
    $('#solved_sentence_container').html(self.quiz.task.sentence.words.join(' '));
    $('#mixed_sentence_container .sentence-word').each(function (index, el) {
      $(el).removeClass('sentence-word-available').addClass('sentence-word-disabled');
    });
    showNextButton();
  }

});
