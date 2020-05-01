from ..db import db
from datetime import datetime
#from .user import User


class Header(db.EmbeddedDocument):
    name = db.StringField()
    email = db.StringField()
    phone = db.StringField()
    github = db.StringField()
    linkedin = db.StringField()
    address = db.StringField()
    website = db.StringField()


class Objectives(db.EmbeddedDocument):
    objective = db.StringField()


class Education(db.EmbeddedDocument):
    institutionName = db.StringField()
    educationLevel = db.StringField()
    speciality = db.StringField()
    startDate = db.DateField()
    endDate = db.DateField()
    isVisible = db.BooleanField()
    isPresent = db.BooleanField()


class Experience(db.EmbeddedDocument):
    company = db.StringField()
    position = db.StringField()
    startDate = db.DateField()
    endDate = db.DateField()
    achievements = db.ListField(db.StringField())
    isVisible = db.BooleanField()
    isPresent = db.BooleanField()


class Keyword(db.EmbeddedDocument):
    name = db.StringField()
    level = db.IntField()
    isVisible = db.BooleanField()


class TechnicalSkills(db.EmbeddedDocument):
    category = db.StringField()
    keywords = db.ListField(db.EmbeddedDocumentField(Keyword))
    isVisible = db.BooleanField()


class JobAds(db.EmbeddedDocument):
    link = db.StringField()

class Resume(db.Document):
    jobAds = db.EmbeddedDocumentField(JobAds)
    header = db.EmbeddedDocumentField(Header)
    objectives = db.EmbeddedDocumentField(Objectives)
    education = db.ListField(db.EmbeddedDocumentField(Education))
    experience = db.ListField(db.EmbeddedDocumentField(Experience))
    technicalSkills = db.ListField(db.EmbeddedDocumentField(TechnicalSkills))
    created_by = db.ReferenceField('User', required=True)
    created_at = db.DateTimeField(required=True, default=datetime.now)
    updated_at = db.DateTimeField(required=True, default=datetime.now)