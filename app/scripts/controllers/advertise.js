'use strict';

angular.module('postOfficeProjectApp')
  .controller('AdvertiseCtrl', function ($scope, $routeParams, Spark, Config) {
  	$scope.status = {
      agentName: false,
      agentPhoto: false
    };
    $scope.templates = angular.copy(Config.templates);
 	Spark.get({id: $routeParams.id}, function(response) {
 		var fakeResponse = {"D":{"Results":[{"ResourceUri":"/v1/listings/20070621191958522498000000","StandardFields":{"CoListAgentURL":null,"MlsId":"20090403000000000001000000","CoListOfficeId":null,"Longitude":"********","ListAgentId":"20110315124649945876000000","ListAgentPreferredPhoneExt":null,"ListAgentPager":null,"ListOfficeURL":null,"City":"GREAT FALLS","CoListAgentTollFreePhone":null,"ListAgentFirstName":"Listing","Latitude":"********","BathsThreeQuarter":"********","CoListAgentVoiceMailExt":null,"CoListAgentDirectPhone":null,"CoListOfficePhoneExt":null,"ListAgentEmail":"demomls@flexmls.com","MLSAreaMinor":"2 - 25th St E to MAFB and S to 10th Ave S","CoListAgentMiddleName":null,"CountyOrParish":null,"ListAgentVoiceMailExt":null,"CoListAgentVoiceMail":null,"ListOfficePhoneExt":null,"StreetSuffix":"ST","CoListAgentDesignation":null,"ClosePrice":null,"ListAgentVoiceMail":null,"ListAgentPreferredPhone":"800-437-4232","CoListAgentPreferredPhone":null,"StateOrProvince":"MT","MlsStatusInformation":null,"SubdivisionName":null,"CoListOfficePhone":null,"ListOfficePhone":"800-437-4232","ListAgentMiddleName":null,"CoListAgentCellPhone":null,"ListOfficeEmail":"demomls@flexmls.com","PostalCode":"59405","StreetName":"47","ListAgentFax":null,"CoListAgentLastName":null,"CoListAgentPreferredPhoneExt":null,"StreetDirSuffix":"S","PublicRemarks":"TAXES ARE SENIOR CITIZEN RATE AND NON TRANSFERRABLE. LOOKS LIKE NICE HARD WOOD FLOORS UNDER DATED CARPETING. NEWER DISHWASHER AND REFRIG. WASHER/DRYER STAYS. VACANT & EASY TO SHOW.","CoListOfficeURL":null,"BuyerAgentId":null,"YearBuilt":1959,"ListAgentOfficePhone":"800-437-4232","ListAgentStateLicense":null,"PropertySubType":"Single Family","CoListAgentOfficePhoneExt":null,"CoListOfficeName":null,"ListPrice":129900.0,"CoListAgentStateLicense":null,"ListingId":"07-1228","ListAgentTollFreePhone":null,"ListAgentDirectPhone":null,"ListAgentOfficePhoneExt":null,"CoListAgentFirstName":null,"ListOfficeName":"Listing Office","CoListAgentFax":null,"MlsStatus":"Cancelled","CloseDate":null,"CoListAgentId":null,"CoListOfficeEmail":null,"ListOfficeFax":null,"ModificationTimestamp":"2011-03-15T10:01:06-05:00","PendingDate":null,"BathsTotal":2.0,"ListOfficeId":"20110315124051367346000000","ListAgentURL":null,"CancelDate":"2008-03-18","CoBuyerAgentId":null,"BathsFull":2,"PropertyType":"A","StreetAdditionalInfo":null,"StreetDirPrefix":null,"CoListAgentPager":null,"ListAgentDesignation":null,"BathsHalf":0,"CoListAgentEmail":null,"ListAgentCellPhone":null,"PrivateRemarks":null,"BedsTotal":3,"CoListAgentOfficePhone":null,"StreetNumber":"801","ListAgentLastName":"Member","CoListOfficeFax":null,"ListingKey":"20070621191958522498000000","WithdrawDate":null,"MLSAreaMajor":"2 - 25th St E to MAFB and S to 10th Ave S","BuildingAreaTotal":1147.0},"Id":"20070621191958522498000000","DisplayCompliance":{"View":"Summary"}}],"Success":true}};
 		$scope.property = fakeResponse.D.Results[0].StandardFields;
 	});

    $scope.getActiveTemplate = function() {
    	var activeTemplate = _.where($scope.templates, { 'active': true });
    	return activeTemplate[0];
    }
  });
