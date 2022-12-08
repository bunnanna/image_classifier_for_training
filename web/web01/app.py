import os
import numpy as np
import tensorflow as tf 
from flask import Flask, render_template, request, redirect
from random import random
from glob import glob

import PIL
from PIL import Image
# model=tf.keras.models.load_model(r"C:/Users/nuttanont_naranong/Desktop/vs/data/model/modeldogcat.model")
#model.make_predict_function()
def predict(model_name,path):
    model_path = r"C:/Users/nuttanont_naranong/Desktop/vs/data/model/" + model_name
    model = tf.keras.models.load_model(model_path)
    if model_name == "chihuahua-muffin-classifier.model":
        class_names=['chihuahua', 'muffin']
        img = tf.keras.utils.load_img(path, target_size=(180, 180))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch
        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        return class_names[np.argmax(score)],str(np.round(100 * np.max(score),2))+"%"
    
    elif model_name == "modeldogcat.model":
        class_names = ["Cat","Dog"]
        img = tf.keras.utils.load_img(path, target_size=(150, 150))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch
        predictions = model.predict(img_array)
        score = max(predictions)
        return class_names[np.argmax(score)],str(np.round(100 * np.max(score),2))+"%"
    
    else:
        return "model not found",0

app=Flask(__name__)

@app.route("/", methods = ["GET","POST"])
def index():
    return render_template("index.html")

@app.route("/submit", methods = ["GET","POST"])
def predic():
    if request.method == "POST":
        img = request.files["myimage"]
        model_name=request.form.get("model")
        path="{}.".format(random()) + img.filename.split(".")[1]
        img_path = "./web/web01/static/"+path
        img_pathe = "../static/"+path
        img.save(img_path)
        p,s = predict(model_name,img_path)
        return render_template("index.html",prediction = p, score = s,img_pathe=img_pathe)

if __name__=="__main__":
    for file in glob("./web/web01/static/*"):
        os.remove(file)
    app.run(debug=True)