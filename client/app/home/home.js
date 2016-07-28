(function () {
  'use strict';

  angular
  .module('app.home')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['authService', '$state', '$http'];

  function HomeController (authService, $state, $http) {
      var vm = this;
      vm.title = 'Home';
      vm.logout = logout;

      function logout() {
        authService.logout();
        $state.go('login');
      }
  }

})();
