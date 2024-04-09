from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
# Create your views here.

#lists all notes from user or creates new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)#only shows notes from their author
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)#sets author of note 
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)#only lets user delete their own notes

#generic django new user page
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #checks list of user so no duplicates
    serializer_class = UserSerializer #what data to accept to create user
    permission_classes = [AllowAny] #allows anyone to create user


