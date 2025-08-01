from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date
import requests
import json
from .models import UserProfile, Food, DailyFoodLog
from .serializers import (
    UserSerializer, UserProfileSerializer, RegisterSerializer,
    FoodSerializer, DailyFoodLogSerializer
)
from .food_api import FoodAPIService


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []
    renderer_classes = [JSONRenderer]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = []
    renderer_classes = [JSONRenderer]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': UserSerializer(user).data,
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({
                    'error': 'Credenciais inválidas'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'error': 'Username e password são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Perfil não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Perfil não encontrado'}, status=status.HTTP_404_NOT_FOUND)


class FoodListView(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Food.objects.all()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)
        return queryset


class FoodDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = (permissions.IsAuthenticated,)


class DailyFoodLogListView(generics.ListCreateAPIView):
    serializer_class = DailyFoodLogSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        date_param = self.request.query_params.get('date', None)
        
        if date_param:
            try:
                log_date = date.fromisoformat(date_param)
            except ValueError:
                log_date = timezone.now().date()
        else:
            log_date = timezone.now().date()
        
        return DailyFoodLog.objects.filter(user=user, date=log_date)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DailyFoodLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DailyFoodLogSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return DailyFoodLog.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def daily_summary(request):
    """Retorna o resumo nutricional do dia"""
    user = request.user
    date_param = request.query_params.get('date', None)
    
    if date_param:
        try:
            log_date = date.fromisoformat(date_param)
        except ValueError:
            log_date = timezone.now().date()
    else:
        log_date = timezone.now().date()
    
    food_logs = DailyFoodLog.objects.filter(user=user, date=log_date)
    
    total_calories = sum(log.total_calories for log in food_logs)
    total_protein = sum(log.total_protein for log in food_logs)
    total_carbohydrates = sum(log.total_carbohydrates for log in food_logs)
    total_fat = sum(log.total_fat for log in food_logs)
    
    meals = {
        'breakfast': [],
        'lunch': [],
        'dinner': [],
        'snack': []
    }
    
    for log in food_logs:
        meals[log.meal_type].append(DailyFoodLogSerializer(log).data)
    
    return Response({
        'date': log_date,
        'summary': {
            'total_calories': total_calories,
            'total_protein': total_protein,
            'total_carbohydrates': total_carbohydrates,
            'total_fat': total_fat,
        },
        'meals': meals
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def search_food_api(request):
    """Busca alimentos em API externa e salva no banco"""
    query = request.data.get('query', '')
    api_source = request.data.get('api_source', 'fatsecret')
    
    if not query:
        return Response({'error': 'Query é obrigatória'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Usando o serviço de API de alimentos
    food_service = FoodAPIService()
    foods_data = food_service.search_food(query, api_source)
    
    foods = []
    for food_data in foods_data:
        food, created = Food.objects.get_or_create(
            name=food_data['name'],
            brand=food_data['brand'],
            defaults=food_data
        )
        foods.append(FoodSerializer(food).data)
    
    return Response({'foods': foods})
