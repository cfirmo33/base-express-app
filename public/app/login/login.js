(function () {
  'use strict';

  angular
  .module('app.login')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['authService'];

  function LoginController (authService) {
      var vm = this;
      vm.user = {};

      vm.login = login;

      function login() {
        authService
        .login(vm.user.email, vm.user.password)
        .then(success, error);

        function success(response) {
          console.log(response);
        }

        function error(err) {
          console.log(err);
          vm.error = err.data.err;
        }
      }
  }

})();
