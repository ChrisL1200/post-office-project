'use strict';

angular.module('postOfficeProjectApp')
  .controller('ListingsCtrl', function ($scope, Spark, Listings) {
  	$scope.model = Listings;
  	$scope.$watch('model.request._page', function(newPage){
    	Listings.loadListings();
    });

  	$scope.listingsView = "my";	
  });
