from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import usersSerializer
from django.http import HttpResponse


class usersList(APIView):

    def get(self, request):
        queryset = User.objects.all()
        serializer = usersSerializer(queryset, many=True)
        return Response(serializer.data)
