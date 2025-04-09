from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path("auth/sign-up/", views.UserSignUpView.as_view(), name="user-sign-up"),
    path("auth/sign-in/", views.UserSignInView.as_view(), name="user-sign-in"),
    path("dashboard/", views.DashboardView.as_view(), name="dashboard"),
    path("posts/", views.PostAPIView.as_view(), name="posts"),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]