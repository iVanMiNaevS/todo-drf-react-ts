from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TodoSerializer
from .models import Todo
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.

@api_view(['GET', "POST"])
def todo_list(request):
    if request.method == "GET":
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = TodoSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', "PATCH", "DELETE"])
def todo_detail(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
        print(todo)
        if request.method == "GET":
            serializer = TodoSerializer(todo)
            return Response(serializer.data)
        elif request.method == "PATCH":
            serializer = TodoSerializer(todo, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        elif request.method == "DELETE":
            todo.delete()
            return Response("delete", status=204)

    except ObjectDoesNotExist:
        return HttpResponse(status=404)
   
