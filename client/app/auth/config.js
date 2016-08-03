(function () {
  'use strict';

  angular
  .module('app.auth')
  .config(authConfig);

  angular
  .module('app.auth')
  .run(authRun);

  authConfig.$inject = [
    '$httpProvider'
  ];

  function authConfig($httpProvider, $rootScope, authService) {
    $httpProvider.interceptors.push('authInterceptor');
  }

  authRun.$inject = [
    '$rootScope',
    'authService',
    '$state'
  ];

  function authRun($rootScope, authService, $state) {
    // checks if ser has authority to access desired route
    $rootScope.$on('$stateChangeStart', meetRequirements);
    $rootScope.$on('$unauthorized', redirectUser);

    function meetRequirements(event, nextRoute) {
      var isAuthenticated = authService.isAuthenticated();

      // not logged in
      if ((nextRoute.authenticade || nextRoute.role) && !isAuthenticated) {
        // redirect to login page
        $state.go('login');
        return;
      }
      // doesn't have rights to access desired route
      if((nextRoute.role && isAuthenticated) && !authService.hasRole(nextRoute.role)) {
        // show access denied page
        return;
      }
    }

    // function called when user token has expired
    function redirectUser(event, rejection) {
      // temp
      alert(rejection.data.message);
      authService.logout();
      $state.go('login');
    }
  }

})();
