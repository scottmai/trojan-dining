from bs4 import BeautifulSoup
import requests as req
import datetime


class DailyMenu:
    def __init__(self, date, MealTime):
        self.date = date
        self.MealTimes = MealTime

    def __str__(self):
        return str(self.date.month) + "/"+str(self.date.day) + "/" + str(self.date.year)


class MealTime:
    def __init__(self, name, DiningHalls):
        self.name = name
        self.DiningHalls = DiningHalls

    def __str__(self):
        return self.name


class DiningHall:
    def __init__(self, name, Stations):
        self.name = name
        self.Stations = Stations

    def __str__(self):
        return self.name


class Station:
    def __init__(self, name, MenuItems):
        self.name = name
        self.MenuItems = MenuItems

    def __str__(self):
        return self.name


class MenuItem:
    def __init__(self, name, Allergens):
        self.name = name
        self.Allergens = Allergens

    def __str__(self):
        return self.name


class Allergen:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name


# 3 dining halls each with x stations. each station has x foodItems

def ScrubWeb(Date):
    # convert date into url
    month = Date.strftime("%B")
    day = Date.strftime("%d")
    year = Date.strftime("%Y")
    url = "https://hospitality.usc.edu/residential-dining-menus/?menu_date=" + \
        month+"+"+day+"%2C"+year
    # get the html from the website
    html_text = req.get(url).text
    # make it into soup
    soup = BeautifulSoup(html_text, "lxml")
    # get all meal blocks (brkfast, lunch, dinner etc)
    MealTimes_HTML = soup.find_all("div", class_="hsp-accordian-container")
    ListOfMealTime = []

    for block in MealTimes_HTML:  # loop through all the meal blocks
        # find the name of the block
        MealTimeName = block.find(
            "span", class_="fw-accordion-title-inner").text.split()[0]
        # make a new list of all the dining halls in a block
        DiningHalls_HTML = block.find_all("div", class_="col-sm-6 col-md-4")
        ListOfDiningHalls = []

        for Hall in DiningHalls_HTML:
            DiningHallName = Hall.find("h3", class_="menu-venue-title").text
            Station_Names_HTML = Hall.find_all("h4")
            # the list of foods is a bunch of lists not under stations but under DiningHalls so have to get a list of foods in each stations here
            MenuItems_ListList = Hall.find_all("ul")
            ListOfStations = []

            for i in range(len(Station_Names_HTML)):  # loop through all the stations
                StationName = Station_Names_HTML[i].text  # station name
                ListOfMenuItems = []
                # when theres no items program bugs out; my workaround
                if StationName != "No items to display for this date":
                    MenuItems_HTML = MenuItems_ListList[i].find_all(
                        "li")  # find all the food items
                    for menuItem in MenuItems_HTML:  # iterate through all the food
                        # get the name of the food item
                        MenuItemName = menuItem.find(
                            text=True, recursive=False)
                        # get all the allergens for that food item
                        Allergens_HTML = menuItem.find_all("i")
                        ListOfAllergens = [allergen.find("span").text for allergen in Allergens_HTML]
                        ListOfMenuItems.append(
                            MenuItem(MenuItemName, ListOfAllergens))
                ListOfStations.append(Station(StationName, ListOfMenuItems))
            ListOfDiningHalls.append(DiningHall(
                DiningHallName, ListOfStations))
        ListOfMealTime.append(MealTime(MealTimeName, ListOfDiningHalls))
    Menu = DailyMenu(Date, ListOfMealTime)
    # returns the overall menu of the day
    return Menu


if __name__ == "__main__":
    # test on today
    today = datetime.datetime.now()
    todaysMenu = ScrubWeb(today)

    print(todaysMenu)
    for time in todaysMenu.MealTimes:
        print("\t" + str(time))
        for hall in time.DiningHalls:
            print("\t\t"+str(hall))
            for station in hall.Stations:
                print("\t\t\t"+str(station))
                for food in station.MenuItems:
                    print("\t\t\t\t"+str(food))
                    for allergen in food.Allergens:
                        print("\t\t\t\t\t"+str(allergen))
