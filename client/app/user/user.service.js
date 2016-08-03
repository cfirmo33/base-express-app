(function () {
  'use strict';

  angular
  .module('app.user')
  .factory('userService', userService);

  userService.$inject = ['$resource'];

  function userService($resource) {
    return $resource('api/user/:id/:controller', {id: '@id'}, {
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      }
    });
  }

})();
