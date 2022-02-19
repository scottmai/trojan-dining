from datetime import datetime
from django.test import TestCase

from trojan_dining.webscraper.webscraper import scrub_html, menu_to_dict
from trojan_dining.models import Menu
from trojan_dining.save_menu import save_menu


class SaveMenuTestCase(TestCase):
    def test_save_menu(self):

        # persist normal weekday test html to the database
        normal_weekday_html = scrub_html(
            "trojan_dining/webscraper/test_htmls/normal_weekday.html")
        normal_weekday_dict = menu_to_dict(normal_weekday_html)

        save_menu(normal_weekday_dict)

        # retrieve persisted menu from database
        retrieved_menu = Menu.objects.get(
            created_at=datetime.datetime.date(datetime.datetime.now()))

        # make sure the data that was returned from the query is what was returned from scrubweb
        assert retrieved_menu.meals == normal_weekday_dict

        # clean record from database for next test
        retrieved_menu.delete()

        # persist normal weekend menu test html to database
        normal_weekday_html = scrub_html(
            "trojan_dining/webscraper/test_htmls/normal_weekend.html")
        normal_weekend_dict = menu_to_dict(normal_weekday_html)

        save_menu(normal_weekend_dict)

        # retrieve persisted menu from database
        retrieved_menu = Menu.objects.get(
            created_at=datetime.datetime.date(datetime.datetime.now()))

        # make sure the data that was returned from the query is what was returned from scrub_html
        assert retrieved_menu.meals == normal_weekend_dict

        # clean record from database for next test
        retrieved_menu.delete()

        # persist winter break html to database
        winter_break_html = scrub_html(
            "trojan_dining/webscraper/test_htmls/winter_break.html")
        winter_break_dict = menu_to_dict(winter_break_html)

        save_menu(winter_break_dict)

        # retrieve persisted menu from database
        retrieved_menu = Menu.objects.get(
            created_at=datetime.datetime.date(datetime.datetime.now()))

        # make sure the data that was returned from the query is what was returned from scrub_html
        assert retrieved_menu.meals == winter_break_dict
