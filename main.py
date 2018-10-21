from flask import Flask, render_template, url_for, flash, redirect
from flask_scss import Scss
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Scss(app)
Bootstrap(app)
app.config['BOOTSTRAP_SERVE_LOCAL'] = True


@app.route("/")
def testFunction():
    return "This is a test!"


if __name__ == '__main__':
    app.run()
