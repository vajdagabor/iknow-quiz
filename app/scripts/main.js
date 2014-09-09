// Initializing the application
// ============================

/* global Lightframe */

(function (window) {

  'use strict';

  window.APP = new Lightframe({
    config: {
      apiEndpoint: 'http://api.iknow.jp/goals/691021/sentences.json'
    }
  });

  $(function () {
    window.APP.initAll();
  });

})(window);
