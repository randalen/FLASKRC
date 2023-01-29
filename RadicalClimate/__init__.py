from datetime import timedelta
from flask import Flask
from . import auth
from . import views
import os 
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from RadicalClimate.DB.database import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "fjpwfwfhnwflwefnwelkfnewfewnklfwl"
    auth.login_manager.init_app(app)
    app.register_blueprint(views.main_bp)
    app.register_blueprint(auth.auth_bp)
    #app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432'
   #  db.init_app(app)
   #  from RadicalClimate.DB.User import User
   #  with app.app_context():
   #     db.create_all()
   #     print ("tablis")
   #     print(db)
    #JTW manager 
    app.config["JWT_SECRET_KEY"] = "fjpwfwfhnwflwefnwelkfnewfewnklfwl"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    jwt = JWTManager(app)
    CORS(app, supports_credentials=True)
    return app