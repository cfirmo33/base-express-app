(function () {
  'use strict';

  angular
    .module('app.login')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
      .state('login', {
          url: '/login',
          views: {
            'content@': {
              templateUrl: 'app/login/login.html',
              controller: 'LoginController',
              controllerAs: 'loginVm'
            }
          }
        });
      }
})();
