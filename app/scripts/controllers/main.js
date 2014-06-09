'use strict';

angular.module('postOfficeProjectApp')
  .controller('MainCtrl', function ($scope, Auth, $location, $rootScope, Config) {
  	$scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/');
      });
    };  

    $rootScope.setLocation = function(location) {
    	$location.path(location);
    };

    $rootScope.config = Config;
  });
