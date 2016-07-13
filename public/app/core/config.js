(function () {
  'use strict';

  angular
  .module('app.core')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  }
})();
