# Generated by Django 3.1.12 on 2022-03-08 01:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trojan_dining', '0003_menu_menu_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='menu',
            old_name='menu_date',
            new_name='date',
        ),
    ]
