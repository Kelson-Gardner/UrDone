# Generated by Django 5.0.3 on 2024-04-29 22:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_post_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='image',
        ),
    ]