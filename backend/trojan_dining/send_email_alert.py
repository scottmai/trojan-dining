import os
from django.forms import EmailField
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email_alert(association_map, email_address):

    def construct_email_notification():
        dining_map = {"USC Village Dining Hall": "Village", "Parkside Restaurant & Grill": "Parkside", "Everybody's Kitchen": "EVK"}

        def make_mealtime_row(meal_time):

            res = ""

            for item in association_map[meal_time]:

                hall_list = list(item.times_to_halls[meal_time])

                hall_list.sort()

                formatted_locations = ', '.join([dining_map[hall] for hall in hall_list])

                row = f'<tr><td style =\"border: 1px solid black;\"> {item.name} </td> <td style =\"border: 1px solid black;\">{formatted_locations}</td></tr>'

                res += row
                

            return res

        result = "<table style =\"border: 1px solid black;\">"

        if len(association_map["Breakfast"]) != 0:
            result += "<tr>BREAKFAST</tr>"

            result += make_mealtime_row("Breakfast")

        if len(association_map["Brunch"]) != 0:

            result += "<tr>BRUNCH</tr>"

            result += make_mealtime_row("Brunch")

        if len(association_map["Lunch"]) != 0:

            result += "<tr>LUNCH</tr>"

            result += make_mealtime_row("Lunch")

        if len(association_map["Dinner"]) != 0:

            result += "<tr>DINNER</tr>"

            result += make_mealtime_row("Dinner")
        
        result += "</table>"

        return result

    message = Mail(from_email='placeholderdining@gmail.com', to_emails=email_address, subject='Order Up: Menu Item Notification', html_content=construct_email_notification())

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
