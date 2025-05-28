from flask import Blueprint, request, jsonify, render_template
from app.models import Task
from app.schemas import TaskSchema
from app import db
from app.utils.sendgrid_client import send_email

tasks_bp = Blueprint('tasks', __name__)
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

@tasks_bp.route('/', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify(tasks_schema.dump(tasks)), 200

@tasks_bp.route('/', methods=['POST'])
def add_task():
    data = request.get_json()
    errors = task_schema.validate(data, session=db.session)
    if errors:
        return jsonify(errors), 400
    task = task_schema.load(data, session=db.session)
    db.session.add(task)
    db.session.commit()

    # Render HTML email from template
    if task.email:
        reminder_msg = render_template(
            "task_reminder.html",
            title=task.title,
            description=task.description,
            due_date=task.due_date.strftime('%Y-%m-%d %H:%M') if task.due_date else 'N/A'
        )
        send_email(
            task.email,
            "Task Reminder",
            reminder_msg
        )

    return jsonify(task_schema.dump(task)), 201

@tasks_bp.route('/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()
    errors = task_schema.validate(data, session=db.session)
    if errors:
        return jsonify(errors), 400
    for key, value in data.items():
        setattr(task, key, value)
    db.session.commit()

    # Render HTML email from template
    if task.email:
        reminder_msg = render_template(
            "task_reminder.html",
            title=task.title,
            description=task.description,
            due_date=task.due_date.strftime('%Y-%m-%d %H:%M') if task.due_date else 'N/A'
        )
        send_email(
            task.email,
            "Task Reminder",
            reminder_msg
        )

    return jsonify(task_schema.dump(task)), 200

@tasks_bp.route('/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    # You can use a simple plain text or a separate HTML template for delete
    reminder_msg = f"Hey, remember: your task '{task.title}' was just deleted."
    if task.email:
        send_email(
            task.email,
            "Task Reminder",
            reminder_msg
        )
    db.session.delete(task)
    db.session.commit()
    return '', 204
