from django.shortcuts import render

from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from trojan_dining.models import MenuItem
from trojan_dining.serializers import MenuItemSerialzer
import getpass

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
        user = getpass.getuser()
        return JsonResponse({"username": user})
