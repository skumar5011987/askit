import uuid
from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.TextField()
    response_to = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="posts",
        null=True,
        blank=True,
    )
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Post by {self.author.username}"

    def is_post(self):
        return self.response_to is None

    def total_likes(self):
        return self.likes.count()