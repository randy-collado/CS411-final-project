
import time
from json import dumps, loads

from flask import *
from flask_pymongo import PyMongo
from hashlib import scrypt
from os import urandom
from marshmallow import Schema, fields, ValidationError
import requests
from datetime import datetime, timezone

#TODO: Finish implementing register and login functionality


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/db"
api_key = "a7e2e1bae88846eeb2c0d6a4bbe63e06"

mongo = PyMongo(app)

SALT_LENGTH = 24

class REGISTER_FORM_SCHEMA(Schema):
    email=fields.Str(required=True)
    username=fields.Str(required=True)
    password=fields.Str(required=True)


class LOGIN_FORM_SCHEMA(Schema):
    username=fields.Str(required=True)
    password=fields.Str(validate=lambda p: len(p) >= 8)


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
    request_data = request.form
    register_schema = REGISTER_FORM_SCHEMA()
    try:
        result = register_schema.load(request_data)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400   
    if (mongo.db['users'].find_one({'username': result['username']}) is not None):
        return {'error': 'username already used'}
    print(result['password'])
    result['password'], result['salt'] = hashPassword(result['password'])
    mongo.db["users"].insert_one(result)
    return redirect(url_for('front_page_data', user=result['username']))

@app.route('/home/<user>')
def front_page_data(user):
    return {"ok": user}


@app.route('/login', methods=['POST'])
def login():
    request_data = request.form
    login_schema = LOGIN_FORM_SCHEMA()
    try:
        result = login_schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    db_result = mongo.db['users'].find_one({'username': result['username']})    
    if (db_result is None):
        return {'error': 'Username not found'}
    user = result['username']
    salt = db_result['salt']
    password_attempt = result['password']
    
    if not checkPassword(user, password_attempt, salt):
        return {'error':'Password not correct'}
    return redirect(url_for('front_page_data', user=result['username']))
    
      


def hashPassword(password: str):
    iterations = 500_000
    salt = urandom(SALT_LENGTH)
    digest = scrypt(password.encode(), salt=salt, n=2, r=8, p=1)
    return digest.hex(), salt.hex()

def checkPassword(user: str, passwordAttempt: str, salt: str):
    user_db = mongo.db['users'].find_one({'username': user})
    hashed_attempt = scrypt(passwordAttempt.encode(), salt=bytes.fromhex(salt), n=2, r=8, p=1).hex()
    user_password = user_db['password']
    return user_password == hashed_attempt

