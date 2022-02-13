import os
import json
import unittest
from trojan_dining.webscraper import webscraper




NORMAL_WEEKDAY_HTML = "trojan_dining/tests/test_htmls/normal_weekday.html"
NORMAL_WEEKEND_HTML = "trojan_dining/tests/test_htmls/normal_weekend.html"
WINTER_BREAK_HTML = "trojan_dining/tests/test_htmls/winter_break.html"
NORMAL_WEEKDAY_JSON = "trojan_dining/tests/test_expected_values/normal_weekday.json"
NORMAL_WEEKEND_JSON = "trojan_dining/tests/test_expected_values/normal_weekend.json"
WINTER_BREAK_JSON = "trojan_dining/tests/test_expected_values/winter_break.json"
# ----------------------------------------------


def delete_file(file):
    if os.path.exists(file):
        os.remove(file)
    else:
        print(file)
class Test(unittest.TestCase):

    def test_normal_weekday(self):
        menu = webscraper.scrub_html(NORMAL_WEEKDAY_HTML)  # experimental menu
        webscraper.menu_output_json(menu, "output.json")
        with open(NORMAL_WEEKDAY_JSON,) as json_file:
            hard_coded = json.load(json_file)
        with open("output.json", ) as i:
            experimental_json = json.load(i)
        print("testing Normal Weekday...")
        self.assertEqual(hard_coded, experimental_json)
        delete_file("output.json")

    def test_normal_weekend(self):
        menu = webscraper.scrub_html(NORMAL_WEEKEND_HTML)
        webscraper.menu_output_json(menu, "output.json")
        with open(NORMAL_WEEKEND_JSON, ) as json_file:
            hard_coded = json.load(json_file)
        with open("output.json", ) as i:
            experimental_json = json.load(i)
        print("testing Normal Weekend...")
        self.assertEqual(hard_coded, experimental_json)
        delete_file("output.json")

    def test_winter_break(self):
        menu = webscraper.scrub_html(WINTER_BREAK_HTML)
        webscraper.menu_output_json(menu, "output.json")
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
