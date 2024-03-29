from email.policy import default
from algosdk.constants import address_len, note_max_length
from flask_wtf import FlaskForm
from wtforms import DecimalField, StringField, SubmitField
from wtforms.validators import InputRequired, Optional, Length, NumberRange
from algosdk.constants import max_asset_decimals
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, BooleanField
from wtforms.validators import InputRequired, Optional, NumberRange


class SendForm(FlaskForm):
    """Form for creating a transaction"""
    quantity = DecimalField(
        'Quantity',
        validators=[InputRequired(), NumberRange(min=0)],
        render_kw={"placeholder": "Quantity to Send"}
    )
    receiver = StringField(
        'Receiver',
        validators=[InputRequired(), Length(min=address_len,
        max=address_len)],
        render_kw={"placeholder": "Receiver Address"}
    )
    note = StringField(
        'Note',
        validators=[Optional(), Length(max=note_max_length)],
        render_kw={"placeholder": "Note"})

    submit = SubmitField('Send')


class AssetForm (FlaskForm):
    """Form for creating an asset"""
    asset_name = StringField(
        'Asset name',
        validators=[InputRequired()]
    )
    unit_name = StringField(
        'Unit name',
        validators=[InputRequired()]
    )
    total = IntegerField(
        'Total Number',
        validators=[InputRequired(), NumberRange(min=0, max=max_asset_decimals)]
    )
    decimals = IntegerField(
        'Number of decimals',
        validators=[InputRequired(), NumberRange(min=0, max=max_asset_decimals)]
    )
    default_frozen = BooleanField(
        'Frozen',
        validators=[Optional()]
    )
    url = StringField(
        'URL',
        validators=[Optional()]
    )
    submit = SubmitField('Create')


class LoginForm(FlaskForm):
    """Form for logging into an account"""
    passphrase = StringField('25-word Passphrase', validators=[InputRequired()])
    submit = SubmitField('Login')

class FilterForm(FlaskForm):
    """Form for filtering transactions and assets"""
    substring = StringField(
        'Filter',
        validators=[Optional()],
        render_kw={"placeholder": "Filter list"}
    )
    submit = SubmitField('Search')


class JoinForm (FlaskForm):
    """Form for join a user"""
    name = StringField(
        'Name',
        validators=[InputRequired()]
    )
    bank = StringField(
        'Bank',
        validators=[InputRequired()]
    )
    card = IntegerField(
        'Card Last4 digits',
        validators=[InputRequired()]
    )
    assignation = IntegerField(
        'Assignation %',
        validators=[InputRequired()]
    )
    submit = SubmitField('Request')
