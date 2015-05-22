'use strict';

angular.module('websiteApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/employee', {
        templateUrl: 'app/main/employee.html',
        controller: 'MainCtrl'
      })
    
    .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
    
  });