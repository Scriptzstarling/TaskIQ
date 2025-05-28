from . import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.DateTime)
    email = db.Column(db.String(120))
    whatsapp = db.Column(db.String(32))
    priority = db.Column(db.String(32))
