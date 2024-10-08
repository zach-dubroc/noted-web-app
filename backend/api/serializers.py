from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
#ORM object relational mapping
#takes python object --> json data and vice/versa

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User #rep a django built user
        fields = ["id", "username", "password", "email"] #fields to serialize
        extra_kwargs = {"password": {"write_only": True}} #accepts password but doesn't return it
        #if serialized data is valid, will be passed and and we can create user
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    



class NoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author_id", "author_name"]
        extra_kwargs = {"author_id": {"read_only": True}, "author_name": {"read_only": True}}


