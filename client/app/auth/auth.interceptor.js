(function () {
  'use strict';

  angular
  .module('app.auth')
  .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$cookies', '$rootScope'];

  function authInterceptor($cookies, $rootScope) {
    return {
      'request': request,
      'responseError': responseError
    };

    function request(config) {
      if (angular.isUndefined($cookies.get('token'))) {
        return config;
      }
      config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      return config;
    }

    function responseError(rejection) {
      // unauthorized
      if (rejection.status === 401) {
        $rootScope.$emit('$unauthorized', rejection);
      }
    }
  }

})();
