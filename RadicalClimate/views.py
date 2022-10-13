from crypt import methods
from ctypes import addressof
from dataclasses import dataclass
from functools import total_ordering
from flask import Blueprint, render_template
from .algod import get_balance 
from .algod import send_transaction
from .forms import SendForm
from .forms import AssetForm
from flask_login import login_required, current_user
from flask import redirect, url_for
from flask_login import logout_user

main_bp = Blueprint(
    'main_bp', __name__,
    template_folder='templates',
    static_folder='static'
)

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

@main_bp.route('/assets')
def assets():
    return render_template('assets.html')

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