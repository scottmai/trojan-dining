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
from trojan_dining.retrieve_menu import retrieve_menu

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
        date = request.GET.get('date', None)

        if date is None:
            date = datetime.datetime.now()
        else:
            try:
                    date = datetime.datetime.strptime(date, "%Y-%m-%d")
            except:
                    return HttpResponse(status=400)
            

        # get the menu from that date
        try:
            retrieved_menu = retrieve_menu(datetime.datetime.date(date))
        except Menu.DoesNotExist:
            scrubed_site = scrub_web(date)
            menu_dict = menu_to_dict(scrubed_site)
            save_menu(menu_dict, date) 
            retrieved_menu = retrieve_menu(datetime.datetime.date(date))

        retrieved_menu_dict = retrieved_menu.__dict__
        del retrieved_menu_dict['id']
        del retrieved_menu_dict['_state']
        return JsonResponse({"Menu": retrieved_menu.__dict__})

class PostSubscription(APIView):
    def post(self, request):
        item_id = request.POST.get('item_id', None)

        if item_id is None:
            return HttpResponse(status = 400)
        else:
            email = request.POST.get('email', None)
            phone_number = request.POST.get('phone_number', None)

            if not email and not phone_number:
                return HttpResponse(400)
            
            try:  
                Subscription(item_id = item_id, email = email, phone_no = phone_number).save()
                return HttpResponse(201)
            except:
                return HttpResponse(500)
