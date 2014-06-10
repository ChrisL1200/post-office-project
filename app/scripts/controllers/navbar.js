'use strict';

angular.module('postOfficeProjectApp')
  .controller('NavbarCtrl', function ($scope, $location, Listings, Config, Auth) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.data = {
    	search: ""
    };

    $scope.searchListings = function(search) {
        $location.search("query", search).path("/listings");
    };

    //Login

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };
  });
