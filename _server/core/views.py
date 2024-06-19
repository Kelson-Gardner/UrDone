from django.shortcuts import render
from django.conf  import settings
import json
import os
from datetime import datetime
from .models import Post, Comment, Profile
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required


MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def me(req):
    return JsonResponse({"user": model_to_dict(req.user)})

@login_required
def get_my_profile(req):
    if req.method == "POST":
        body = json.loads(req.body)
        profile = Profile.objects.get(email=req.user.email)
        profile.bio = body["bio"]
        profile.age = body["age"]
        profile.save()

    profile = Profile.objects.get(email=req.user)
    return JsonResponse({"profile": model_to_dict(profile)})
    
    

@login_required
def create_post(req):
    if req.method == "POST":
        body = json.loads(req.body)
        current_datetime = datetime.now()
        current_date = current_datetime.date()
        post = Post(
            caption=body["caption"],
            likes=0,
            date=current_date,
            user=req.user,
            user_name=body["userName"]
        )
        post.save()

        return JsonResponse({"post": model_to_dict(post)})
    
    posts = [model_to_dict(post) for post in Post.objects.all()]
    return JsonResponse({"posts": posts})

@login_required
def post_comment(req):
    if req.method == "POST":
        body = json.loads(req.body)
        post_with_comment = Post.objects.get(id=int(body["poster"]["id"]))
        comment = Comment(
            message = body["comment"],
            post = post_with_comment,
            user_name = body["userFullName"]
        )
        comment.save()
        return JsonResponse({"comment": model_to_dict(comment)})
    comments = [model_to_dict(comment) for comment in Comment.objects.all()]
    return JsonResponse({"comments": comments})

@login_required
def update_posts(req):
    if req.method == "POST":
        try:
            body = json.loads(req.body)
            post = Post.objects.get(id=body['id'])
            post.likes = body['likes']
            post.save()
            return JsonResponse({"post": model_to_dict(post)})  
        except Exception as e:
            return JsonResponse({"error": "This is an error message"})
        
@login_required
def get_profile(req):
    if req.method == "POST":
        
        body = json.loads(req.body)
        
        profile = Profile.objects.get(user=body["user"])
        return JsonResponse({"profile": model_to_dict(profile)})
    try:
        profile = Profile.objects.get(user=req.user)
        return JsonResponse({"profile": model_to_dict(profile)})
    except Exception as e:
        return JsonResponse({"error": "There is no profile for this user"})


@login_required
def create_profile(req):
    if req.method == "POST":
        body = json.loads(req.body)
        user_name = req.user.first_name + " " + req.user.last_name
        profile = Profile(
            user_name=user_name,
            bio=body["bio"],
            age=body["age"],
            email=req.user.email,
            user = req.user
        )
        profile.save()
        return JsonResponse({"profile": model_to_dict(profile)})
    profiles = [model_to_dict(profile) for profile in Profile.objects.all()]
    return JsonResponse({"profiles": profiles})

@login_required
def get_users_post(req):
    if req.method == "POST":
        body = json.loads(req.body)
        user_id = User.objects.get(email=body["email"])
        posts = [model_to_dict(post) for post in Post.objects.filter(user=user_id)]
        return JsonResponse({"posts": posts})

    


