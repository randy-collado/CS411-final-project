from flask import Blueprint, jsonify, request
from hashlib import scrypt
from os import urandom
from .models import LOGIN_FORM_SCHEMA, REGISTER_FORM_SCHEMA
from marshmallow import ValidationError
from . import db

auth = Blueprint("auth", __name__)

SALT_LENGTH = 24

@auth.route('/api/login', methods=['POST'])
def login():
    request_data = request.form
    login_schema = LOGIN_FORM_SCHEMA()
    try:
        result = login_schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    db_result = db['users'].find_one({'username': result['username']})    
    if (db_result is None):
        return {'error': 'Username not found'}
    user = result['username']
    salt = db_result['salt']
    password_attempt = result['password']
    
    if not checkPassword(user, password_attempt, salt):
        return {'error':'Password not correct'}
    return redirect(url_for('front_page_data', user=result['username']))
    
@auth.route('/api/register', methods=['POST'])
def register():
    request_data = request.form
    register_schema = REGISTER_FORM_SCHEMA()
    try:
        result = register_schema.load(request_data)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400   
    # if (db['users'].find_one({'username': result['username']}) is not None):
    #     return {"username": result["username"], 'error': 'username already used'}
    print(result['password'])
    result['password'], result['salt'] = hashPassword(result['password'])
    db["users"].insert_one(result)
    return {"username": result["username"], 'error': 'ok'}

@auth.route('/api/checkIfUser', methods=['POST'])
def checkIfUser():
    request_data = request.form
    if (db['users'].find_one({'username': request_data['username']}) is not None):
        return {"username": request_data["username"], 'error': 'username already used'}

def hashPassword(password: str):
    iterations = 500_000
    salt = urandom(SALT_LENGTH)
    digest = scrypt(password.encode(), salt=salt, n=2, r=8, p=1)
    return digest.hex(), salt.hex()

def checkPassword(user: str, passwordAttempt: str, salt: str):
    user_db = db['users'].find_one({'username': user})
    hashed_attempt = scrypt(passwordAttempt.encode(), salt=bytes.fromhex(salt), n=2, r=8, p=1).hex()
    user_password = user_db['password']
    return user_password == hashed_attempt

