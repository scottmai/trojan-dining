# Generated by Django 3.1.12 on 2022-06-11 00:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trojan_dining', '0006_merge_20220611_0040'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menu',
            name='created_at',
        ),
    ]