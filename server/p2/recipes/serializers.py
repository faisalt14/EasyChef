from rest_framework import serializers
from .models import RecipeModel, RecipeMediaModel, StepModel, StepMediaModel, InteractionModel, ReviewMediaModel, IngredientModel
from datetime import timedelta
from django.utils import timezone
from rest_framework.validators import UniqueValidator
from django.shortcuts import get_object_or_404
from accounts.models import User

from django.contrib.auth import get_user_model
User = get_user_model()

class RecipeMediaSerializer(serializers.ModelSerializer):
    recipe_id = serializers.PrimaryKeyRelatedField(queryset=RecipeModel.objects.all(), required=False)
    class Meta:
        model = RecipeMediaModel
        fields = ['id', 'recipe_id', 'media']

class StepMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepMediaModel
        fields = ['id', 'step_id', 'media']
        extra_kwargs = {
            'media': {'required': True},
            'step_id': {'required': False}

        }
    def create(self, validated_data):
        instance = StepMediaModel.objects.create(**validated_data)
        return instance

class DurationField(serializers.Field):
    def to_representation(self, value):
        hours, remainder = divmod(value.seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return '{:02d}:{:02d}:{:02d}'.format(hours, minutes, seconds)
    
    def to_internal_value(self, value):
        if isinstance(value, str):
            hours, minutes, seconds = map(int, value.split(':'))
            return timedelta(hours=int(hours), minutes=int(minutes), seconds=int(seconds))
        return value

class StepSerializer(serializers.ModelSerializer):
    cooking_time = DurationField()
    prep_time = DurationField()
    media = StepMediaSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = StepModel
        fields = ['id', 'recipe_id', 'step_num', 'cooking_time', 'prep_time', 'instructions', 'media']
        extra_kwargs = {
            'media': {'required': False, 'allow_null': True},
            'step_num': {'required': False}
        }

class IngredientSerializer(serializers.ModelSerializer):
    recipe_id = serializers.PrimaryKeyRelatedField(queryset=RecipeModel.objects.all(), required=False)
    # quantity = serializers.IntegerField()
    name = serializers.CharField(validators=[UniqueValidator(queryset=IngredientModel.objects.all(), message='Ingredient with this name already exists.')])

    class Meta:
        model = IngredientModel
        fields = ['id', 'recipe_id', 'name', 'quantity', 'unit']
        # extra_kwargs = {
        #     'quantity': {'required': True}
        # }

class ReviewMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewMediaModel
        fields = ['id', 'interaction_id', 'media']

    def create(self, validated_data):
        instance = ReviewMediaModel.objects.create(**validated_data)
        return instance

class InteractionSerializer(serializers.ModelSerializer):
    media = ReviewMediaSerializer(many=True, read_only=False, required=False)
    like = serializers.BooleanField(required=False, default=False)
    favourite = serializers.BooleanField(required=False, default=False)
    rating = serializers.IntegerField(required=False, default=0)
    comment = serializers.CharField(required=False, allow_null=True)
    first_name = serializers.CharField(source='user_id.first_name', required=False, allow_null=True, read_only=True)
    last_name = serializers.CharField(source='user_id.last_name', required=False, allow_null=True, read_only=True)
    username = serializers.CharField(source='user_id.username', required=False, allow_null=True, read_only=True)
    avatar = serializers.CharField(source='user_id.avatar', required=False, allow_null=True, read_only=True)

    class Meta:
        model = InteractionModel
        fields = ['id', 'recipe_id', 'user_id', 'first_name', 'last_name', 'username', 'avatar', 'like', 'favourite', 'rating', 'comment', 'published_time', 'media']
    
    def create(self, validated_data, user, recipe):
        interaction = InteractionModel.objects.create()

        interaction.recipe_id = recipe
        interaction.user_id = user
        interaction.like = (bool(validated_data.get('like', '')) or validated_data.get('like', '').lower() == 'false')
        interaction.favourite = (bool(validated_data.get('favourite', '')) or validated_data.get('favourite', '').lower() == 'false')
        interaction.rating = validated_data.get('rating', 0)
        interaction.comment = validated_data.get('comment', '')
        interaction.published_time = timezone.now()
        # media_list = ', '.join(map(str, validated_data.data.get('media', [])))
        # if media_list:
        #     media_list = [int(x.strip()) for x in media_list.split(",")]

        # # Associate the media objects with the step
        # media_objects = []
        # for media_id in media_list:
        #     media = get_object_or_404(ReviewMediaModel, id=media_id)
        #     media.interaction_id = interaction
        #     media.save()
        #     media_objects.append(media) 

        interaction.save()
        recipe.update_interactions()
        return interaction
    
    def update(self, validated_data, interaction):
        recipe = interaction.recipe_id
        if validated_data.get('like'):
            interaction.like = (validated_data.get('like', '').lower() != 'false')
        if validated_data.get('favourite'):
            interaction.favourite = (validated_data.get('favourite', '').lower() != 'false')
        if validated_data.get('rating'):
            interaction.rating = validated_data.get('rating', 0)
        if validated_data.get('comment'):
            interaction.comment = validated_data.get('comment', '')
            interaction.published_time = timezone.now()
        
        interaction.save()
        recipe.update_interactions()
        return interaction

class RecipeSerializer(serializers.ModelSerializer):
    cooking_time = DurationField()
    prep_time = DurationField()
    total_time = DurationField() 
    calculated_total_time = DurationField(read_only=True) 
    calculated_prep_time = DurationField(read_only=True)
    calculated_cook_time = DurationField(read_only=True)

    media = RecipeMediaSerializer(many=True)
    steps = StepSerializer(many=True, required=True)
    ingredients = IngredientSerializer(many=True, required=True)
    interactions = InteractionSerializer(many=True, required=False)

    difficulty_choices = {
        0: 'Easy',
        1: 'Medium',
        2: 'Hard'
    }
    meal_choices = {
        0: 'Breakfast',
        1: 'Lunch',
        2: 'Dinner',
        3: 'Desserts',
        4: 'Snacks',
        5: 'Other'
    }
    diet_choices = {
        0: 'Vegan',
        1: 'Vegetarian',
        2: 'Gluten-Free',
        3: 'Halal',
        4: 'Kosher',
        5: 'None'
    }
    cuisine_choices = {
        0: 'African',
        1: 'Caribbean',
        2: 'East Asian',
        3: 'European',
        4: 'French',
        5: 'Italian',
        6: 'Middle-Eastern',
        7: 'North American',
        8: 'Oceanic',
        9: 'Russian',
        10: 'Spanish',
        11: 'South American',
        12: 'South Asian',
        13: 'Other'
    }

    name = serializers.CharField(required=True)
    chef = serializers.SerializerMethodField()
    difficulty = serializers.ChoiceField(choices=list(difficulty_choices.items()), allow_null=False)
    meal = serializers.ChoiceField(choices=list(meal_choices.items()), allow_null=False)
    diet = serializers.CharField(required=True, allow_null=False)
    cuisine = serializers.ChoiceField(choices=list(cuisine_choices.items()), required=True, allow_null=False)

    servings_num = serializers.IntegerField(required=True, allow_null=False)

    def get_chef(self, obj):
        return obj.user_id.name if obj.user_id else None

    class Meta:
        model = RecipeModel
        fields = ['id', 'user_id', 'chef', 'name', 'based_on', 'total_reviews', 'total_likes', 'total_favs', 'avg_rating', 'published_time',
                  'difficulty', 'meal', 'diet', 'cuisine', 'total_time', 'cooking_time', 'prep_time', 'calculated_total_time', 'calculated_prep_time', 'calculated_cook_time', 
                  'servings_num', 'media', 'steps', 'ingredients', 'interactions']
        extra_kwargs = {
            'media': {'write_only': True}, 
            'steps': {'write_only': True},
            'ingredients': {'write_only': True},
            'interactions': {'write_only': True},
            'name': {'required': True}
        }

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['difficulty'] = self.difficulty_choices.get(rep['difficulty'])
        rep['meal'] = self.meal_choices.get(rep['meal'])
        rep['cuisine'] = self.cuisine_choices.get(rep['cuisine'])

        if rep['diet']:
            int_values = [int(x) for x in rep['diet'].split(',') if x.strip()]
            str_values = [self.diet_choices.get(x) for x in int_values]
            rep['diet'] = ', '.join(str_values)

        return rep


class RecipesSerializer(serializers.ModelSerializer):
    media = serializers.SerializerMethodField(read_only=True)
    chef = serializers.SerializerMethodField()

    difficulty_choices = {
        0: 'Easy',
        1: 'Medium',
        2: 'Hard'
    }
    meal_choices = {
        0: 'Breakfast',
        1: 'Lunch',
        2: 'Dinner',
        3: 'Desserts',
        4: 'Snacks',
        5: 'Other'
    }
    diet_choices = {
        0: 'Vegan',
        1: 'Vegetarian',
        2: 'Gluten-Free',
        3: 'Halal',
        4: 'Kosher',
        5: 'None'
    }
    cuisine_choices = {
        0: 'African',
        1: 'Caribbean',
        2: 'East Asian',
        3: 'European',
        4: 'French',
        5: 'Italian',
        6: 'Middle-Eastern',
        7: 'North American',
        8: 'Oceanic',
        9: 'Russian',
        10: 'Spanish',
        11: 'South American',
        12: 'South Asian',
        13: 'Other'
    }

    def get_chef(self, obj):
        return obj.user_id.name if obj.user_id else None

    class Meta:
        model = RecipeModel
        fields = ['id', 'chef', 'name', 'difficulty', 'meal', 'diet', 'cuisine', 'cooking_time', 'avg_rating', 'total_reviews', 'total_likes', 'total_favs', 'media']
    
    def get_media(self, obj):
        media = obj.media.first()
        if media:
            serializer = RecipeMediaSerializer(media)
            return serializer.data['media']
        return None

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['difficulty'] = self.difficulty_choices.get(rep['difficulty'])
        rep['meal'] = self.meal_choices.get(rep['meal'])
        rep['cuisine'] = self.cuisine_choices.get(rep['cuisine'])

        if rep['diet']:
            int_values = [int(x) for x in rep['diet'].split(',') if x.strip()]
            str_values = [self.diet_choices.get(x) for x in int_values if self.diet_choices.get(x) is not None]
            rep['diet'] = ', '.join(str_values)

        return rep

# class InteractedRecipesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RecipeModel
#         fields = ['id', 'user_id', 'name', 'difficulty', 'meal', 'cuisine', 'total_reviews', 'total_likes', 'total_favs']

