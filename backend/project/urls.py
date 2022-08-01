"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from trojan_dining import views

urlpatterns = [
    path('', views.Hello.as_view()),
    path('admin/', admin.site.urls),
    path('items/', views.MenuItemList.as_view()),
    path('username/', views.Username.as_view()),
    path("menu/", views.GetMenu.as_view()),
    path("notify/", views.PostSubscription.as_view()),
    path("subscriptions/", views.GetSubscriptions.as_view()),
    path("unenroll/", views.DeleteSubscriptions.as_view())
]
