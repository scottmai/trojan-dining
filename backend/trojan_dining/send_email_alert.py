import os
from django.forms import EmailField
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email_alert(msg, email_address):
    message = Mail(
        from_email='placeholderdining@gmail.com',
        to_emails=email_address,
        subject='Order Up: Menu Item Notification',
        html_content=msg)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
   