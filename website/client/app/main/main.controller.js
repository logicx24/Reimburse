'use strict';

angular.module('websiteApp')
  .controller('MainCtrl', function ($scope, $http, pass) {
    $scope.awesomeThings = [];

    $scope.array = [{id:1, value:"test"}, {id:2, value:"test1"}];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    $scope.clicked = function(a) {
      pass.myData = a;
      console.log('yo' + a.id);
    };
    
    
    $.getScript("https://parse.com/downloads/javascript/parse-1.4.2.js", function(){

	Parse.$ = jQuery;
	console.log("Script loaded and executed.");

	// Use anything defined in the loaded script...

	var applicationId = "M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA";
	var javaScriptKey = "CfiSYmOt0TLu8k9xzJObKA6GosGwbIdv5IiyfI4F";
	//masterKey = "0b7Lzn0GA64iGFeSoJQHwtpZwJa4hAkj23EIVDA5";

	Parse.initialize(applicationId, javaScriptKey);
    
    //Trips
	$(function populateTrips (apikey) {
		var query = new Parse.Query("Trips");
        
        query.containedIn("Customer", [customerID]);
        
		query.find({
			success: function (results) {
				$scope.trips = results;
                console.log($scope.trips);
			},
			error: function (error) {
				console.log(error);
			}
		  });
	   });
    
    //Transactions
    $(function populateTransactions (apikey) {
		var query = new Parse.Query("Transaction");
		query.find({
			success: function (results) {
				$scope.transactions = results;
                console.log($scope.transactions);
			},
			error: function (error) {
				console.log(error);
			}
		  });
	   });
    });
});