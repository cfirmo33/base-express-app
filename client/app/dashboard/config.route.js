(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
      .state('dashboard', {
          parent: 'home',
          url: '/dashboard',
          role: 'ROLE_USER',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'dashboardVm'
        });
      }
})();
