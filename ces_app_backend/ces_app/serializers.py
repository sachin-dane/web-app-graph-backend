from rest_framework import serializers
from .models import User


class usersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
