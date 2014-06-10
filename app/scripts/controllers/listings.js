'use strict';

angular.module('postOfficeProjectApp')
  .controller('ListingsCtrl', function ($scope, Spark, Listings, Config, $routeParams) {
  	$scope.model = Listings;

  	if($routeParams.query) {
  		var upperCase = $routeParams.query.toUpperCase();
    	Listings.request._filter = "";
    	angular.forEach(Config.searchFields, function(field, index){
    		if(index < Config.searchFields.length - 1)
    			Listings.request._filter += field + " Eq '" + upperCase + "' OR ";
    		else
    			Listings.request._filter += field + " Eq '" + upperCase + "'";
    	});
  	};

  	$scope.$watch('model.request._page', function(newPage){
    	Listings.loadListings();
    });

  	$scope.listingsView = "my";	
  });
