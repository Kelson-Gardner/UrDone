from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse

# Create your views here.
def sign_up(req):
    if req.method == "POST":
        if req.POST.get("first_name") == "":
            return render(req, "registration/sign_up.html", {"first_name_error": "ERROR: ENTER YOUR FIRST NAME"})
        
        if req.POST.get("last_name") == "":
            return render(req, "registration/sign_up.html", {"last_name_error": "ERROR: ENTER YOUR LAST NAME"})
        
        if req.POST.get("email") == "":
            return render(req, "registration/sign_up.html", {"email_error": "ERROR: ENTER A VALID EMAIL/USERNAME"})
        
        if User.objects.filter(email=req.POST.get("email")).exists():
            return render(req, "registration/sign_up.html", {"email_exists_error": "ERROR: EMAIL ALREADY IN USE"})
        
        if req.POST.get("password") == "":
            return render(req, "registration/sign_up.html", {"password_error": "ERROR: ENTER A PASSWORD"})
        

        user = User.objects.create_user(
            username=req.POST.get("email"),
            password=req.POST.get("password"),
            email=req.POST.get("email"),
            first_name=req.POST.get("first_name"),
            last_name=req.POST.get("last_name")
        )
        login(req, user)
        return redirect("/")
    else:
        return render(req, "registration/sign_up.html")

def sign_in(req):
    if req.method == "POST":
        if req.POST.get("email") == "" or authenticate(req, username=req.POST.get("email"), password=req.POST.get("password")) == None:
            return render(req, "registration/sign_in.html", {"email_error": "ERROR: ENTER A VALID EMAIL/USERNAME"})
        
        if req.POST.get("password") == "":
            return render(req, "registration/sign_in.html", {"password_error": "ERROR: ENTER A PASSWORD"})
        
        user = authenticate(req, username=req.POST.get("email"), password=req.POST.get("password"))
        if user is not None:
            login(req, user)
            return redirect("/")

        return render(req, "registration/sign_in.html")
    else:
        return render(req, "registration/sign_in.html")

def logout_view(request):
    logout(request)
    return JsonResponse({"success": True })