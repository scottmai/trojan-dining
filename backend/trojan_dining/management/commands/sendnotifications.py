from django.core.management.base import BaseCommand
from trojan_dining.webscraper.webscraper import scrub_html, menu_to_dict
from trojan_dining.models import Menu
from trojan_dining.send_notifications import send_notifications
from trojan_dining.webscraper.webscraper import scrub_web, make_menu, menu_to_dict
from datetime import datetime

from django.conf import settings


class Command(BaseCommand):
    help = "Sends the notifications for the day it's called"
    
    def handle(self, *args, **options):
        send_notifications()
        print("Today's Notifications Sent")