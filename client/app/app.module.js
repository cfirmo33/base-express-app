(function () {
   'use strict';

   angular.module('app', [
     /*
     * Core
     */
     'app.core',
     'app.auth',
     /*
     * Application
     */
     'app.home',
     'app.login',
     'app.accessdenied',
     'app.dashboard'
   ]);
})();
