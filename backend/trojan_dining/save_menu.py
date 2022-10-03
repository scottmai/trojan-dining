from re import sub
import uuid
from trojan_dining.models import Menu, MenuItem, Station
from collections import defaultdict
import datetime

# saves menu from database given a dictionary object
# VERY IMPORTANT!: This changes the menu dict in place. So it may need to be necessary to create another menu dict depending on your usage
def save_menu(dict_menu, menu_day=None):
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
