from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('me/', view=views.me, name="current user"),
    path('posts/', views.create_post, name="create_post"),
    path('update_posts/', views.update_posts, name="update_posts"),
    path('post_comment/', views.post_comment, name="post_comment"),
    path('has_profile/', views.get_profile, name="has_profile"),
    path('create_profile/', views.create_profile, name="create_profile"),
    path('get_profile/', views.get_profile, name="get_profile"),
    path('posts_user/', views.get_users_post, name="get_users_posts"),
    path('get_my_profile/', views.get_my_profile, name="get_my_profile")
]