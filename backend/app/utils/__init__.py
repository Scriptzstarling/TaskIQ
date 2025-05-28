from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    load_dotenv()
    from config import Config

    app = Flask(__name__)
    app.config.from_object(Config)

    # 🚨 Enable CORS for all routes and methods
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from .routes.tasks import tasks_bp
    from .routes.ai import ai_bp
    from .routes.notifications import notifications_bp

    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(notifications_bp, url_prefix='/api/notifications')

    return app
