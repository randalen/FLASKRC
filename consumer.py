#amqps://fegittzo:JmvEImN13GZWTFLasVnB64_ItmFBye3W@turkey.rmq.cloudamqp.com/fegittzo
import json
import pika
#from RadicalClimate.DB.database import db
#from RadicalClimate.DB import User

params = pika.URLParameters('amqps://fegittzo:JmvEImN13GZWTFLasVnB64_ItmFBye3W@turkey.rmq.cloudamqp.com/fegittzo')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='main')

def callback(ch, method, properties, body):
    print('received in main')
    data = json.loads(body)
    print (properties.content_type)
    print(data)
    return True

    if properties.content_type == 'product_created':
        print (properties.content_type)
        product = User(id=data['id'], title=data['status'], image=data['image'])
        db.session.add(product)
        db.session.commit()

    elif properties.content_type == 'produc_updated':
        product = User.query.get(data['id'])
        product.title = data['status']
        db.session.commit()

    elif properties.content_type == 'product_deleted':
        product = User.query.get(data)
        db.session.delete(product)
        db.session.commit()   


channel.basic_consume(queue='main', on_message_callback=callback, auto_ack=True)

print('started consuming')

channel.start_consuming()

channel.close()

callback()