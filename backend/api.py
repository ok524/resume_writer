from flask import Flask
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from database.db import initialize_db
from resources.routes import initialize_routes
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)
app.config.from_pyfile(os.path.join(".", "config/app.conf"), silent=False)

api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

initialize_db(app)
initialize_routes(api)

if __name__ == '__main__':
    app.run(host=app.config['WEB_API_SETTING']['host'], port=app.config['WEB_API_SETTING']['port'], debug=False)