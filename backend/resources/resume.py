from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from database.documents.resume import Resume as ResumeModel
from database.documents.user import User as UserModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
import json

class Resume(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        resume_id = request.args.get('id')
        if resume_id:
            resume = ResumeModel.objects.get(id=resume_id, created_by=user_id).to_json()
            return {'resume': resume}
        else:
            page = int(request.args.get('page'))
            per_page = int(request.args.get('per_page'))
            resumes = ResumeModel.objects(created_by=user_id).order_by('-created_at')
            total = len(resumes)
            resumes = resumes.paginate(page=page, per_page=per_page).items
            result = []
            for resume in resumes:
                result.append({
                    'id': str(resume.id),
                    'name': 'My Resume',
                    'job_position': 'Software Engineer',
                    'created_at': resume.created_at.strftime('%Y-%m-%d-%H:%M:%S'),
                    'updated_at': resume.updated_at.strftime('%Y-%m-%d-%H:%M:%S')
                })
            return json.dumps({
                'resumes': result,
                'page': page,
                'total': total
            })

    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        user = UserModel.objects.get(id=user_id)
        new_resume = ResumeModel(**request.get_json(force=True), created_by=user_id)
        new_resume.save()
        user.update(push__resumes=new_resume)
        user.save()
        return {'id': str(new_resume.id)}

    @jwt_required
    def put(self):
        resume_json = request.get_json(force=True)
        resume_id = request.args.get('id')
        for key in ['_id', 'created_at', 'created_by', 'updated_at']:
            if key in resume_json: del resume_json[key]
        #ResumeModel.update({"_id": resume_json['_id']}, {"$set": resume_json})
        ResumeModel.objects(id=resume_id).update(**resume_json, updated_at=datetime.now)
        return {'id': resume_id}

    @jwt_required
    def delete(self):
        user_id = get_jwt_identity()
        resume_id = request.args.get('id')
        resume = ResumeModel.objects(id=resume_id, created_by=user_id)
        resume.delete()
        return {'status': 'ok'}