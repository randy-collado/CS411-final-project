from flask import Blueprint, jsonify, request, redirect
from hashlib import scrypt
from os import urandom
import json
# import pyrebase
from .models import LOGIN_FORM_SCHEMA, REGISTER_FORM_SCHEMA
from marshmallow import ValidationError
from . import db, frontend_url

auth = Blueprint("auth", __name__)

SALT_LENGTH = 24


@auth.route('/api/login', methods=['POST'])
def login():
    request_data = json.loads(bytearray(request.data).decode())
    login_schema = LOGIN_FORM_SCHEMA()
    try:
        result = login_schema.load(request_data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    db_result = db['users'].find_one({'username': result['username']})    
    if (db_result is None):
        return {'ecode': 2, 'error': 'Username not found'}
    user = db_result['username']
    password_attempt = result['password']
    
    if not checkPassword(user, password_attempt):
        return {'ecode': 1, 'error':'Password not correct'}
    return {'ecode': 0, 'error':'ok'}
    
@auth.route('/api/register', methods=['POST'])
def register():
    # data is coming in as a sequence of bytes, must decode into a string then digest
    user = {}
    request_data = json.loads(bytearray(request.data).decode())
    register_schema = REGISTER_FORM_SCHEMA()
    try:
        result = register_schema.load(request_data)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400   
    # if (db['users'].find_one({'username': result['username']}) is not None):
    #     return {"username": result["username"], 'error': 'username already used'}
    user['username'] = result['username']
    user['password'], user['salt'] = hashPassword(result['password'])
    user['email'] = result['email']
    db["users"].insert_one(user)
    print('here')
    return {'ecode': 0}#{'error': 0, "username": result["username"]}

@auth.route('/api/checkIfUser', methods=['POST'])
def checkIfUser():
    request_data = request.form
    if (db['users'].find_one({'username': request_data['username']}) is not None):
        return {"username": request_data["username"], 'error': 'username already used'}

def hashPassword(pwd: str, salt=None):
    # iterations = 500_000
    if not salt:
        salt = urandom(SALT_LENGTH).hex()

    digest = scrypt(password=bytes(pwd, 'utf-8'), salt=salt.encode(), n=2, r=8, p=1)
    # print(salt.hex())

    return digest.hex(), salt

def checkPassword(user: str, pwd: str):
    user_db = db['users'].find_one({'username': user})
    hashed_attempt, _ = hashPassword(pwd, salt=user_db['salt'])#scrypt(password=bytes(pwd, 'utf-8'), salt=bytes.fromhex(salt), n=2, r=8, p=1).hex()
    user_password = user_db['password']
    return user_password == hashed_attempt

@auth.route('/test')
def test():
    return {"code": 0}

if __name__ == '__main__':
    checkPassword("")