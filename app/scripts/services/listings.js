'use strict';

angular.module('postOfficeProjectApp')
  .factory('Listings', function (Spark) {
  	var listings = {};

   listings.request = {
  		_pagination: 1,
  		_page: 1,
  		_expand: "PrimaryPhoto",
  		_filter: ""
  	};

  	listings.loadListings = function() {
	  	Spark.get(listings.request, function(response){
	  		listings.listings = response.D.Results;
        listings.totalListings = response.D.Pagination.TotalRows;
	  	});
  	}; 

  	return listings;
  });
