from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),#creating and listing
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),#deleting
]