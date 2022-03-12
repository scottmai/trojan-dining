from django.shortcuts import render

from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from trojan_dining.webscraper.webscraper import menu_to_dict, scrub_web

from trojan_dining.models import MenuItem
from trojan_dining.serializers import MenuItemSerialzer
import getpass
from time import sleep
import datetime
from .models import *
from trojan_dining.save_menu import save_menu

# some demo endpoints


class Hello(APIView):
    def get(self, request):
        return HttpResponse("Hello there")


class MenuItemList(APIView):
    def get(self, request):
        items = MenuItem.objects.all()
        serializer = MenuItemSerialzer(items, many=True)
        return JsonResponse({'result': serializer.data})


class Username(APIView):
    def get(self, request):
        # adding an artificial delay to look like this takes longer than it really does xD
        sleep(5)
        user = getpass.getuser()
        return JsonResponse({"username": user})


class GetMenu(APIView):
    def get(self, request):
        # get the date and if it doesnt exist return ''
        date = request.GET.get('date', '')
        # turn it into datetime
        try:
            date = datetime.datetime.strptime(date, "%Y-%m-%d")
        except:
            return HttpResponse(status=400)
        # get the menu from that date
        try:
            retrieved_menu = Menu.objects.get(
                date=datetime.datetime.date(date))
        except Menu.DoesNotExist:
            scrubed_site = scrub_web(date)
            menu_dict = menu_to_dict(scrubed_site)
            save_menu(menu_dict, date) 
            retrieved_menu = Menu.objects.get(
                date=datetime.datetime.date(date))
        return JsonResponse({"Menu": retrieved_menu.meals})
