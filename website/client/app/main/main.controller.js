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
    

    
   $scope.getdata = function(){
    var trans = function (objectId) {
        var json = [];
        console.log(objectId);
        var query = new Parse.Query("Transaction");
        query.containedIn("Trip", [objectId]);
        query.find({
        success: function (transactions) {
            $scope.transactions = transactions;
            for (var j = 0; j < transactions.length; j++) {
                json.push(transactions[j]);
            }
        }
      });
        console.log(json);
        return json;
    }
       
	// jQuery stuff

    var applicationId = "M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA";
	var javaScriptKey = "CfiSYmOt0TLu8k9xzJObKA6GosGwbIdv5IiyfI4F";
	//masterKey = "0b7Lzn0GA64iGFeSoJQHwtpZwJa4hAkj23EIVDA5";

	Parse.initialize(applicationId, javaScriptKey);
    
    //Trips
	$scope.populateTrips = function(){
		var query = new Parse.Query("Trips");
        
		query.find({
			success: function (trips) {
            //Transactions
            var m = 0
           for (m; m < trips.length; m++){
               console.log(trips[m]);
                trips[m]['transactions'] = trans(trips[m].id);
           }
                //Trips
				$scope.trips = "Yoyo";
			},
			error: function (error) {
			   	console.log(error);
			}
		  });
	   }; 
   };
    
$scope.$on('$viewContentLoaded', function() {      
        $scope.getdata(); 
    });