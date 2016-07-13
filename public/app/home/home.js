(function () {
  'use strict';

  angular
  .module('app.home')
  .controller('HomeController', HomeController);

  function HomeController () {
      var vm = this;
      vm.title = 'Basic Angular Structure';
  }

})();
