'use strict';

angular.module('websiteApp')
  .controller('MainCtrl', function ($scope, $http, pass) {
    $scope.awesomeThings = [];
    
    $scope.test = "fucking work";
    $scope.array = [{id:1, value:"test"}, {id:2, value:"test1"}];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    $scope.clicked = function(a) {
      pass.myData = a;
      console.log('yo' + a.id);
    };

  });
