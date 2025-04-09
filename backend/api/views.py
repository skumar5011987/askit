from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Count
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from .serializers import UserSerializer, UserSignUpSerializer, UserSignInSerializer, PostSerializer
from.models import Post


class UserSignUpView(generics.CreateAPIView):
    """ Handle User Sign-up"""
    users = User.objects.all()
    serializer_class = UserSignUpSerializer


class UserSignInView(APIView):
    """Handle user Sign-in"""
    serializer_class = UserSignInSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user=user)
            user_serializer = UserSerializer(user)
            data = {
                "message": "ok",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": user_serializer.data
            }

            return Response(data, status=status.HTTP_200_OK)

        return Response(
            {"message": "Invalid credentials."},
            status=status.HTTP_401_UNAUTHORIZED
        )


class DashboardView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_serializer = UserSerializer(request.user)
        return Response({
            "message": "Welcome to Askit",
            "user": user_serializer.data
        }, status=200)

class PostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        posts = Post.objects.filter(response_to=None)
        if request.query_params.get('mine')=="true":
            posts = posts.filter(author=request.user)

        posts = posts.annotate(num_likes=Count('likes')).order_by('-num_likes', '-created_at')
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PostSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        post_id = request.data.get('response_to') or None
        if not post_id:
            return Response({"error": "Post_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        # Like or Unlike post
        if user in post.likes.all():
            post.likes.remove(user)
            liked = False
        else:
            post.likes.add(user)
            liked = True

        data = {
            "post_id": str(post.id),
            "liked": liked,
            "total_likes": post.likes.count(),
            "liked_by": post.likes.values_list('username', flat=True),
        }

        return Response(data, status=status.HTTP_200_OK)

