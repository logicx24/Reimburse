
/*$.ajax({
    url: 'http://api.reimaginebanking.com:80/enterprise/customers?key=ed2335d7245d077d89a222ad0a3717d3'
    success: function(results){
    	var customerAccount = customer.initWithKey(ed2335d7245d077d89a222ad0a3717d3);
        $('#employee').html('First name: ' + customerAccount.getAll()[0].firstname);
        console.log("TESTING");
    }
});*/

$(function(){
	require(['customer'], function (customer) {
		var apikey = 'ed2335d7245d077d89a222ad0a3717d3';
		customerDemo(apikey, customer);
	});
});

function customerDemo (apikey, customer) {
	var customerAccount = customer.initWithKey(apikey);
	$('#employee').html('First name: ' + customerAccount.getAll()[0].firstname);
	
}
