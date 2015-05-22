'use strict';

angular.module('websiteApp')
  .controller('MainCtrl', function ($scope, $http, pass) {
    $scope.awesomeThings = [];

    $scope.array = [{id:1, value:"test"}, {id:2, value:"test1"}];
        
    $scope.$on('$viewContentLoaded', function() {      
        $scope.parseInit();
        $scope.getTripData();
    });

    $scope.clicked = function(a) {
      pass.myData = a;
      console.log('yo' + a.id);
    };

    $scope.parseInit = function() {
      var applicationId = "M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA";
      var javaScriptKey = "CfiSYmOt0TLu8k9xzJObKA6GosGwbIdv5IiyfI4F";
      Parse.initialize(applicationId, javaScriptKey);
    }

    // get list of all trips
    $scope.getTripData = function(){
      var query = new Parse.Query("Trips");
      query.find({
        success: function (trips) {
          //Trips
          $scope.allTrips = trips;
            console.log($scope.allTrips);
        },
        error: function (error) {
             console.log(error);
        }
      });
    }
  
//OnClick of Trip function
//    $scope.trans = function (objectId) {
//        var json = [];
//        console.log(objectId);
//        var query = new Parse.Query("Transaction");
//        query.containedIn("Trip", [objectId]);
//        query.find({
//          success: function (transactions) {
//              $scope.transactions = transactions;
//              for (var j = 0; j < transactions.length; j++) {
//                  json.push(transactions[j]);
//              }
//          }
//        });
//        console.log(json);
//        return json;
//    }
      
//Main end
});