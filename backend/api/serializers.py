from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class UserSignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "confirm_password")

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in exists.")
        return value

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user

class UserSignInSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class RecursivePostSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = PostSerializer(value, context=self.context)
        return serializer.data

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    total_likes = serializers.IntegerField(read_only=True)
    is_post = serializers.BooleanField(read_only=True)
    responses = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "is_post",
            "post",
            "response_to",
            "total_likes",
            "created_at",
            "responses",
        ]
        read_only_fields = ("author", "total_likes", "is_post", "created_at", "responses")

    def get_responses(self, obj):
        # This accesses the reverse relation using `related_name='posts'`
        children = obj.posts.all()
        serializer = RecursivePostSerializer(children, many=True, context=self.context)
        return serializer.data