from rest_framework import serializers
from trojan_dining.models import MenuItem, Menu


class MenuItemSerialzer(serializers.ModelSerializer):

    class Meta:
        model = MenuItem
        fields = '__all__'

