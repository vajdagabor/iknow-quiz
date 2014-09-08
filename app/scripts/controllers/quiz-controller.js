/* global APP */

APP.controller('Quiz', function () {
  
  'use strict';

  var self = this;

  self.init = function () {
    self.quiz = new APP.models.Quiz();
    self.screen = new APP.ui.Screen();
    self.quiz.startNewGame(round);
  };

  function round () {
    console.log('Started…');
    console.log( self.quiz.task.mixedWords );
    self.screen.showMixedWords( self.quiz.task.mixedWords );
  }

});
