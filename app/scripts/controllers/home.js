'use strict';

angular.module('postOfficeProjectApp')
  .controller('HomeCtrl', function ($scope, $routeParams, $rootScope, User) {
  	if($routeParams["openid.spark.code"]) {
  		//Update Auth Code
  		User.update({id: $rootScope.currentUser.id, action: 'spark'}, {sparkCode: $routeParams["openid.spark.code"]}, function() {

  		});
  	}
  });
