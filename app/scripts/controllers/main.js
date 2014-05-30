'use strict';

angular.module('postOfficeProjectApp')
  .controller('MainCtrl', function ($scope, Auth, $location) {
  	$scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };  
  });
