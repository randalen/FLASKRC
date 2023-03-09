import dataclasses
from pickle import FALSE
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from RadicalClimate.DB.database import db
import datetime
from flask_login import login_user


#@dataclasses#--> for json serializer
class User(db.Model):
    #id: int
    #nombre: str 
    #key: str
    #algo_wallet: str
    #algo_key:str
    #bank:str
    #assignation:int
    #card: str
    #date_created: datetime
    #status: str
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    key = db.Column(db.String(30), nullable=True)
    algo_wallet = db.Column(db.String(70), unique=True, nullable=True)
    algo_key = db.Column(db.String(200), nullable=True) 
    bank = db.Column(db.String(80), nullable=False)
    assignation = db.Column(db.Integer, nullable=True)
    card = db.Column(db.String(80), nullable=False)
    date_created = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(20), nullable=False)


def __init__(self, nombre, key, algo_wallet, algo_key, bank, assignation, card, date_created, status):
    self.nombre = nombre
    self.key = key
    self.algo_wallet = algo_wallet
    self.algo_key = algo_key
    self.bank = bank
    self.assignation = assignation
    self.card = card
    self.date_created = date_created
    self.status = status


"""method to create a new record in the database"""
#@staticmethod
def create_user(r):
    print ("llegue al insert")
    print (r.get_json())
    try:
        body = r.get_json()
        db.session.add(User(nombre = body['nombre'],
        key = None,
        algo_wallet = body['algo_wallet'],
        algo_key = body['algo_key'],
        bank = body['bank'],
        assignation = body['assignation'],
        card = body['card'],
        date_created = datetime.date.today(),
        status = body['status']))
        db.session.commit()
        return True
    except Exception as err:
        print(err)
        return False

"""method to update a new record in the database"""
def update_user(id):
    try:
        body = request.get_json()
        db.session.query(User).filter_by(id=id).update(
            dict(nombre=body['nombre'],
            algo_wallet=body['algo_wallet'],
            bank=body['bank'],
            assignation=body['assignation'],
            card=body['card'],
            date_create=body['date_create'],
            status=body['status'])
        )
        db.session.commit()
        return True
    except Exception as err:
        print (err)
        return False



