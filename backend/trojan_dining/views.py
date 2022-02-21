from django.shortcuts import render

from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from trojan_dining.models import MenuItem
from trojan_dining.serializers import MenuItemSerialzer
import getpass
from time import sleep
import datetime
from .models import Menu

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
        #get the date and if it doesnt exist return 1
        date = request.GET.get('date', '')
        #turn it into datetime
        date = datetime.strptime("date", "%Y", '%d',"%d")
        #get the menu from that date 
        try:
            retrieved_menu = Menu.objects.get(
            created_at=datetime.datetime.date(date))
        except model.DoesNotExist:
            retrieved_menu = None
        return 

