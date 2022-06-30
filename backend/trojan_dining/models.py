# from django.db import models
from attr import fields
from django.forms import UUIDField
from djongo import models
import uuid
 

# wrapper for allergen strings needed because Mongo refuses to directly persist strings stored in MetaMenuItem's Allergen List
class Allergen(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        abstract = True

# used to represent uuids for menu items
class ItemID(models.Model):
    item_id = models.UUIDField()
    class Meta:
        abstract = True

# model that represents menu item documents
class MenuItem(models.Model):
    item_id = models.UUIDField(default=None)
    name = models.CharField(max_length = 100)
    allergens = models.ArrayField(model_container = Allergen)



class Station(models.Model):
    name = models.CharField(max_length = 50)
    item_ids = models.ArrayField(model_container = ItemID)
    class Meta:
        abstract = True

# model representative of dining halls
class DiningHall(models.Model):
    name = models.CharField(max_length = 50)
    stations = models.ArrayField(model_container = Station)
    class Meta:
        abstract = True

# model representative of Meals
class Meal(models.Model):
    name = models.CharField(max_length = 50)
    dining_halls = models.ArrayField(model_container = DiningHall) 

    class Meta:
        abstract = True

# model representation of menu
class Menu(models.Model):
        # for queries
        date = models.DateField(default = None)
        meals = models.ArrayField(model_container = Meal)
        objects = models.DjongoManager()
        
class Subscription(models.Model):
    item_id = models.UUIDField(max_length = 32, default = None)
    email = models.CharField(max_length = 100, default = None)
    phone_no = models.CharField(max_length = 100, default = None)
    
