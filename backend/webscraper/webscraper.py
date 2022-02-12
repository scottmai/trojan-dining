import datetime
import json
from bs4 import BeautifulSoup
import requests as req

#for when comma
                          
class DailyMenu:
    def __init__(self, inp_meal_time):
        self.meal_times = inp_meal_time
                        


class MealTime:
    def __init__(self, name, dining_halls):
        self.name = name
        self.dining_halls = dining_halls

    def __str__(self):
        return self.name
class DiningHall:
    def __init__(self, name, stations):
        self.name = name
        self.stations = stations

    def __str__(self):
        return self.name

class Station:
    def __init__(self, name, menu_items):
        self.name = name
        self.menu_items = menu_items

    def __str__(self):
        return self.name

class MenuItem:
    def __init__(self, name, allergens):
        self.name = name
        self.allergens = allergens

    def __str__(self):
        return self.name


class Allergen:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

# 3 dining halls each with x stations. each station has x foodItems



def scrub_web(date):

    # convert date into url
    month = date.strftime("%B")
    day = date.strftime("%d")
    year = date.strftime("%Y")
    url = "https://hospitality.usc.edu/residential-dining-menus/?menu_date=" + \
        month+"+"+day+"%2C"+year
    # get the html from the website
    html_text = req.get(url).text
    # make it into soup
    soup = BeautifulSoup(html_text, "lxml")
    return make_menu(soup)


def scrub_html(file_name):

    # convert date into url
    with open(file_name, "r") as ifile:
        html_text = ifile.read()
        # make it into soup
        soup = BeautifulSoup(html_text, "lxml")

        return make_menu(soup)

def make_menu(soup):
    # get all meal blocks (brkfast, lunch, dinner etc)
    meal_times_html = soup.find_all("div", class_="hsp-accordian-container")
    list_of_meal_time = []
    for block in meal_times_html:  # loop through all the meal blocks

        # find the name of the block
        meal_time_name = block.find(
            "span", class_="fw-accordion-title-inner").text.split()[0]
        # make a new list of all the dining halls in a block
        dining_halls_html = block.find_all("div", class_="col-sm-6 col-md-4")
        list_of_dining_halls = []

        for hall in dining_halls_html:
            dining_hall_name = hall.find("h3", class_="menu-venue-title").text
            station_names_html = hall.find_all("h4")
            # the list of foods is a bunch of lists not under stations but under dining_halls
            # so have to get a list of foods in each stations here
            menu_items_list_list = hall.find_all("ul")
            list_of_stations = []

            for i in range(len(station_names_html)):  # loop through all the stations
                station_name = station_names_html[i].text  # station name
                list_of_menu_items = []
                # when theres no items program bugs out; my workaround
                if station_name != "No items to display for this date":
                    menu_items_html = menu_items_list_list[i].find_all(
                        "li")  # find all the food items
                    for menu_item in menu_items_html:  # iterate through all the food
                        # get the name of the food item
                        menu_item_name = menu_item.find(
                            text=True, recursive=False)
                        # get all the allergens for that food item

                        allergens_html = menu_item.find_all("i")
                        list_of_allergens = [allergen.find(
                            "span").text for allergen in allergens_html]
                        list_of_menu_items.append(
                            MenuItem(menu_item_name, list_of_allergens))
                list_of_stations.append(Station(station_name, list_of_menu_items))
            list_of_dining_halls.append(DiningHall(
                dining_hall_name, list_of_stations))
        list_of_meal_time.append(MealTime(meal_time_name, list_of_dining_halls))
    return DailyMenu(list_of_meal_time)


def menu_to_dict(inp_menu):
    time_list = []
    for time in inp_menu.meal_times:
        time_dict = {}
        hall_list = []
        for hall in time.dining_halls:
            hall_dict = {}
            station_list = []
            for station in hall.stations:
                station_dict = {}
                food_list = []
                for food in station.menu_items:
                    allergens_list = []
                    food_dict = {}
                    for allergen in food.allergens:
                        allergens_list.append(str(allergen))
                    food_dict["name"] = str(food)
                    food_dict["allergens"] = allergens_list
                    food_list.append(food_dict)
                station_dict["name"] = str(station)
                station_dict["items"] = food_list
                station_list.append(station_dict)
            hall_dict["name"] = str(hall)
            hall_dict["stations"] = station_list
            hall_list.append(hall_dict)
        time_dict["name"] = str(time)
        time_dict["dining_halls"]=hall_list
        time_list.append(time_dict)
    return time_list

def menu_to_txt(todays_menu):
    output_file_name = "output.txt"
    with open(output_file_name, "a") as out:
        out.write(str(todays_menu) + "\n")
        for time in todays_menu.meal_times:
            out.write("\t" + str(time) + "\n")
            for hall in time.dining_halls:
                out.write("\t\t"+str(hall) + "\n")
                for station in hall.stations:
                    out.write("\t\t\t"+str(station) + "\n")
                    for food in station.menu_items:
                        out.write("\t\t\t\t"+str(food) + "\n")
                        for allergen in food.allergens:
                            out.write("\t\t\t\t\t"+str(allergen)+"\n")

def menu_to_json(inp_menu):
    return json.dumps(menu_to_dict(inp_menu), ensure_ascii=False, indent=4)

def menu_output_json(inp_menu, output_file):
    experimental_json = menu_to_json(inp_menu)
    with open(output_file, "w") as experimental_output:
        experimental_output.write(experimental_json)



if __name__ == "__main__":
    # test
    today = datetime.datetime.now()
    Menu = scrub_html("test_htmls//winter_break.html")
    JsonMenu = menu_to_json(Menu)

