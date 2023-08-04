# Generated by Django 2.2.3 on 2019-07-29 21:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chatbot', '0005_auto_20190729_2223'),
    ]

    operations = [
        migrations.RenameField(
            model_name='action',
            old_name='name',
            new_name='portfolio',
        ),
        migrations.AddField(
            model_name='action',
            name='chatbot_change',
            field=models.DecimalField(decimal_places=2, max_digits=6, null=True),
        ),
        migrations.AddField(
            model_name='action',
            name='newspost_change',
            field=models.DecimalField(decimal_places=2, max_digits=6, null=True),
        ),
        migrations.CreateModel(
            name='Month',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(default=1)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Month',
                'verbose_name_plural': 'Months',
            },
        ),
    ]