'use strict';
 
angular.module('websiteApp')
  .controller('MainCtrl', function ($scope, $http, pass) {
    $scope.awesomeThings = [];
 
    $scope.allTrips = 'hiiii';
 
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
          $scope.$apply();
        },
        error: function (error) {
          console.log(error);
        }
      });
    }
 
     // OnClick of Trip function
     $scope.getTransaction = function (tripId) {
         var query = new Parse.Query("Transaction");
         query.containedIn("Trip", [tripId]);
         query.find({
           success: function (transactions) {
               $scope.transactions = transactions;
               console.log($scope.transactions);
               $scope.$apply();
           },
           error: function (error){
             console.log(error);
           }
         });
     }
 
     $scope.setCurrentReceipt = function (trans) {
      console.log(trans);
        $scope.receipt = trans.attributes.Receipt;
        $scope.receiptInfo = trans.attributes;
        console.log($scope.receipt);
        // $scope.$apply();
     }
 
//Main end
});