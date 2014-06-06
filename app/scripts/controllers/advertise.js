'use strict';

angular.module('postOfficeProjectApp')
  .controller('AdvertiseCtrl', function ($scope, $routeParams, Spark) {
 	Spark.get({id: $routeParams.id}, function(response) {
 		$scope.property = response.D.Results[0].StandardFields;
 	});
  });
