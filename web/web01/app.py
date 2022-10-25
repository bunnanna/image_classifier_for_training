import numpy as np
import tensorflow as tf 
from flask import Flask, render_template, request

import PIL
from PIL import Image
model=tf.keras.models.load_model(r"C:/Users/nuttanont_naranong/Desktop/vs/data/model/modeldogcat.model")
model.make_predict_function()
def predict(path):
    img = tf.keras.utils.load_img(path, target_size=(150, 150))
    class_names = ["Cat","Dog"]
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    # print(
    # "This image used to be {} \nbut most likely belongs to {} \nwith a {:.2f} percent confidence."
    # .format(img_paths[ind].split("\\")[-2],class_names[np.argmax(score)], 100 * np.max(score))
    # )
    return class_names[np.argmax(score)],100 * np.max(score)

app=Flask(__name__)

@app.route("/", methods = ["GET","POST"])
def index():
    return render_template("index.html")

@app.route("/submit", methods = ["GET","POST"])
def predic():
    if request.method == "POST":
        img = request.files["myimage"]
        img_path = "./web/web01/static/" + img.filename
        img_pathe = "../static/" + img.filename
        img.save(img_path)
        p,s = predict(img_path)
    return render_template("index.html",prediction = p, score = s,img_pathe=img_pathe)

if __name__=="__main__":
    app.run(debug=True)