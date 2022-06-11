from trojan_dining.models import Menu, MenuItem
import copy

# inputs (1)
# d: datetime.date object specifying the date the menu was created
# outputs (1)
# Returns a reconstructed menu dict
def retrieve_menu(d):
        retrieved_menu = Menu.objects.get(date = d)

        retrieved_copy = copy.deepcopy(retrieved_menu.meals)

        # restore menu object using uuids
        for meal in retrieved_copy:
            for hall in meal['dining_halls']:
                for station in hall['stations']:
                    station['items'] = []
                    for item_uuid_obj in station['item_uuids']:
                        retrieved_menu_item = MenuItem.objects.get(item_uuid = item_uuid_obj["uuid"])   
                        menu_item_shell = {}
                        menu_item_shell['name'] = retrieved_menu_item.name
                        menu_item_shell['allergens'] = retrieved_menu_item.allergens
                        station['items'].append(menu_item_shell)
                    station.pop('item_uuids')

        return retrieved_copy