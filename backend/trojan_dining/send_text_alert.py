# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

def send_text_alert(msg, phone_number):
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    message = client.messages \
        .create(
            body=msg,
            from_='+12692485394',
            to=phone_number
        )
