(function () {
  'use strict';

  angular
  .module('app.login')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['authService', '$state'];

  function LoginController (authService, $state) {
      var vm = this;
      vm.user = {};

      vm.login = login;

      function login() {
        authService
        .login(vm.user.email, vm.user.password)
        .then(success, error);

        function success() {
          $state.go('home');
        }

        function error(err) {
          vm.error = err.data.err;
        }
      }
  }

})();
