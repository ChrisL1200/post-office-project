'use strict';

angular.module('postOfficeProjectApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
