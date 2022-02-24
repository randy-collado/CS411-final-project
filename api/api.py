import time
from flask import Flask
import requests
from datetime import datetime, timezone


app = Flask(__name__)
api_key = "a7e2e1bae88846eeb2c0d6a4bbe63e06"


@app.route('/joke')
def get_joke():
    r = requests.get('https://api.spoonacular.com/recipes/random', params = {"number" : "1", 'apiKey' : api_key})
    recipe_json = r.json()
    return recipe_json

@app.route('/time')
def get_current_time():
    return {'time': datetime.now(timezone.utc).strftime("%Y-%m-%d")}
