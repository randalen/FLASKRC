"""This will handle only routes relates to autentication"""
import json
from algosdk import mnemonic
from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import LoginManager, current_user, login_user
from .algod import create_account
from .forms import LoginForm
from .models import User
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
                               
login_manager = LoginManager()

auth_bp = Blueprint(
    'auth_bp', __name__,
    template_folder='templates',
    static_folder='static'
)
################REACT ENDPOINTS#####################

@auth_bp.route('/loginReact', methods=['GET','POST'])
def loginReact():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response


@auth_bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


################FLASK ENDPOINTS#####################

@login_manager.user_loader
def load_user(user_id):
    """User load logic"""
    return User(mnemonic.from_private_key(user_id))


@login_manager.unauthorized_handler
def unauthorized():
    """Redirect unauthorized users to login page"""
    return redirect(url_for('auth_bp.login'))


#################legacy#####################

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """Default login page"""
    if current_user.is_authenticated:
        return redirect(url_for('main_bp.index'))

    form = LoginForm()
    if form.validate_on_submit():
        try:
            user = User(passphrase=form.passphrase.data)
            login_user(user)
            return redirect(url_for('main_bp.index'))
        except Exception as err:
            flash(err)
            return render_template('login.html', form=form)
    return render_template('login.html', form=form)

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    """Generates a user account and shows its passphrase"""
    passphrase = create_account()
    user = User(passphrase=passphrase)
    login_user(user)
    return render_template('mnemonic.html', passphrase=passphrase)