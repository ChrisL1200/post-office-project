'use strict';

angular.module('postOfficeProjectApp')
  .controller('HomeCtrl', function ($scope, $routeParams, $rootScope, User) {
  	if($routeParams["openid.spark.code"]) {
  		//Update Auth Code
  		User.update({id: $rootScope.currentUser.id, action: 'spark'}, {sparkCode: $routeParams["openid.spark.code"]}, function() {

  		});
  	};

  	$scope.bustObject = {
  		4: 0,
  		5: 0,
  		6: 0,
  		7: 0,
  		8: 0,
  		9: 0,
  		10: 0,
  		11: 0,
  		12: 0,
  		13: 0,
  		14: 0,
  		15: 0,
  		16: 0,
  		17: 0,
  		18: 0,
  		19: 0,
  		20: 0,
  		21: 0,
  		"Bust": 0
  	};

  	 var oddsPerCard = {
		2: 1/13,
		3: 1/13,
		4: 1/13,
		5: 1/13,
		6: 1/13,
		7: 1/13,
		8: 1/13,
		9: 1/13,
		10: 4/13,
		11: 1/13
	};
  	// 2-9 = 1/13, 10 = 4/13, 1 || 11 = 1/13
  	$scope.showingCard = 8;
  	var oddsFactor = 1;
  	var oddsCalculator = function(value) {
  		var temp = 0;
  		var currentOddsFactor = oddsFactor;
  		var object = {

  		};

  		for(var i = 2; i < 12; i++) {
  			temp = i + value;
  			if(temp >= 22) {
  				$scope.bustObject["Bust"] += oddsPerCard[i] * oddsFactor;
  				currentOddsFactor = currentOddsFactor - oddsPerCard[i] * oddsFactor;
  				object[value+i] = true;
  		    }
  		    else if(temp >= 17 && temp <= 21) {
  				$scope.bustObject[(value + i)] += oddsPerCard[i] * oddsFactor;
  				currentOddsFactor = currentOddsFactor - oddsPerCard[i] * oddsFactor;
  				object[value+i] = true;
  		    }
  			else { 
  				$scope.bustObject[(value + i)] += oddsPerCard[i];
				object[value+i] = false;
  			}
  		};
  		oddsFactor = currentOddsFactor;
  		angular.forEach(object, function(val,key) {
  			if(!val)
  				oddsCalculator(parseInt(key));
  		});
  	};

  	oddsCalculator($scope.showingCard);
  });
