# from django.db import models
from djongo import models
import uuid
 

# wrapper for allergen strings needed because Mongo refuses to directly persist strings stored in MetaMenuItem's Allergen List
class Allergen(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        abstract = True

# used for embedded menu document
class ItemUUID(models.Model):
    uuid = models.CharField(max_length = 32)
    class Meta:
        abstract = True

# model representative stations 
class Station(models.Model):
    name = models.CharField(max_length = 50)
    item_uuids = models.ArrayField(model_container = ItemUUID)
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
        
class MenuItem(models.Model):
    item_uuid = models.CharField(max_length = 32)
    name = models.CharField(max_length = 100)
    allergens = models.ArrayField(model_container=Allergen)

class Subscription(models.Model):
    item_uuid = models.CharField(max_length = 32)
    email = models.CharField(max_length = 100)
    phone_no = models.CharField(max_length = 100)
    
