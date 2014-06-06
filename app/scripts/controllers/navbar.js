'use strict';

angular.module('postOfficeProjectApp')
  .controller('NavbarCtrl', function ($scope, $location, Listings, Config) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.data = {
    	search: ""
    };

    $scope.searchListings = function(search) {
    	Listings.request._filter = "";
    	angular.forEach(Config.searchFields, function(field, index){
    		if(index < Config.searchFields.length - 1)
    			Listings.request._filter += field + " Eq '" + search + "' OR ";
    		else
    			Listings.request._filter += field + " Eq '" + search + "'";
    	});
    	Listings.loadListings();
    };
  });
