from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Autenticação
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Perfil do usuário
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    
    # Alimentos
    path('foods/', views.FoodListView.as_view(), name='food-list'),
    path('foods/<int:pk>/', views.FoodDetailView.as_view(), name='food-detail'),
    path('foods/search/', views.search_food_api, name='search-food-api'),
    
    # Log de alimentos diário
    path('food-logs/', views.DailyFoodLogListView.as_view(), name='food-log-list'),
    path('food-logs/<int:pk>/', views.DailyFoodLogDetailView.as_view(), name='food-log-detail'),
    path('food-logs/summary/', views.daily_summary, name='daily-summary'),
] 