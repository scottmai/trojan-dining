from re import sub
from symbol import subscript
import uuid
from trojan_dining.models import Menu, MenuItem, Station, Subscription
from trojan_dining.send_email_alert import send_email_alert
from trojan_dining.send_text_alert import send_text_alert
from collections import defaultdict
from trojan_dining.retrieve_menu import retrieve_menu
import datetime

class AssociatedItem():
    def __init__(self, item_name, hall_name, hall_time, phone_number, email_enabled):
        self.name = item_name
        self.times_to_halls = defaultdict(set)
        self.times_to_halls[hall_time].add(hall_name)
        self.phone_number = phone_number
        self.email_enabled = email_enabled

def send_notifications():
    todays_menu = retrieve_menu(datetime.datetime.now()).__dict__

    # core structures
    email_to_item_name = defaultdict(set)
    email_to_item = defaultdict(list)

    for meal in todays_menu['meals']:
        for hall in meal['dining_halls']:
            for station in hall['stations']:
                for item in station['items']:   
                    # get all subscriptions for the item
                    subscriptions = Subscription.objects.filter(item_id = item['id'])

                    for subscription in subscriptions:
                        # if item not mapped to subscriber (indicated by email_to_item_name)
                        if item['name'] not in email_to_item_name[subscription.email]:

                            # prevent it from being added to the same user again
                            email_to_item_name[subscription.email].add(item['name'])

                            # construct item object differently depending on if it has an associated phone number subscription
                            if subscription.phone_no:
                                email_to_item[subscription.email].append(AssociatedItem(item['name'], hall['name'], meal['name'], subscription.phone_no, subscription.email_enabled))
                            else:
                                email_to_item[subscription.email].append(AssociatedItem(item['name'], hall['name'], meal['name'], None, subscription.email_enabled))
                        # otherwise update the item mapped to the the subscriber with new time and its complimentary dining hall
                        else:
                            filtered = [x for x in email_to_item[subscription.email] if x.name == item['name']]
                            found_item = filtered[0]
                            found_item.times_to_halls[meal["name"]].add(hall["name"])


    for email in email_to_item.keys():
        email_only = []
        phone_only = []

        for item in email_to_item[email]:
            if item.phone_number and item.email_enabled:
                phone_only.append(item)
                email_only.append(item)
            elif item.phone_number and not item.email_enabled:
                phone_only.append(item)
            else:
                email_only.append(item)

        # mealtime to food item mapping for email only subscriptions
        email_only_mealtime_items = {"Breakfast": [], "Brunch": [], "Lunch": [], "Dinner": []}
        
        for meal_item in email_only: 
            if "Breakfast" in meal_item.times_to_halls:
                email_only_mealtime_items["Breakfast"].append(meal_item)
            if "Brunch" in meal_item.times_to_halls:
                email_only_mealtime_items["Brunch"].append(meal_item)
            if "Lunch" in meal_item.times_to_halls:
                email_only_mealtime_items["Lunch"].append(meal_item)
            if "Dinner" in meal_item.times_to_halls:
                email_only_mealtime_items["Dinner"].append(meal_item)

        # mealtime to food item mapping for phone only subscriptions
        phone_only_mealtime_items = {"Breakfast": [], "Brunch": [], "Lunch": [], "Dinner": []}

        for meal_item in phone_only: 
            if "Breakfast" in meal_item.times_to_halls:
                phone_only_mealtime_items["Breakfast"].append(meal_item)
            if "Brunch" in meal_item.times_to_halls:
                phone_only_mealtime_items["Brunch"].append(meal_item)
            if "Lunch" in meal_item.times_to_halls:
                phone_only_mealtime_items["Lunch"].append(meal_item)
            if "Dinner" in meal_item.times_to_halls:
                phone_only_mealtime_items["Dinner"].append(meal_item)

        if (len(phone_only) != 0):
            send_text_alert(phone_only_mealtime_items,phone_only[0].phone_number)

        if (len(email_only) != 0):
            send_email_alert(email_only_mealtime_items, email)
