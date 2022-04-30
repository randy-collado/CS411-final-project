from os import access
from urllib import request
from marshmallow import Schema, fields

class REGISTER_FORM_SCHEMA(Schema):
    email=fields.Str(required=True)
    username=fields.Str(required=True)
    password=fields.Str(required=True)


class LOGIN_FORM_SCHEMA(Schema):
    username=fields.Str(required=True)
    password=fields.Str(validate=lambda p: len(p) >= 8)

class TOKEN_SCHEMA(Schema):
    access_token = fields.Str(required=True)
    token_type = fields.Str(required=True)
    expires_in = fields.Str(required=True)
    refresh_token = fields.Str(required=True)
    scope = fields.Str(required=True)
    
class DIARY_SCHEMA(Schema):
    username = fields.Str(required=True)
    src = fields.Raw(required=True)
    diary_id = fields.Int(required=True)
    text = fields.Str(required=True)
    location = fields.Str(required=True)
    song = fields.Str(required=True)