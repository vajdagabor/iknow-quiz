/* global APP */

APP.ui('Screen', function () {

  'use strict';

  var self = this;

  self.showMixedWords = function (mixedWords) {
    var wordsHTML = $.map(mixedWords, function (word) {
                      return '<div class="sentence-word">' + word + '</div>';
                    }).join('\n');
    $('#mixed_sentence_container').html(wordsHTML);
  };

});
