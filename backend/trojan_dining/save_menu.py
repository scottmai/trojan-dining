import sys 
import os
from trojan_dining.models import Menu, MenuItem
import datetime
import json

# function to persist a scrubbed menu to the database
def save_menu (dict_menu):
    # create menu document
    menu_doc = Menu()
    # populate it's meals attribute
    menu_doc.meals = dict_menu
    # Just add water (persist the menu to the database)
    menu_doc.save()

    for meal_time in dict_menu:
        for hall in meal_time['dining_halls']:
            for station in hall['stations']:
                for item in station['items']:
                    menu_item_doc = MenuItem()
                    menu_item_doc.name = item['name']
                    menu_item_doc.allergens = item['allergens']
                    menu_item_doc.save()
