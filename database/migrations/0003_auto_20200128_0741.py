# Generated by Django 2.2.9 on 2020-01-28 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0002_auto_20200128_0740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logininfo',
            name='password',
            field=models.CharField(max_length=100),
        ),
    ]
