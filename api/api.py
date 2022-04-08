
import base64
from . import api_key
from flask import Blueprint, redirect, request
import base64
import requests
from datetime import datetime, timezone

#TODO: Finish implementing register and login functionality

api = Blueprint('api', __name__)

@api.route('/api/joke')
def get_joke():
    r = requests.get('https://api.spoonacular.com/recipes/random', params = {"number" : "1", 'apiKey' : api_key})
    recipe_json = r.json()
    return recipe_json

@api.route('/api/spotify')
def spotify():
    SPOT_API = 'b573c369cfc44cccb68a22a5e90808ab'
    ClIENT_ID = 'bb3385ed054c49a590cb82021959ae7d'
    return redirect('https://accounts.spotify.com/authorize?client_id=bb3385ed054c49a590cb82021959ae7d&response_type=code&redirect_uri=http://192.168.4.40:5000/api/nextAuth&scope=user-read-private#user-read-email&state=LAKShbwwoUAGbewy', code=302)

@api.route('/api/nextAuth', methods=['GET'])
def next_step():
    args = request.args
    secret_bytes = base64.b64encode(b'bb3385ed054c49a590cb82021959ae7d:b573c369cfc44cccb68a22a5e90808ab')
    auth_string = 'Basic ' + secret_bytes.decode('ascii')
    response = requests.post('https://accounts.spotify.com/api/token', data={'grant_type': "authorization_code", 'code': args.get('code'), 'redirect_uri': "http://192.168.4.40:5000/api/nextAuth"}, headers={'Content-Type': "application/x-www-form-urlencoded", 'Authorization': auth_string})
    print(response.json())
    return response.json()

@api.route('/api/time')
def get_current_time():
    return {'time': datetime.now(timezone.utc).strftime("%Y-%m-%d")}


@api.route('/api/home', methods=['GET'])
def front_page_data(user):
    return {"ok": user}


