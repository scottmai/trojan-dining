from datetime import datetime
from django.test import TestCase

from trojan_dining.webscraper.webscraper import scrub_html, menu_to_dict
from trojan_dining.models import Menu, MenuItem, Subscription
from trojan_dining.save_menu import save_menu
from trojan_dining.retrieve_menu import retrieve_menu

from trojan_dining.tests.test_webscraper import NORMAL_WEEKDAY_HTML
from trojan_dining.tests.test_webscraper import NORMAL_WEEKEND_HTML, WINTER_BREAK_HTML

class NotificationTestCase(TestCase):
    def test_notifications(self):

        # persist normal weekday test html to the database
        normal_weekday_html = scrub_html(NORMAL_WEEKDAY_HTML)
        normal_weekday_dict = menu_to_dict(normal_weekday_html)

        save_menu(normal_weekday_dict)

        # retrieve persisted menu from database
        retrieved_menu = retrieve_menu(datetime.date(datetime.now()))

        print(retrieve_menu)

        mi1 = list(MenuItem.objects.all())

        mi1 = [e.item_id for e in mi1]

        # insert your details here
        my_sub = Subscription(item_id = mi1[0], email = "bncarter@usc.edu", phone_no = "+15043775556")
        my_sub.save()


        save_menu(menu_to_dict(normal_weekday_html))



        # # clean record from database for next test
        # Menu.objects.filter(date = datetime.date(datetime.now())).delete()

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
