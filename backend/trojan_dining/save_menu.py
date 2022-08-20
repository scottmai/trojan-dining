from re import sub
import uuid
from trojan_dining.models import Menu, MenuItem, Station, Subscription
from trojan_dining.send_email_alert import send_email_alert
from trojan_dining.send_text_alert import send_text_alert
from collections import defaultdict
import datetime

class AssociatedItem():
    
    def __init__(self, item_name, hall_name, hall_time, phone_number = None):
        self.name = item_name
        self.times_to_halls = defaultdict(set)
        self.times_to_halls[hall_time].add(hall_name)
        self.phone_number = phone_number

# saves menu from database given a dictionary object
# VERY IMPORTANT!: This changes the menu dict in place. So it may need to be necessary to create another menu dict depending on your 
# usage

def save_menu(dict_menu, menu_day=None):


    # core structures
   
    email_to_item_name = defaultdict(set)
    email_to_item = defaultdict(list)

    # create menu document
    menu_doc = Menu()
    
    # add uuids to items in  and persist menuitems to menuitem collection with uuids
    for meal in dict_menu:
        for hall in meal['dining_halls']:
            for station in hall['stations']:

                # getting unique items
                collisions = set()
                new_items = []

                for item in station["items"]:
                    if item["name"] in collisions:
                        continue
                    else:
                        collisions.add(item["name"])
                        new_items.append(item)

                # update items property
                station["items"] = new_items

                station['item_ids'] = []

                for index, item in enumerate(station['items']):
                    match = None
                    curr_item = None

                    # check if food item name already exists in menuitems
                    try:
                        match = MenuItem.objects.get(name = item["name"])
                    except:
                        pass

                    if match:
                        curr_item = match
                        # add matched menu item's objectId to menu_ids string
                        station['item_ids'].append({"item_id": match.item_id})

                    else:
                        # created a new document 
                        menu_item = MenuItem()

                        curr_item = menu_item

                        menu_item.item_id = uuid.uuid4()

                        station["item_ids"].append({"item_id": menu_item.item_id})

                        # fill out attributes
                        menu_item.name = item['name']
                        menu_item.allergens = item['allergens']

                        # save item
                        menu_item.save()
                    
                    # get all subscriptions for the item
                    subscriptions = Subscription.objects.filter(item_id = curr_item.item_id)


                    for subscription in subscriptions:

                        # if item not mapped to subscriber (indicated by email_to_item_name)
                        if curr_item.name not in email_to_item_name[subscription.email]:

                            # prevent it from being added to the same user again
                            email_to_item_name[subscription.email].add(curr_item.name)

                            # construct item object differently depending on if it has an associated phone number subscription
                            if subscription.phone_no:
                                email_to_item[subscription.email].append(AssociatedItem(curr_item.name, hall["name"], meal["name"], subscription.phone_no))
                            else:
                                email_to_item[subscription.email].append(AssociatedItem(curr_item.name, hall["name"], meal["name"]))
                        # otherwise update the item mapped to the the subscriber with new time and its complimentary dining hall
                        else:
                            filtered = [x for x in email_to_item[subscription.email] if x.name == curr_item.name]
                            found_item = filtered[0]
                            found_item.times_to_halls[meal["name"]].add(hall["name"])


                    

                # get rid of array of menu item objects on the station object
                station.pop('items')

    for email in email_to_item.keys():
        email_only = []
        phone_and_email = []


        for item in email_to_item[email]:
            if item.phone_number:
                phone_and_email.append(item)
                email_only.append(item)
            else:
                email_only.append(item)

        # mealtime to food item mapping for email only subscriptions
        email_mealtime_items = {"Breakfast": [], "Brunch": [], "Lunch": [], "Dinner": []}
        
        for meal_item in email_only: 
            if "Breakfast" in meal_item.times_to_halls:
                email_mealtime_items["Breakfast"].append(meal_item)
            if "Brunch" in meal_item.times_to_halls:
                email_mealtime_items["Brunch"].append(meal_item)
            if "Lunch" in meal_item.times_to_halls:
                email_mealtime_items["Lunch"].append(meal_item)
            if "Dinner" in meal_item.times_to_halls:
                email_mealtime_items["Dinner"].append(meal_item)

        # mealtime to food item mapping for email + phone subscriptions
        phone_mealtime_items = {"Breakfast": [], "Brunch": [], "Lunch": [], "Dinner": []}
        
        for meal_item in phone_and_email: 
            if "Breakfast" in meal_item.times_to_halls:
                phone_mealtime_items["Breakfast"].append(meal_item)
            if "Brunch" in meal_item.times_to_halls:
                phone_mealtime_items["Brunch"].append(meal_item)
            if "Lunch" in meal_item.times_to_halls:
                phone_mealtime_items["Lunch"].append(meal_item)
            if "Dinner" in meal_item.times_to_halls:
                phone_mealtime_items["Dinner"].append(meal_item)

        if (len(phone_and_email) != 0):
            send_text_alert(phone_mealtime_items,phone_and_email[0].phone_number)
        if (len(email_only) != 0):
            send_email_alert(email_mealtime_items, email)

    # populate menu doc's meals attribute
    menu_doc.meals = dict_menu

    # add which day the menu refers to
    if(menu_day is None):
        menu_doc.date = datetime.datetime.now()
    else:
        menu_doc.date = menu_day

    # persist the menu to the database
    menu_doc.save()
