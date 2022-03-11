import time
from flask import *
from flask_pymongo import PyMongo
from webargs import flaskparser, fields, validate
import requests
from datetime import datetime, timezone

#TODO: Finish implementing register and login functionality

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/db"
api_key = "a7e2e1bae88846eeb2c0d6a4bbe63e06"

mongo = PyMongo(app)

REGISTER_FORM_ARGS = {
    'Email': fields.Email(required=True),
    'username': fields.Str(required=True),
    'password': fields.Str(required=True),
}

LOGIN_FORM_ARGS = {
    'username': fields.Email(required=True),
    'password': fields.Str(validate=lambda p: len(p) >= 8),
}

@app.route('/joke')
def get_joke():
    r = requests.get('https://api.spoonacular.com/recipes/random', params = {"number" : "1", 'apiKey' : api_key})
    recipe_json = r.json()
    return recipe_json

@app.route('/time')
def get_current_time():
    return {'time': datetime.now(timezone.utc).strftime("%Y-%m-%d")}


@app.route('/register', methods=['POST'])
def register():
    args = parser.parse(REGISTER_FORM_ARGS, request)
    mongo.db["users"].insert_one(args)
    return 0


@app.route('/login', methods=['POST'])
def login():
    pass