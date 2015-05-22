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
    var trans = function (objectId) {
        var json = [];
        console.log(objectId);
        var query = new Parse.Query("Transaction");
        query.containedIn("Trip", [objectId]);
        query.find({
        success: function (transactions) {
            $scope.transactions = transactions;
//                    console.log($scope.transactions);
            for (var j = 0; j < transactions.length; j++) {
                json.push(transactions[j]);
            }
//                    console.log(json);
//                    console.log(trips);
//                    console.log(m);
//                    console.log(trips[m]);
        }
      });
        console.log(json);
        return json;
    }

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
        
   //     query.containedIn("Customer", [customerID]);
        
		query.find({
			success: function (trips) {
            //Transactions
//            console.log('test', trips);
            var m = 0
           for (m; m < trips.length; m++){
               //console.log(trips[m]);
                trips[m]['transactions'] = trans(trips[m].id);
               //console.log(trips[m].transactions)
           }
                //Trips
				$scope.trips = "Yoyo";
//                console.log($scope.trips);
			},
			error: function (error) {
			   	console.log(error);
			}
		  });
	   });
    

    });
});