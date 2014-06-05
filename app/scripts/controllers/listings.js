'use strict';

angular.module('postOfficeProjectApp')
  .controller('ListingsCtrl', function ($scope, Spark) {
  	$scope.request = {
  		_select: "Photos(1)"
  	};

  	Spark.get($scope.request, function(response){
  		$scope.listings = response.D.Results;
  	});

  	$scope.listingsView = "my";
  });
