import os
import unittest
from typing import List
from bs4 import BeautifulSoup
import requests as req
import datetime
import json
import webscraper



prg = "./webscraper.py"

normal_weekday_html = "test_htmls//normal_weekday.html"
normal_weekend_html = "test_htmls//normal_weekend.html"
winter_break_html = "test_htmls/winter_break.html"
normal_weekday_json = "test_expected_values/normal_weekday.json"
normal_weekend_json = "test_expected_values/normal_weekend.json"
winter_break_json = "test_expected_values/winter_break.json"
# ----------------------------------------------


def DeleteFile(file):
    if os.path.exists(file):
        os.remove(file)
    else:
        print(file)  
class Test(unittest.TestCase):

    def testNormalWeekday(self):
        Menu = webscraper.ScrubHTML(normal_weekday_html)  # experimental menu
        webscraper.MenuOutputJson(Menu, "output.json")
        with open(normal_weekday_json) as jsonFile:
            HardCoded = json.load(jsonFile)
        with open("output.json", "r") as i:
            ExperimentalJson = json.load(i)
        print("testing Normal Weekday...")
        self.assertEqual(HardCoded, ExperimentalJson)
        DeleteFile("output.json")
      

    def testNormalWeekend(self):
        Menu = webscraper.ScrubHTML(normal_weekend_html)
        webscraper.MenuOutputJson(Menu, "output.json")
        with open(normal_weekend_json) as jsonFile:
            HardCoded = json.load(jsonFile)
        with open("output.json", "r") as i:
            ExperimentalJson = json.load(i)
        print("testing Normal Weekend...")
        self.assertEqual(HardCoded, ExperimentalJson)
        DeleteFile("output.json")

    def testWinterBreak(self):
        Menu = webscraper.ScrubHTML(winter_break_html)
        webscraper.MenuOutputJson(Menu, "output.json")
        with open(winter_break_json) as jsonFile:
            HardCoded = json.load(jsonFile)
        with open("output.json", "r") as i:
            ExperimentalJson = json.load(i)
        print("testing Normal Weekend...")
        self.assertEqual(HardCoded, ExperimentalJson)
        DeleteFile("output.json")

# ----------------------------------------------
if __name__ == '__main__':
    unittest.main()

