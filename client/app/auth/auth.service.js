(function () {
  'use strict';

  angular
  .module('app.auth')
  .factory('authService', authService);

  authService.$inject = ['$q', '$http', '$cookies', 'userService'];

  function authService($q, $http, $cookies, userService) {
    var currentUser = {};
    if (angular.isDefined($cookies.get('token'))) {
      currentUser = userService.get();
    }

    return {
      login: login,
      logout: logout,
      getToken: getToken,
      isAuthenticated: isAuthenticated,
      hasRole: hasRole,
      hasAnyRole: hasAnyRole
    };

    function login(email, password) {
      var deferred = $q.defer();

      $http.post('api/auth/login', {
        email: email,
        password: password
      }).then(success, error);

      return deferred.promise;

      function success(response) {
        $cookies.put('token', response.data.token);

        currentUser = userService.get();
        deferred.resolve(response);
      }
      function error(err) {
        deferred.reject(err);
      }
    }

    function logout() {
      $cookies.remove('token');
      currentUser = {};
    }

    function getToken(){
      return $cookies.get('token');
    }

    function isAuthenticated() {
      return angular.isDefined(currentUser.roles);
    }

    function hasRole(role) {
      return currentUser.roles.indexOf(role) >= 0;
    }

    function hasAnyRole(roles) {
      // can be a string
      if (typeof roles === 'string') {
        return hasRole(roles);
      }

      var hasAnyRole = false;
      angular.forEach(roles, function (role) {
        if (currentUser.roles.indexOf(role) >= 0) {
          hasAnyRole = true;
        }
      });

      return hasAnyRole;
    }
  }

})();
