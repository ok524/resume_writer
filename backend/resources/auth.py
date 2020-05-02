from flask import request, current_app
from flask_restful import Resource
from database.documents.user import User as UserModel, Resume as ResumeModel
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from mongoengine.errors import NotUniqueError, DoesNotExist, ValidationError
from copy import deepcopy

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
            user_info = request.get_json(force=True)
            if current_app.config['WEB_API_SETTING']['demo']:
                user = deepcopy(UserModel.objects.get(email=current_app.config['WEB_API_SETTING']['demo_user']))
                demo_user_id = user.id
                user.id = None
                user.email = user_info['email']
                user.password = user_info['password']
                user.resume = None
            else:
                user = UserModel(**user_info)
            user.hash_password()
            user.save()
            if current_app.config['WEB_API_SETTING']['demo']:
                demo_resume = deepcopy(ResumeModel.objects(created_by=demo_user_id).order_by('-created_at')[0])
                print(demo_resume.to_json())
                demo_resume.id = None
                demo_resume.created_by = user.id
                demo_resume.created_at = None
                demo_resume.updated_at = None
                demo_resume.save()

            expires = datetime.timedelta(days=7)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token}
        except NotUniqueError:
            return {'error': 'Email is already in use'}
        except ValidationError as error:
            print(str(error))
            return {'error': 'Invalid email address: ' + user_info['email']}
        except ValueError as error:
            return {'error': str(error)}


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