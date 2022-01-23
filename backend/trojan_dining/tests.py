from django.test import TestCase
from .save_menu import save_menu
import datetime

# Create your tests here.
class SaveMenuTestCase(TestCase):
    def test_save_menu(self):
        save_menu(datetime.datetime.now())