# Generated by Django 2.2.9 on 2020-06-27 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0013_auto_20200627_1225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='logininfo',
            name='email',
            field=models.CharField(blank=True, default='c@g.com', max_length=150),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='logininfo',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
