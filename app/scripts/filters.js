'use strict';

angular.module('postOfficeProjectApp')
  .filter('digitLimit', function () {
    return function(input, scope) {
    	var suffix = "";
    	var result = input;
    	if (input!=null) {
	        if((input / 1000000) >= 1) {
	        	result = input / 1000000;
	        	suffix = "m";
	       	}
	        else if((input / 1000) >= 1) {
	        	result = input / 1000;
	        	suffix = "k";
	        }
    	}

        return Math.round(result).toString() + suffix;
    }
  });
