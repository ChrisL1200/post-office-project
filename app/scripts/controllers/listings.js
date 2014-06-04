'use strict';

angular.module('postOfficeProjectApp')
  .controller('ListingsCtrl', function ($scope) {
  	$scope.listings = [{
  		id: "12345",
  		price: "$1,950,000",
  		squareFeet: "4650",
  		address: "1234 Fake Street",
  		summary: "Situated between fairmount park and the prestigious philadelphia cricket club, this beautiful 2+ acre property is truly",
  		pic: "http://images.prd.mris.com/image/V2/1/Yu59d899Ocpyr_RnF0-8qNJX1oYibjwp9TiLy-bZvU9vRJ2iC1zSQgFwW-fTCs6tVkKrj99s7FFm5Ygwl88xIA.jpg",
  		beds: 1,
  		baths: 1
  	}];

  	$scope.listingsView = "my";
  });
