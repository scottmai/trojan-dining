from django.core.management.base import BaseCommand
from trojan_dining.webscraper.webscraper import scrub_html, menu_to_dict
from trojan_dining.models import Menu
from trojan_dining.save_menu import save_menu
from trojan_dining.webscraper.webscraper import scrub_web, make_menu, menu_to_dict
from datetime import datetime


class Command(BaseCommand):
    help = "Saves today's menu"


    def handle(self, *args, **options):
        menu_soup = scrub_web(datetime.date(datetime.now()))
        menu_dict = menu_to_dict(menu_soup)
        save_menu(menu_dict)
        print("today's menu saved to database")