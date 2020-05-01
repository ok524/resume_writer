from .resume import Resume
from .resume_clone import ResumeClone
from .auth import Register, Login, User
from .job_ads_analyzer import JobAdsAnalyzer
from resources.auto_complete import AutoComplete

def initialize_routes(api):
    api.add_resource(Resume, '/resume')
    api.add_resource(ResumeClone, '/resumeClone')
    api.add_resource(Register, '/register')
    api.add_resource(Login, '/login')
    api.add_resource(User, '/user')
    api.add_resource(JobAdsAnalyzer, '/jobAdsAnalyzer')
    api.add_resource(AutoComplete, '/autoComplete')