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

import json
import re


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
            print(datetime.datetime.date(date))
            retrieved_menu = retrieve_menu(datetime.datetime.date(date))
        except:
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

            # no email, no service :P
            if (email is None):
                return HttpResponse(status = 400)

            phone_number = request.POST.get('phone_number', None)

            # regex patterns for email and phone number
            rgx_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
            rgx_phone = r'(?:\+\d{2})?\d{3,4}\D?\d{3}\D?\d{3}'

            # check if email is valid
            if (not re.fullmatch(rgx_email, email)):
                return HttpResponse(status = 400)

            # if phone exists, validate it
            if (phone_number):
                if (not re.fullmatch(rgx_phone, phone_number)):
                    return HttpResponse(status = 400)

            # check if email is enabled
            email_enabled = request.POST.get('email_enabled', False)
            email_enabled = email_enabled == 'True'

            print(f"{email_enabled} {type(email_enabled)}")

            # create subscription if it doesnt exist
            try:  
                try:
                    pre_existing_sub = Subscription.objects.get(item_id = item_id, email = email, email_enabled = email_enabled)
                    pre_existing_sub.phone_no = phone_number
                    pre_existing_sub.save()
                except Exception as e1:
                    print("b")
                    print(e1)
                    Subscription(item_id = item_id, email = email, phone_no = phone_number, email_enabled = email_enabled).save()
                    print("c")
                return HttpResponse(status = 201)
            except Exception as e2:
                print("a")
                print(e2)
                return HttpResponse(status = 500)

class GetSubscriptions(APIView):
    def get(self, request):
        user_email = request.GET.get('email')
        
        subscription_list = list(Subscription.objects.filter(email = user_email).values())

        print(subscription_list)

        for sub in subscription_list:
            sub['name'] = MenuItem.objects.get(item_id = sub['item_id']).name
            if sub['email']:
                sub['email_notifications_enabled'] = True
            else:
                sub['email_notifications_enabled'] = False
            
            if sub['phone_no']: 
                sub['phone_notifications_enabled'] = True
            else:
                sub['phone_notifications_enabled'] = False
            
            del sub['email']

            del sub['phone_no']

        return JsonResponse({"Subscriptions": subscription_list})

class DeleteSubscriptions(APIView):
    def delete(self, request):
        body = json.loads(request.body)
        subscriptions = body['subscriptions']

        for sub in subscriptions:
            Subscription.objects.filter(item_id = sub["item_id"], email = sub["email"]).delete()
        
        return HttpResponse(status = 200)
