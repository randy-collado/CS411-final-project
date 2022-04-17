from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

db = None
api_key = None
frontend_url = 'http://localhost:3000'

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/db"
    api_key = "a7e2e1bae88846eeb2c0d6a4bbe63e06"

    mongo = PyMongo(app)
    global db 
    db = mongo.db

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    CORS(app)
    return app