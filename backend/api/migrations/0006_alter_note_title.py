# Generated by Django 5.0.4 on 2024-04-25 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_note_author_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
