(function () {
  'use strict';

  angular
    .module('app.accessdenied')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
      .state('accessdenied', {
          url: '/access-denied',
          views: {
            'content@': {
              templateUrl: 'app/accessdenied/accessdenied.html',
              controller: 'AccessDeniedController',
              controllerAs: 'accessdeniedVm'
            }
          }
        });
      }
})();
