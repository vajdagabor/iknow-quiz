(function (window) {

  'use strict';
  
  window.LazyApp = function lazyApp (options) {

    options = options || {};

    this.config      = options.config || {};
    this.controllers = {};
    this.models      = {};
    this.ui          = {};
    this.helpers     = {};

    this.controller = function (name, fn) {
      this.controllers[name] = new fn();  // jshint ignore:line
    };

    this.model = function (name, fn) {
      this.models[name] = fn;
    };

    this.ui = function (name, fn) {
      this.ui[name] = fn;
    };

    this.helper = function (name, obj) {
      this.helpers[name] = obj;
    };

    this.initAll = function () {
      for (var c in this.controllers) {
        this.controllers[c].init && this.controllers[c].init();  // jshint ignore:line
      }
    };

  };

})(window);
