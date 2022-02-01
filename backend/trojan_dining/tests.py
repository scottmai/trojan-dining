from datetime import datetime
from django.test import TestCase

from trojan_dining.webscraper.webscraper import ScrubWeb, MenuToDict
from .save_menu import save_menu
from trojan_dining.models import Menu
import datetime

# Create your tests here.
class SaveMenuTestCase(TestCase):
    def test_save_menu(self):
        # persist today's menu to the database
        save_menu(datetime.datetime.now())
        
        # get the dict of today's menu
        raw_menu = ScrubWeb(datetime.datetime.now())

        # get the dict representation of the menu
        dict_menu = MenuToDict(raw_menu)

        # retrieve persisted menu from database
        retrieved_menu = Menu.objects.get(created_at = datetime.datetime.date(datetime.datetime.now()))

        # make sure the data that was returned from the query is what was returned from scrubweb
        assert retrieved_menu.meals == dict_menu

