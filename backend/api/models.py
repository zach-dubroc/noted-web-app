from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    #defines python object to serialize to JSON
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) #add current time for each note
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") #links note to it's author
    #return title as string
    def __str__(self):
        return self.title
    

