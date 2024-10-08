
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, GetUser, GetUserEmail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#urls
urlpatterns = [
    path('admin/', include('admin_honeypot.urls', namespace='admin_honeypot')),
    path('patron/', admin.site.urls), 
    path("api/user/register/", CreateUserView.as_view(), name="register"), #links register view
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), #links token obtain view
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), #links token refresh view
    path("api/current_user/",GetUser.as_view(), name="current_user"),
    path("api/current_email/",GetUserEmail.as_view(), name="current_user"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls"))
]


