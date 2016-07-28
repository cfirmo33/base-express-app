(function () {
  'use strict';

  angular
    .module('app.home')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
      .state('home', {
          url: '/',
          roles: ['ROLE_USER'],
          views: {
            'content@': {
              templateUrl: 'app/home/home.html',
              controller: 'HomeController',
              controllerAs: 'homeVm'
            }
          }
        });
      }
})();
