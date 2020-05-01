from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from database.documents.resume import Resume as ResumeModel
from database.documents.user import User as UserModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import json
from copy import deepcopy

class ResumeClone(Resource):
    def get(self):
        resume_id = request.args.get('id')
        resume = ResumeModel.objects.get(id=resume_id)
        new_resume = deepcopy(resume)
        new_resume.id = None
        new_resume.created_at = None
        new_resume.updated_at = None
        new_resume.save()
        return {'id': str(new_resume.id)}