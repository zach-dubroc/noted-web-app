from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

from rest_framework.decorators import api_view
from rest_framework.response import Response




# Create your views here.

#lists all notes from user or creates new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.id
        return Note.objects.filter(author_id=user)#only shows notes from their author
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            author_id = self.request.user.id
            author_instance = User.objects.get(id=author_id)
            author_name = author_instance.username
            serializer.save(author_id=author_instance, author_name=author_name)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author_id=user)#only lets user delete their own notes

#generic django new user page
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() 
    serializer_class = UserSerializer 
    permission_classes = [AllowAny] 


    

class GetUser(generics.RetrieveAPIView):
        serializer_class = UserSerializer
        permission_classes = [IsAuthenticated]

        def get_object(self):
            return self.request.user
        

class GetUserEmail(generics.RetrieveAPIView):
        serializer_class = UserSerializer
        permission_classes = [IsAuthenticated]

        def get_object(self):
            return self.request.user.get_email_field_name()