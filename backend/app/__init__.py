from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    load_dotenv()
    from config import Config

    app = Flask(__name__)
    app.config.from_object(Config)

    # JWT secret key (make sure it's in your .env or config.py)
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')
    jwt = JWTManager(app)

    # Enable CORS for your React frontend (adjust origin for production!)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from .routes.tasks import tasks_bp
    from .routes.ai import ai_bp
    from .routes.notifications import notifications_bp
    from .auth.routes import auth_bp  # Auth blueprint

    app.register_blueprint(tasks_bp, url_prefix='/api/tasks')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(notifications_bp, url_prefix='/api/notifications')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app
