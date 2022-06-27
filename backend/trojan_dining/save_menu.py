import uuid
from trojan_dining.models import Menu, MenuItem, Station, Subscription
from trojan_dining.send_email_alert import send_email_alert
from trojan_dining.send_text_alert import send_text_alert
import datetime

# saves menu from database given a dictionary object
# VERY IMPORTANT!: This changes the menu dict in place. So it may need to be necessary to create another menu dict depending on your 
# uses

def save_menu(dict_menu, menu_day=None):
    # function to persist a scrubbed menu to the database
    # create menu document
    menu_doc = Menu()
    # add uuids to items in  and persist menuitems to menuitem collection with uuids
    for meal in dict_menu:
        for hall in meal['dining_halls']:
            for station in hall['stations']:
                
                station['item_ids'] = []

                for index, item in enumerate(station['items']):

                    match = None

                    # check if food item name already exists in menuitems
                    try:
                        match = MenuItem.objects.get(name = item["name"])
                    except:
                        pass

                    if (match):
                        # add matched menu item's objectId to menu_ids string
                        station['item_ids'].append({"item_id": match.item_id})

                    else:
                        # created a new document 
                        menu_item = MenuItem()

                        menu_item.item_id = uuid.uuid4()

                        station["item_ids"].append({"item_id": menu_item.item_id})

                        # fill out attributes
                        menu_item.name = item['name']
                        menu_item.allergens = item['allergens']

                        # save item
                        menu_item.save()

                for id in station["item_ids"]:
                    menu_item = MenuItem.objects.get(item_id = id)
                    subscriptions = Subscription.objects.filter(item_id = id)
                    subscriptions = list(subscriptions)
                    for subscription in subscriptions:
                        if subscription.email:
                            send_email_alert(menu_item.name, hall.name, subscription.email)
                        if subscription.phone_no:
                            send_text_alert(menu_item.name, hall.name, subscription.phone_no)

                # get rid of array of menu item objects on the station object
                station.pop('items')

    # populate menu doc's meals attribute
    menu_doc.meals = dict_menu

    # add which day the menu refers to
    if(menu_day is None):
        menu_doc.date = datetime.datetime.now()
    else:
        menu_doc.date = menu_day

    # persist the menu to the database
    menu_doc.save()
