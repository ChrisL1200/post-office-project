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
        var upperCase = search.toUpperCase();
    	Listings.request._filter = "";
    	angular.forEach(Config.searchFields, function(field, index){
    		if(index < Config.searchFields.length - 1)
    			Listings.request._filter += field + " Eq '" + upperCase + "' OR ";
    		else
    			Listings.request._filter += field + " Eq '" + upperCase + "'";
    	});
    	Listings.loadListings();
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
