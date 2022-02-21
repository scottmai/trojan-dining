# from django.db import models
from djongo import models
 

# wrapper for allergen strings needed because Mongo refuses to directly persist strings stored in MetaMenuItem's Allergen List
class Allergen(models.Model):
    name = models.CharField(max_length=50)
    class Meta:
        abstract = True

# used for embedded menu document
class MetaMenuItem(models.Model):
    name = models.CharField(max_length = 100)
    allergens = models.ArrayField(model_container=Allergen, default = None)

    class Meta:
        abstract = True

# model representative stations 
class Station(models.Model):
    name = models.CharField(max_length = 50)
    items = models.ArrayField(model_container = MetaMenuItem)
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

# model representative of menu
class Menu(models.Model):
        # for queries
        created_at = models.DateField(auto_now_add=True)
        meals = models.ArrayField(model_container = Meal)

        objects = models.DjongoManager()
        
# used to actually persist the menu
class MenuItem(models.Model):
    name = models.CharField(max_length = 100)
    allergens = models.ArrayField(model_container=Allergen)
    
