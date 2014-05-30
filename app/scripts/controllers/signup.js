'use strict';

angular.module('postOfficeProjectApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $fileUploader, $rootScope) {
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
      $location.path('/');
      $scope.$apply(); 
    });

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        // Auth.createUser({
        //   name: JSON.stringify({
        //     first: $scope.user.name.first,
        //     last: $scope.user.name.last
        //   }),
        //   company: JSON.stringify({
        //     name: $scope.user.company.name,
        //     address: $scope.user.company.address
        //   }),
        //   email: $scope.user.email,
        //   mlsNumber: $scope.user.mlsNumber,
        //   password: $scope.user.password
        // }, $scope.uploader.queue[$scope.uploader.queue.length - 1]);
        Auth.createUser({data: JSON.stringify($scope.user)}, $scope.uploader.queue[$scope.uploader.queue.length - 1]);
      }
    };
  });