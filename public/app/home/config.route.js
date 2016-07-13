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
