import pytesseract
from PIL import *
import cv2
import numpy as np
from matplotlib import pyplot as plt
from StringIO import StringIO
#from SimpleCV import *
from flask import Flask, request

app = Flask(__name__)

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
	for i in range(len(extracted)):
		if "ubtot" in extracted[i]:
			subdex = i
		if "Tax" in extracted[i]:
			taxdex = i
	return float(extracted[subdex].split()[-1]) + float(extracted[taxdex].split()[-1])

@app.route('/images', methods=['POST'])
def image_route():
	







