from django.db import models
from django.contrib.auth.models import User

#seperate the user, or use a condition to render only the user name if no notes are created

class Note(models.Model):
    #defines python object to serialize to JSON
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    #CASCADE on_delete if relation is one to many, so if a user is deleted, their notes are also deleted
    author_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") #links note to it's author
    author_name = models.CharField(max_length=150, blank=True)
    #return title as string
    def __str__(self):
        return self.title
    
    
    def save(self, *args, **kwargs):
        if not self.author_name:
            self.author_name = self.author_id.username
        super().save(*args, **kwargs)