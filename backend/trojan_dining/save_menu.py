import sys 
import os
from trojan_dining.models import Menu, MenuItem
import datetime
from trojan_dining.webscraper.webscraper import ScrubWeb, MenuToDict
import json

def save_menu (date):
    retrieved_menu = ScrubWeb(date)
    dict_menu = MenuToDict(retrieved_menu)
    menu_doc = Menu()
    menu_doc.meals = dict_menu
    menu_doc.save()

    for meal_time in dict_menu:
        for hall in meal_time['dining_halls']:
            for station in hall['stations']:
                for item in station['items']:
                    menu_item_doc = MenuItem()
                    menu_item_doc.name = item['name']
                    menu_item_doc.allergens = item['allergens']
                    menu_item_doc.save()