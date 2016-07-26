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
    function meetRequirements(event, nextRoute) {
      console.log(nextRoute);
      var isAuthenticated = authService.isAuthenticated();

      // not logged in
      if ((nextRoute.authenticade || nextRoute.roles) && !isAuthenticated) {
        // redirect to login page
        $state.go('login');
        return;
      }
      // doesn't have rights to access desired route
      if((nextRoute.roles && isAuthenticated) && !authService.hasAnyRole(nextRoute.roles)) {
        // show access denied page
        return;
      }
    }
  }

})();
