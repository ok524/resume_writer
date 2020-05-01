from ..db import db
from flask_bcrypt import generate_password_hash, check_password_hash
from .resume import Resume

class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    resumes = db.ListField(db.ReferenceField(Resume, reverse_delete_rule=db.PULL))
    name = db.StringField()
    phone = db.StringField()
    github = db.StringField()
    linkedin = db.StringField()
    address = db.StringField()
    website = db.StringField()

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


User.register_delete_rule(Resume, 'created_by', db.CASCADE)