import sys 
import os
from trojan_dining.models import Menu, MenuItem
import datetime
from trojan_dining.webscraper.webscraper import ScrubWeb

def save_menu (date):
    retrieved_menu = ScrubWeb(date)
    menu_doc = Menu(meals = retrieved_menu.MealTimes)
    menu_doc.save()

    for time in retrieved_menu.MealTimes:
        for hall in time.DiningHalls:
            for station in hall.Stations:
                for food in station.MenuItems:
                    menu_item_doc = MenuItem(name = food.name, allergens = food.Allergens)
                    menu_item_doc.save()


