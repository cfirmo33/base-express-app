(function () {
  'use strict';

  angular
  .module('app.auth')
  .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$cookies'];

  function authInterceptor($cookies) {
    return {
      'request': request
    };

    function request(config) {
      console.log($cookies.get('token'));
      if (angular.isUndefined($cookies.get('token'))) {
        return config;
      }

      config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      return config;
    }
  }

})();
