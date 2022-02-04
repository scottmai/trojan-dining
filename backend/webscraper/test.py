import os
import unittest
import json
import webscraper





NORMAL_WEEKDAY_HTML = "test_htmls//normal_weekday.html"
NORMAL_WEEKEND_HTML = "test_htmls//normal_weekend.html"
WINTER_BREAK_HTML = "test_htmls/winter_break.html"
NORMAL_WEEKDAY_JSON = "test_expected_values/normal_weekday.json"
NORMAL_WEEKEND_JSON = "test_expected_values/normal_weekend.json"
WINTER_BREAK_JSON = "test_expected_values/winter_break.json"
# ----------------------------------------------


def delete_file(file):
    if os.path.exists(file):
        os.remove(file)
    else:
        print(file)
class Test(unittest.TestCase):

    def test_normal_weekday(self):
        menu = webscraper.ScrubHTML(NORMAL_WEEKDAY_HTML)  # experimental menuw 
        webscraper.MenuOutputJson(menu, "output.json")
        with open(NORMAL_WEEKDAY_JSON,) as json_file:
            hard_coded = json.load(json_file)
        with open("output.json", ) as i:
            experimental_json = json.load(i)
        print("testing Normal Weekday...")
        self.assertEqual(hard_coded, experimental_json)
        delete_file("output.json")
      

    def test_normal_weekend(self):
        menu = webscraper.ScrubHTML(NORMAL_WEEKEND_HTML)
        webscraper.MenuOutputJson(menu, "output.json")
        with open(NORMAL_WEEKEND_JSON, ) as json_file:
            hard_coded = json.load(json_file)
        with open("output.json", ) as i:
            experimental_json = json.load(i)
        print("testing Normal Weekend...")
        self.assertEqual(hard_coded, experimental_json)
        delete_file("output.json")

    def test_winter_break(self):
        menu = webscraper.ScrubHTML(WINTER_BREAK_HTML)
        webscraper.MenuOutputJson(menu, "output.json")
        with open(WINTER_BREAK_JSON,) as json_file:
            hard_coded = json.load(json_file)
        with open("output.json", ) as i:
            experimental_json = json.load(i)
        print("testing Normal Weekend...")
        self.assertEqual(hard_coded, experimental_json)
        delete_file("output.json")

# ----------------------------------------------
if __name__ == '__main__':
    unittest.main()
