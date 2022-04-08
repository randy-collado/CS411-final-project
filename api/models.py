from marshmallow import Schema, fields

class REGISTER_FORM_SCHEMA(Schema):
    email=fields.Str(required=True)
    username=fields.Str(required=True)
    password=fields.Str(required=True)


class LOGIN_FORM_SCHEMA(Schema):
    username=fields.Str(required=True)
    password=fields.Str(validate=lambda p: len(p) >= 8)

