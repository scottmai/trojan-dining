from trojan_dining.models import Menu, MenuItem
from djongo import models
import copy

# inputs (1)
# d: datetime.date object specifying the date the menu was created
# outputs (1)
# Returns a reconstructed menu dict
def retrieve_menu(d):
    # fetch menu for specific date
    retrieved_menu = Menu.objects.get(date = d)

    # restore menu object using uuids
    for meal in retrieved_menu.meals:
        for hall in meal['dining_halls']:
            for station in hall['stations']:
                station['items'] = []
                for id in station['item_ids']:
                    retrieved_menu_item = MenuItem.objects.get(item_id = id["item_id"])   
                    menu_item_shell = {}
                    menu_item_shell["id"] = id["item_id"]
                    menu_item_shell['name'] = retrieved_menu_item.name
                    menu_item_shell['allergens'] = retrieved_menu_item.allergens
                    station['items'].append(menu_item_shell)
                station.pop('item_ids')

    return retrieved_menu