/* global describe, it, xit, assert, Lightframe, APP */

(function () {

  'use strict';

  var testSentences = [{ 
    id: 18743,
    language: 'en',
    uri: 'http://iknow.jp/sentences/18743',
    difficulty: 1147,
    text: 'Here\'s your <b>receipt</b>.',
    image: 'http://assets1.iknow.jp/assets/users/Smart.fm/8l1ka415hgsbo.jpg',
    square_image: 'http://transcode3.iknow.jp/t/aHR0cDovL2Fzc2V0czEuaWtub3cuanAvYXNzZXRzL3VzZXJzL1NtYXJ0LmZtLzhsMWthNDE1aGdzYm8uanBn/8l1ka415hgsbo_70x70.jpg',  // jshint ignore:line
    sound: 'http://assets3.iknow.jp/assets/legacy/travel/audio/shopsee_s1_65.mp3',
    item_id: 21917,  // jshint ignore:line
    translations: [{
      id: 36598,
      language: 'ja',
      uri: 'http://iknow.jp/sentences/36598',
      difficulty: 12037,
      text: 'こちらが領収書です。',
      transliterations: [{
        type: 'Hira',
        text: 'こちら が りょうしゅうしょ です'
      },{
        type: 'Hrkt',
        text: 'こちら が りょうしゅうしょ です'
      },{
        type: 'Latn',
        text: 'kochira ga ryoushuusho desu'
      }]
    }]
  },{
    id: 18744,
    language: 'en',
    uri: 'http://iknow.jp/sentences/18744',
    difficulty: 512,
    text: 'Could I have a <b>receipt</b> please?',
    image: 'http://assets2.iknow.jp/assets/legacy/images/02/4822037.jpg',
    square_image: 'http://transcode0.iknow.jp/t/aHR0cDovL2Fzc2V0czIuaWtub3cuanAvYXNzZXRzL2xlZ2FjeS9pbWFnZXMvMDIvNDgyMjAzNy5qcGc=/4822037_70x70.jpg',  // jshint ignore:line
    sound: 'http://assets0.iknow.jp/assets/legacy/travel/audio/shopsee_s2_65.mp3',
    item_id: 21917,  // jshint ignore:line
    translations: [{
      id: 36599,
      language: 'ja',
      uri: 'http://iknow.jp/sentences/36599',
      text: '領収書をいただけますか。',
      transliterations: [{
        type: 'Hira',
        text: 'りょうしゅう しょ を いただけます か 。'
      },{
        type: 'Hrkt',
        text: 'りょうしゅう しょ を いただけます か 。'
      },{
        type: 'Latn',
        text: 'ryoushuu sho wo itadakemasu ka .'
      }]
    }]
  }];


  describe('Dependencies:', function () {
    
    it('jQuery should be present', function () {
      assert($, 'jQuery is not present');
    });

    it('Lightframe should be present', function () {
      assert(Lightframe, 'Lightframe is not present');
    });

    it('the global APP variable should be a Lightframe instance', function () {
      assert(APP instanceof Lightframe, 'APP is not a Lightframe instance');
    });

  });


  describe('Helpers:', function () {

    var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var shuffle = APP.helpers.quizHelper.shuffle;

    it('shuffle should work fine on arrays', function () {
      var shuffled = shuffle( array );
      assert.notDeepEqual(array, shuffled, 'Most of the times shuffled arrays should be different from the original.');
    });

    it('shuffle should randomize an array in place if asked', function () {
      var clone = array.slice(0);
      assert.notDeepEqual(array, shuffle(clone), 'Most of the time shuffled array should be different from the original.');
    });

  });


  describe('QuizController', function () {

    it('should be present', function () {
      assert(APP.controllers.Quiz, 'QuizController is not present');
    });

  });


  describe('Quiz:', function () {

    var quiz = new APP.models.Quiz();

    it('should be able initialize without problems', function () {
      assert(quiz instanceof APP.models.Quiz, 'Initialization of Quiz was not successful');
    });

    xit('should be able to get the quiz sentences from the API', function (done) {
      quiz._getSentences(function (data) {
        assert(data.sentences, '_getSentences() wasn\'t able the get the sentences from the API');
        assert(data.sentences instanceof Array, 'The "sentences" attribute should be an array');
        assert(!quiz.sentences, 'quiz.sentences was set by the _getSentences() method. This should not happen.');
        done();
      });
    });

    it('should create Sentence objects from the JSON data', function () {
      quiz._loadSentences(testSentences);
      assert(Array.isArray(quiz.sentences), 'quiz.sentences should be an array after loading the sentences.');
      assert(quiz.sentences.length === 2, 'quiz.sentences should contain two items');
      assert(quiz.sentences[0] instanceof APP.models.Sentence, 'The elements of quiz.sentences should be Sentence objects');
    });

    it('should be able to shuffle the loaded sentences');

    it('should start a new game by calling startNewGame()');

    it('prepareGame() should initialize the task object and set up the first task', function () {
      quiz.prepareGame('dontShuffle');
      assert(quiz.task, 'The task object doesn\'t exist');
      assert.equal(quiz.task.index, 0, 'The sentence index should be zero at this point.');
      assert.equal(quiz.task.sentence.words.join(' '), 'Here\'s your receipt.');
    });

    it('nextTask() should set the task object to point to the next sentence', function () {
      quiz.nextTask();
      assert.equal(quiz.task.index, 1);
      assert.equal(quiz.task.sentence.words.join(' '), 'Could I have a receipt please?');
    });

    it('nextTask() should pick up the first task again if there are no more tasks', function () {
      // Here we should stand on the last sentence.
      quiz.nextTask();
      assert.equal(quiz.task.index, 0);
      assert.equal(quiz.task.sentence.words.join(' '), 'Here\'s your receipt.');
    });

    it('guess() should return true if the answer is right and false if worng.', function () {
      assert.isTrue(quiz.guess(['Here\'s', 'your', 'receipt.']));
      assert.isFalse(quiz.guess(['Here\'s', 'receipt.', 'your']));
    });
  });


  describe('Sentence:', function () {

    it('should initialize');

    it('should set the instance properties from the given attributes');

    it('should set only allowed attributes at initialization');

    it('the cleanText() method should clean the text from any HTML tags');

    it('the splitText() method should return an array of words, which is a sliced version of the text');

    it('should create a clean array of words from the text at initialization');

    it('the mixWords() method should return with an shuffled version of the words array');

    it('the isOrderRight() method should return true if the given words are in the right order');
  });

})();
