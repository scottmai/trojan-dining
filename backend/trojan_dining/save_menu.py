from operator import itemgetter
from tkinter import Menubutton
from trojan_dining.models import Menu, MenuItem
import uuid
import copy


def save_menu(dict_menu):
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

    # Just add water (persist the menu to the database)
    menu_doc.save()
