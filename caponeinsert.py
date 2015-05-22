import json,httplib,urllib
import requests

appID = "M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA"
      
restKey = "D6KZxe2dRp1Wa8Drfpjer0iNOHNZATRkDaXXCR3Z"

def get_our_customers():
	json1 = requests.get('http://api.reimaginebanking.com:8080/customers?key=2980acb03139603053904edc8a3c77bf').json()
	print(json1)
	for customer in json1:
		print(customer)
		customer.pop('address', None)
		customer['customer_id'] = customer['_id']
		customer.pop('_id', None)
		if len(customer['account_ids']) > 0:
			customer['account_ids'] = customer["account_ids"][0]

		connection = httplib.HTTPSConnection('api.parse.com', 443)
		connection.connect()
		connection.request('PUT', '/1/classes/User/', json.dumps(customer), {
			"X-Parse-Application-Id": appID,
			"X-Parse-REST-API-Key": restKey,
			"Content-Type": "application/json"
		})
		print(json.loads(connection.getresponse().read()))
