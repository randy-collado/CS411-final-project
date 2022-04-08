from flask import Flask
from flask_pymongo import PyMongo

db = None
api_key = None

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/db"
    api_key = "a7e2e1bae88846eeb2c0d6a4bbe63e06"

    mongo = PyMongo(app)
    db = mongo.db

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app