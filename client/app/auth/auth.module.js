(function () {
  'use strict';

  angular
  .module('app.auth', [
    'ngCookies',
    
    /**
    * User service
    */
    'app.user'
  ]);
})();
