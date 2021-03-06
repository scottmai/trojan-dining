import os
from django.forms import EmailField
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email_alert(item_name,dining_hall, email_address):
    message = Mail(
        from_email='from_email@example.com',
        to_emails=email_address,
        subject='Order Up: Menu Item Notification',
        html_content='Alert: {} is being served at {} today'.format(item_name, dining_hall))
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)