'use strict';

angular.module('websiteApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])

 .config(function ($routeProvider) {
    $routeProvider
      .when('/employee', {
        templateUrl: 'app/main/employee.html',
        controller: 'MainCtrl'
      })
    
    .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
    
    .otherwise({
        redirectTo: '/'
      });
  }).
factory('pass', function() {
    var myData = {};
    return myData;
});