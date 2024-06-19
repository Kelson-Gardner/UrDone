from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    id = models.BigAutoField(primary_key=True)
    caption = models.TextField()
    likes = models.IntegerField()
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=50, default='Anonymous')


class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    message = models.TextField()
    user_name = models.CharField(max_length=50, default='Comment')
    post = models.ForeignKey("Post", on_delete=models.CASCADE)

class Profile(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_name = models.CharField(max_length=50, default='Anonymous')
    email = models.CharField(max_length=50, default='Anonymous')
    bio = models.TextField()
    age = models.IntegerField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)