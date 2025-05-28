from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from .models import Task
from . import db

class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        sqla_session = db.session
        load_instance = True
