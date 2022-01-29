# from django.db import models
from djongo import models

class Allergen(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        abstract = True

class MetaMenuItem(models.Model):
    name = models.CharField(max_length = 100)
    allergens = models.ArrayField(model_container=Allergen, default = None)

    class Meta:
        abstract = True

class Station(models.Model):
    name = models.CharField(max_length = 50)
    items = models.ArrayField(model_container = MetaMenuItem)
    class Meta:
        abstract = True

class DiningHall(models.Model):
    name = models.CharField(max_length = 50)
    stations = models.ArrayField(model_container = Station)
    class Meta:
        abstract = True

class Meal(models.Model):
    name = models.CharField(max_length = 50)
    dining_halls = models.ArrayField(model_container = DiningHall) 

    class Meta:
        abstract = True

class Menu(models.Model):
        meals = models.ArrayField(model_container = Meal)
        
class MenuItem(models.Model):
    name = models.CharField(max_length = 100)
    allergens = models.ArrayField(model_container=Allergen)

