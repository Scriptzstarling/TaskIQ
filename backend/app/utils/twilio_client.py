import os
from twilio.rest import Client

def send_whatsapp(to_number, body):
    try:
        client = Client(os.getenv('TWILIO_ACCOUNT_SID'), os.getenv('TWILIO_AUTH_TOKEN'))
        message = client.messages.create(
            body=body,
            from_='whatsapp:' + os.getenv('TWILIO_PHONE_NUMBER'),
            to='whatsapp:' + to_number
        )
        return True
    except Exception as e:
        print(f"Twilio Error: {e}")
        return False
