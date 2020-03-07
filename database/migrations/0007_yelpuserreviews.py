# Generated by Django 2.2.9 on 2020-03-07 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0006_yelpdata'),
    ]

    operations = [
        migrations.CreateModel(
            name='YelpUserReviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200)),
                ('experience', models.CharField(max_length=200)),
                ('experiencesuggested', models.BooleanField(default=True)),
                ('restaurant', models.CharField(max_length=200)),
                ('restaurantsuggested', models.BooleanField(default=True)),
                ('rating', models.IntegerField()),
            ],
        ),
    ]