'use strict';

angular.module('websiteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
    
    .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
    
  });