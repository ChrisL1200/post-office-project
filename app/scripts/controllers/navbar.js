'use strict';

angular.module('postOfficeProjectApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
