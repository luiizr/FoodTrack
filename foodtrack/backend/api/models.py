from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    activity_level = models.CharField(max_length=20, choices=[
        ('sedentary', 'Sedentário'),
        ('lightly_active', 'Levemente Ativo'),
        ('moderately_active', 'Moderadamente Ativo'),
        ('very_active', 'Muito Ativo'),
        ('extremely_active', 'Extremamente Ativo'),
    ], default='sedentary')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.user.email}"


class Food(models.Model):
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=100, blank=True, null=True)
    calories = models.DecimalField(max_digits=8, decimal_places=2)
    protein = models.DecimalField(max_digits=8, decimal_places=2)
    carbohydrates = models.DecimalField(max_digits=8, decimal_places=2)
    fat = models.DecimalField(max_digits=8, decimal_places=2)
    fiber = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sugar = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    sodium = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    serving_size = models.CharField(max_length=50, default="100g")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.brand})" if self.brand else self.name


class DailyFoodLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=8, decimal_places=2)
    meal_type = models.CharField(max_length=20, choices=[
        ('breakfast', 'Café da Manhã'),
        ('lunch', 'Almoço'),
        ('dinner', 'Jantar'),
        ('snack', 'Lanche'),
    ])
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.food.name} ({self.date})"

    @property
    def total_calories(self):
        return (self.food.calories * self.quantity) / 100

    @property
    def total_protein(self):
        return (self.food.protein * self.quantity) / 100

    @property
    def total_carbohydrates(self):
        return (self.food.carbohydrates * self.quantity) / 100

    @property
    def total_fat(self):
        return (self.food.fat * self.quantity) / 100
