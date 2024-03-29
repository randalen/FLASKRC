from crypt import methods
from ctypes import addressof
from dataclasses import dataclass
from functools import total_ordering
import json
from flask import Blueprint, render_template
from .algod import get_balance 
from .algod import send_transaction
from .forms import SendForm, FilterForm, AssetForm, JoinForm
from flask_login import login_required, current_user, login_user
from flask import redirect, url_for
from flask_login import logout_user
from flask import jsonify
from RadicalClimate.algod import create_account
from RadicalClimate.models import User
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

main_bp = Blueprint(
    'main_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

################REACT ENDPOINTS#####################
@main_bp.route('/home')
@jwt_required()
def home():
    """Main page, displays balance"""
    home_response = {"balance": "10001011"}
    return home_response


################FLASK ENDPOINTS#####################
@main_bp.route('/')
@login_required
def index():
    """Main page, displays balance"""
    balance = current_user.get_balance()
    return render_template('index.html', balance=balance)


@main_bp.route('/send', methods=['GET', 'POST'])
@login_required
def send():
    """Provides a form to create and send a transaction"""
    form = SendForm()
    address = current_user.public_key
    if form.validate_on_submit():
        success = current_user.send(form.quantity.data, form.receiver.data, form.note.data)
        return render_template('success.html', success=success)

    # show the form, it wasn't submitted
    return render_template('send.html', form=form, address=address)

@main_bp.route('/assets', methods=['GET', 'POST'])
@login_required
def assets():
    """Displays all assets owned by the user"""
    form = FilterForm()

    if form.validate_on_submit():
        assets_list = current_user.get_assets(form.substring.data)
    else:
        assets_list = current_user.get_assets("")

    return render_template('assets.html', assets=assets_list, form=form)

@main_bp.route('/create', methods=['GET', 'POST'])
def create():
    """Form to create a asset"""
    form = AssetForm()
    if form.validate_on_submit():
        asset_id = current_user.create(
            form.asset_name.data,
            form.unit_name.data,
            form.total.data,
            form.decimals.data,
            form.default_frozen.data,
            form.url.data
        )
        return redirect(url_for('main_bp.assets'))
    
    return render_template('create_asset.html', form=form)


@main_bp.route('/logout')
@login_required
def logout():
    """User log-out logic."""
    logout_user()
    return redirect(url_for('auth_bp.login'))


@main_bp.route('/mnemonic')
@login_required
def mnemonic():
    """Displays the recovery passphrase"""
    passphrase = current_user.passphrase
    return render_template('mnemonic.html', passphrase=passphrase)


@main_bp.route('/transactions', methods=['GET', 'POST'])
@login_required
def transactions():
    """Displays all transactions from the user"""
    form = FilterForm()

    if form.validate_on_submit():
        txns = current_user.get_transactions(form.substring.data)
    else:
        txns = current_user.get_transactions("")

    return render_template('transactions.html', txns=txns, form=form)


@main_bp.route('/join', methods=['GET', 'POST'])
def join():
    form = JoinForm()
    if form.validate_on_submit():
        """Generates a user account and shows its passphrase"""
        try:
            passphrase, address = create_account()
            print (passphrase)
            print (address)
            user = User(passphrase=passphrase)
            login_user(user)
        except Exception as er:
            print(er)
        r = jsonify({"nombre": form.name.data, 
        "algo_wallet": address, 
        "algo_key": passphrase,
        "bank": form.bank.data, 
        "assignation": form.assignation.data, 
        "card": form.card.data, "date_created": '', "status": 'created'})
        print (r)

        user_id = current_user.create_user(r)
        
        return redirect(url_for('main_bp.index'))
    
    return render_template('join.html', form=form)