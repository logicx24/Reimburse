
/*$.ajax({
    url: 'http://api.reimaginebanking.com:80/enterprise/customers?key=ed2335d7245d077d89a222ad0a3717d3'
    success: function(results){
    	var customerAccount = customer.initWithKey(ed2335d7245d077d89a222ad0a3717d3);
        $('#employee').html('First name: ' + customerAccount.getAll()[0].firstname);
        console.log("TESTING");
    }
});*/

// $(function(){
// 	require(['customer'], function (customer) {
// 		var apikey = 'ed2335d7245d077d89a222ad0a3717d3';
// 		customerDemo(apikey, customer);
// 	});
// });

// function customerDemo (apikey, customer) {
// 	var customerAccount = customer.initWithKey(apikey);
// 	console.log(customerAccount.getAll[0]);
// 	$('#employee').html('First name: ' + customerAccount.getAll()[0].firstname);
	
// }

$.getScript("https://parse.com/downloads/javascript/parse-1.4.2.js", function(){

	Parse.$ = jQuery;
	console.log("Script loaded and executed.");

	// Use anything defined in the loaded script...

	applicationId = "M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA";
	javaScriptKey = "CfiSYmOt0TLu8k9xzJObKA6GosGwbIdv5IiyfI4F";
	//masterKey = "0b7Lzn0GA64iGFeSoJQHwtpZwJa4hAkj23EIVDA5";

	Parse.initialize(applicationId, javaScriptKey);

	$(function populateCustomers (apikey) {
		txt = '<div class="col-xs-3 employeeBorder"><h3>Name</h3><h3>ID: ######</h3><h1><a href="#">Balance </a></h1></div>'
		finale = ""
		var query = new Parse.Query(Parse.User);
		query.find({
			success: function (results) {
				for (var i = 0; i < results.length; i++) {
					finale += '<div class="col-xs-3 employeeBorder"><h3>Name</h3><h3>' + 'ID:' + results[i]['id'] + '</h3><h1><a href="/">Balance </a></h1></div>'
				}
				$("#employeeContainer").html(finale);
			},
			error: function (error) {
				console.log(error);
			}
		});

	});

});
