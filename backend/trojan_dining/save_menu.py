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

    # for time in retrieved_menu.MealTimes:
    #     for hall in time.DiningHalls:
    #         for station in hall.Stations:
    #             for food in station.MenuItems:
    #                 menu_item_doc = MenuItem(name = food.name, allergens = food.Allergens)
    #                 menu_item_doc.save()


