from django.db import models
from rest_framework import serializers
from accounts.models import User, ShoppingRecipeModel
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from django.core.exceptions import ValidationError

from recipes.models import RecipeModel


class UserDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_num', 'avatar']
        extra_kwargs = {
            'username': {'required': True},
            'password': {'write_only': True, 'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data.get('username'),
                                        password=validated_data.get('password'),
                                        email=validated_data.get('email', ''),
                                        first_name=validated_data.get('first_name', ''),
                                        last_name=validated_data.get('last_name', ''),
                                        phone_num=validated_data.get('phone_num', ''))
        user.save()
        return user

class UserDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

class UserLoginSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class UserEditSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(allow_null=True, allow_blank=True)
    
    def validate_password(self, data):
        if self.initial_data.get('password') != self.initial_data.get('password2'):
            raise ValidationError('Passwords do not match')

    class Meta:
        model = User
        fields = ['password', 'email', 'first_name', 'last_name', 'phone_num', 'avatar', 'password2']
        extra_kwargs = {
            'password': {'required': False},
        }


class ShoppingRecipeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingRecipeModel
        fields = ['user_id', 'recipe_id', 'servings_num']
    def create(self):
        recipe = ShoppingRecipeModel.objects.create(user_id=get_object_or_404(User, id=self.data.get('user_id')),
                                                    recipe_id=get_object_or_404(RecipeModel, id=self.data.get('recipe_id')),
                                                    servings_num=self.data.get('servings_num'))
        recipe.save()
        return Response({'message': 'success'}, status=200)