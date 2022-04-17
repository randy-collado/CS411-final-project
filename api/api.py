import base64
from xml.dom import ValidationErr
from . import api_key, db
from flask import Blueprint, redirect, request
from .models import TOKEN_SCHEMA
import json
import base64
import requests
from datetime import datetime, timezone

#TODO: Finish implementing register and login functionality

api = Blueprint('api', __name__)
redirect_url = 'http://192.168.4.40:5000/api/nextAuth'

def genRandomString(length: int) -> str:
    import random
    import string
    letters = string.digits
    return ''.join(random.choice(letters) for i in range(length))

@api.route('/api/joke')
def get_joke():
    r = requests.get('https://api.spoonacular.com/recipes/random', params = {"number" : "1", 'apiKey' : api_key})
    recipe_json = r.json()
    return recipe_json

@api.route('/api/spotify', methods=['GET'])
def spotify():
    SPOT_API = 'b573c369cfc44cccb68a22a5e90808ab'
    ClIENT_ID = 'bb3385ed054c49a590cb82021959ae7d'
    response = redirect('https://accounts.spotify.com/authorize?client_id=bb3385ed054c49a590cb82021959ae7d&response_type=code&redirect_uri=' + redirect_url + '&scope=user-read-private#user-read-email&state=' + genRandomString(16))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"
    return response

@api.route('/api/nextAuth', methods=['GET'])
def next_step():
    args = request.args
    secret_bytes = base64.b64encode(b'bb3385ed054c49a590cb82021959ae7d:b573c369cfc44cccb68a22a5e90808ab')
    auth_string = 'Basic ' + secret_bytes.decode('ascii')
    response = requests.post('https://accounts.spotify.com/api/token', data={'grant_type': "authorization_code", 'code': args.get('code'), 'redirect_uri': redirect_url}, headers={'Content-Type': "application/x-www-form-urlencoded", 'Authorization': auth_string})
    print(response.json())
    return response.json()

@api.route('/api/storeToken', methods=['POST'])
def store_tokens():
    user_token = {}
    request_data = json.loads(bytearray(request.data).decode())
    user_token_db = db["spotify_tokens"]
    try:
        result = TOKEN_SCHEMA().load(request_data)
    except ValidationError as err:
        return {'ecode': 1, 'error': jsonify(err.messages)}
    user_token['username'] = result['username']
    user_token['access_token'] = result['access_token']
    user_token['token_type'] = result['token_type']
    user_token['expires_in'] = result['expires_in']
    user_token['scope'] = result['scope']
    user_token_db.insert_one(user_token)
    return {'ecode': 0, 'error': 'ok'}

@api.route('/api/time')
def get_current_time():
    return {'time': datetime.now(timezone.utc).strftime("%Y-%m-%d")}


@api.route('/api/home', methods=['GET'])
def front_page_data(user):
    return {"ok": user}


