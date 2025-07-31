from django.contrib import admin
from .models import UserProfile, Food, DailyFoodLog


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'birth_date', 'weight', 'height', 'activity_level')
    list_filter = ('activity_level', 'created_at')
    search_fields = ('user__username', 'user__email')


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'calories', 'protein', 'carbohydrates', 'fat')
    list_filter = ('created_at',)
    search_fields = ('name', 'brand')
    ordering = ('name',)


@admin.register(DailyFoodLog)
class DailyFoodLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'food', 'quantity', 'meal_type', 'date')
    list_filter = ('meal_type', 'date', 'created_at')
    search_fields = ('user__username', 'food__name')
    date_hierarchy = 'date'
