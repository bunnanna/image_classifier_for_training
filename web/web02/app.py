from flask import Flask, render_template
import numpy
app=Flask(__name__)

@app.route("/")
def index():
    return "asdf"

if __name__=="__main__":
    app.run(debug=True)