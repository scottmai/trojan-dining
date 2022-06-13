import uuid
from trojan_dining.models import Menu, MenuItem
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
                station['item_uuids'] = []

                # populating the item_uuids field
                for item in station['items']:
                    station['item_uuids'].append({'uuid': str(uuid.uuid4())})

                for index, item in enumerate(station['items']):
                    # retrieve item uuid from the item_uuids array in station
                    item['item_uuid'] = station['item_uuids'][index]['uuid']

                    # persist the menu item to the database
                    menu_item = MenuItem()
                    menu_item.name = item['name']
                    menu_item.item_uuid = item['item_uuid']
                    menu_item.allergens = item['allergens']
                    menu_item.save()

                # get rid of array of menu item objects on the station object
                station.pop('items')
    # populate menu doc's meals attribute
    menu_doc.meals = dict_menu

    # add which day the menu reffers to
    if(menu_day is None):
        menu_doc.date = datetime.date(datetime.datetime.now())
    else:
        menu_doc.date = menu_day

    # Just add water (persist the menu to the database)
    menu_doc.save()
