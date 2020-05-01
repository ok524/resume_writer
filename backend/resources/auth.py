from flask import request
from flask_restful import Resource
from database.documents.user import User as UserModel
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from mongoengine.errors import NotUniqueError, DoesNotExist


class User(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.objects.get(id=user_id).to_json()
        return {'user': user}

    @jwt_required
    def put(self):
        user_id = get_jwt_identity()
        UserModel.objects(id=user_id).update(**request.get_json(force=True))
        return {'status': 'ok'}

class Register(Resource):
    def post(self):
        try:
            user = UserModel(**request.get_json(force=True))
            user.hash_password()
            user.save()
            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token}
        except NotUniqueError:
            return {'error': 'Email is already in use'}


class Login(Resource):
    def post(self):
        try:
            body = request.get_json(force=True)
            user = UserModel.objects.get(email=body.get('email'))
            authorized = user.check_password(body.get('password'))
            if not authorized:
                return {'error': 'Email or password invalid'}, 401

            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token}
        except DoesNotExist:
            return {'error': 'Email or password invalid'}, 401