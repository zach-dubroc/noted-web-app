from django.db import models
from django.contrib.auth.models import User
from .models import Note
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")


    def __str__(self):
        return self.title
    
class NoteSerializer(serializers.ModelSerializer):
    model = Note
    fields = ["id", "title", "created_at", "author"]
    extra_kwargs = {"author", {"read_only": True}}

    #back to 37:35 
    #cmnt pr
    #git ignore virtual env/try deactivating before push