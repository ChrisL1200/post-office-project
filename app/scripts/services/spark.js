'use strict';

angular.module('postOfficeProjectApp')
  .factory('Spark', function ($resource) {
    return $resource('/api/spark/');
  });
