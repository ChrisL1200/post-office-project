'use strict';

angular.module('postOfficeProjectApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $fileUploader, $rootScope, Config, $window) {
    $scope.user = {};
    $scope.errors = {};

    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: "api/users",
      formData: [
        { data: 'value' }
      ]
    });

    uploader.bind('success', function(event, xhr, item, response) {
      $rootScope.currentUser = response;
      // $location.path('/');
      // $scope.$apply(); 
      
        //Redirect user to login through spark
        $window.location.href = Config.spark.loginURL;
    });

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({data: JSON.stringify($scope.user)}, $scope.uploader.queue[$scope.uploader.queue.length - 1]);
      }
    };
  });