# Generated by Django 2.2.9 on 2020-06-26 04:35

import database.models
from django.db import migrations
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0011_delete_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='logininfo',
            name='note',
            field=djongo.models.fields.EmbeddedField(model_container=database.models.Note, null=True),
        ),
    ]