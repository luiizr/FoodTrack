from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import UserProfile, Food, DailyFoodLog


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "As senhas não coincidem."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'


class DailyFoodLogSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    food_id = serializers.IntegerField(write_only=True)
    total_calories = serializers.ReadOnlyField()
    total_protein = serializers.ReadOnlyField()
    total_carbohydrates = serializers.ReadOnlyField()
    total_fat = serializers.ReadOnlyField()

    class Meta:
        model = DailyFoodLog
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        food_id = validated_data.pop('food_id')
        try:
            food = Food.objects.get(id=food_id)
            validated_data['food'] = food
        except Food.DoesNotExist:
            raise serializers.ValidationError({"food_id": "Alimento não encontrado."})
        
        return super().create(validated_data) 