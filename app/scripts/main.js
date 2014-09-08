// Initializing the application
// ============================

/* global LazyApp */

(function (window) {

  'use strict';

  window.APP = new LazyApp({
    config: {
      apiEndpoint: 'http://api.iknow.jp/goals/691021/sentences.json'
    }
  });

  $(function () {
    window.APP.initAll();
  });

})(window);
