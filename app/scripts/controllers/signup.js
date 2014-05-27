'use strict';

angular.module('postOfficeProjectApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $fileUploader) {
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
      console.log(response.avatarId);
      $location.path('/');
    });

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $scope.uploader.queue[$scope.uploader.queue.length - 1].formData = [{
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        }];
        $scope.uploader.queue[$scope.uploader.queue.length - 1].upload();
        // .then( function() {
        //   // Account created, redirect to home
        //   $location.path('/');
        // })
        // .catch( function(err) {
        //   err = err.data;
        //   $scope.errors = {};

        //   // Update validity of form fields that match the mongoose errors
        //   angular.forEach(err.errors, function(error, field) {
        //     form[field].$setValidity('mongoose', false);
        //     $scope.errors[field] = error.message;
        //   });
        // });

      // if(form.$valid) {
      //   Auth.createUser({
      //     name: $scope.user.name,
      //     email: $scope.user.email,
      //     password: $scope.user.password
      //   })
      //   .then( function() {
      //     // Account created, redirect to home
      //     $location.path('/');
      //   })
      //   .catch( function(err) {
      //     err = err.data;
      //     $scope.errors = {};

      //     // Update validity of form fields that match the mongoose errors
      //     angular.forEach(err.errors, function(error, field) {
      //       form[field].$setValidity('mongoose', false);
      //       $scope.errors[field] = error.message;
      //     });
      //   });
      }
    };
  });