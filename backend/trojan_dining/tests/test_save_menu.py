from datetime import datetime
from django.test import TestCase

from trojan_dining.webscraper.webscraper import scrub_html, menu_to_dict
from trojan_dining.models import Menu, MenuItem
from trojan_dining.save_menu import save_menu
from trojan_dining.retrieve_menu import retrieve_menu

from trojan_dining.tests.test_webscraper import NORMAL_WEEKDAY_HTML
from trojan_dining.tests.test_webscraper import NORMAL_WEEKEND_HTML, WINTER_BREAK_HTML

class SaveMenuTestCase(TestCase):
    def test_save_menu(self):

        # persist normal weekday test html to the database
        normal_weekday_html = scrub_html(NORMAL_WEEKDAY_HTML)
        normal_weekday_dict = menu_to_dict(normal_weekday_html)

        save_menu(normal_weekday_dict)

        # retrieve persisted menu from database
        retrieved_menu = retrieve_menu(datetime.date(datetime.now()))

        print(retrieve_menu)

<<<<<<< Updated upstream
        assert retrieved_menu == normal_weekday_dict

        # clean record from database for next test
        Menu.objects.filter(date = datetime.date(datetime.now())).delete()
=======
        mi1 = list(MenuItem.objects.all())
>>>>>>> Stashed changes

        mi1 = [e.item_id for e in mi1]

        save_menu(menu_to_dict(normal_weekday_html))

        mi2 = list(MenuItem.objects.all())
        mi2 = [e.item_id for e in mi2]

        assert mi1 == mi2


        # # clean record from database for next test
<<<<<<< Updated upstream
        Menu.objects.filter(date = datetime.date(datetime.now())).delete()
=======
        # Menu.objects.filter(date = datetime.date(datetime.now())).delete()
>>>>>>> Stashed changes

        # # # persist normal weekend menu test html to database
        # normal_weekend_html = scrub_html(NORMAL_WEEKEND_HTML)
        # normal_weekend_dict = menu_to_dict(normal_weekend_html)

        # # persist database
        # save_menu(normal_weekend_dict)

        # # create another dict
        # normal_weekend_dict = menu_to_dict(normal_weekend_html)

        # # retrieve reconstructed menu
        # retrieved_menu = retrieve_menu(datetime.date(datetime.now()))

        # # # make sure the data that was returned from the query is what was returned from scrub_html
        # assert retrieved_menu == normal_weekend_dict

        # # # clean record from database for next test
        # Menu.objects.filter(date = datetime.date(datetime.now())).delete()

        # # # persist winter break html to database
        # winter_break_html = scrub_html(WINTER_BREAK_HTML)
        # winter_break_dict = menu_to_dict(winter_break_html)

        # save_menu(winter_break_dict)

        # winter_break_dict = menu_to_dict(winter_break_html)

        # # # retrieve persisted menu from database
        # retrieved_menu = retrieve_menu(datetime.date(datetime.now()))

        # # # make sure the data that was returned from the query is what was returned from scrub_html
        # assert retrieved_menu == winter_break_dict
