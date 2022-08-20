# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

def send_text_alert(association_map, phone_number):

    def construct_text_notification():

        dining_map = {"USC Village Dining Hall": "Village", "Parkside Restaurant & Grill": "Parkside", "Everybody's Kitchen": "EVK"}

        def make_mealtime_string(meal_time):

            res = ""

            for item in association_map[meal_time]:

                hall_list = list(item.times_to_halls[meal_time])

                hall_list.sort()

                formatted_locations = ' '.join([dining_map[hall] for hall in hall_list])

                line = f' - {item.name} // {formatted_locations}\n'

                res += line
                
            res += "\n"

            return res

        result = ""

        if len(association_map["Breakfast"]) != 0:
            result += "BREAKFAST\n"

            result += make_mealtime_string("Breakfast")

        if len(association_map["Brunch"]) != 0:

            result += "BRUNCH\n"

            result += make_mealtime_string("Brunch")

        if len(association_map["Lunch"]) != 0:

            result += "LUNCH\n"

            result += make_mealtime_string("Lunch")

        if len(association_map["Dinner"]) != 0:

            result += "DINNER\n"

            result += make_mealtime_string("Dinner")

        return result
    
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    message = client.messages \
        .create(
            body=construct_text_notification(),
            from_='+12692485394',
            to=phone_number
        )
