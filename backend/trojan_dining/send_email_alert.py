import os
from django.forms import EmailField
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email_alert(association_map, email_address):
    # for Scott
    def construct_email_notification():
        res = ""

        return res

    message = Mail(
        from_email='placeholderdining@gmail.com',
        to_emails=email_address,
        subject='Order Up: Menu Item Notification',
        html_content=construct_email_notification())
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
