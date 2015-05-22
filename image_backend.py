import pytesseract
from PIL import *
import cv2
import numpy as np
from matplotlib import pyplot as plt
from StringIO import StringIO
#from SimpleCV import *
from flask import Flask, request, jsonify
import requests
import json,httplib,urllib

r = 0

app = Flask(__name__)

appID = "M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA"
      
restKey = "D6KZxe2dRp1Wa8Drfpjer0iNOHNZATRkDaXXCR3Z"

def image_to_text(filename):
	#return pytesseract.image_to_string(Image.open('receipts/{0}'.format(filename)))

	#image.filter(ImageFilter.SHARPEN)

	#cv.open_cv_image = numpy.array(pil_image) 
	#cv.open_cv_image = open_cv_image[:, :, ::-1].copy()

	open_cv_image = cv2.imread('receipts/{0}'.format(filename))
	#print(open_cv_image)
	#cv2.bitwise_not(open_cv_image, open_cv_image)
	retval, thresh = cv2.threshold(open_cv_image, 100, 255, cv2.THRESH_BINARY)
	#adaptive = cv2.cvtColor(adaptive, cv2.COLOR_GRAY2RGB)
	cv2.imwrite("tmp.png", thresh)
	#pil_image = Image.fromarray(adaptive)
	#print(pil_image)
	pil_image = Image.open('tmp.png').convert('RGB')

	return pytesseract.image_to_string(pil_image)

# def imageText(filename):
# 	pil = Image('receipts/{0}'.format(filename)).readText()
# 	return

def text_parsing(extractedText):
	extracted = extractedText.split("\n")
	subdex = 0
	taxdex = 0
	print(extracted)
	for i in range(len(extracted)):
		if "ubtot" in extracted[i]:
			subdex = i
		if "Tax" in extracted[i]:
			taxdex = i
	return float(extracted[subdex].split()[-1]) + float(extracted[taxdex].split()[-1])

@app.route('/images/', methods=['POST'])
def image_route():
	global r
	payload = {"X-Parse-Application-Id": appID, "X-Parse-REST-API-Key": restKey}
	headers = {'where' : {'Processed':False}}
	#imageJSON = requests.get('http://api.parse.com/1/classes/Transaction/', params=payload, headers=headers)

	connection = httplib.HTTPSConnection('api.parse.com', 443)
	params = urllib.urlencode({"where":json.dumps({
       "Processed": False
     })})
	connection.connect()
	connection.request('GET', '/1/classes/Transaction?%s' % params, '', {
       "X-Parse-Application-Id": appID,
       "X-Parse-REST-API-Key": restKey
     })
	result = json.loads(connection.getresponse().read())
	#image = imageJSON.body['images'][listIndex]
	#open('receipts/s{0}.jpg'.format(str(r)), 'w').write(lr)
	if len(result['results'] > 0):
		open('receipts/{0}.jpg'.format('s' + str(r)),'w').write(urllib.urlopen(result['results'][0]['Receipt']['url']).read())
		price = text_parsing(image_to_text('s{0}.jpg'.format(str(r))))
		r += 1
		connection = httplib.HTTPSConnection('api.parse.com', 443)
		connection.connect()
		connection.request('PUT', '/1/classes/Transaction/' + result['results'][0]['objectId'], json.dumps({
			"Processed": True
			}), {
			"X-Parse-Application-Id": appID,
			"X-Parse-REST-API-Key": restKey,
			"Content-Type": "application/json"
		})
		#result = json.loads(connection.getresponse().read())
		return json.dumps({'price':price})
	else:
		return json.dumps({'error': 'All transactions processed'})


if __name__ == "__main__":
	app.run()

#"X-Parse-Application-Id: M5W9yL6PGhFQwd1bjtLg9Uaq8LiwrCNuDULXrLpA" -H "X-Parse-REST-API-Key: D6KZxe2dRp1Wa8Drfpjer0iNOHNZATRkDaXXCR3Z"




