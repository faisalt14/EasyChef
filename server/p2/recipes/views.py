import json
from datetime import timedelta
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from rest_framework.exceptions import APIException
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, CreateAPIView, ListAPIView, DestroyAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.db import transaction

from recipes.models import RecipeModel, IngredientModel, StepModel, StepMediaModel, RecipeMediaModel, InteractionModel, ReviewMediaModel
from recipes.serializers import RecipesSerializer, RecipeSerializer, IngredientSerializer, StepSerializer, RecipeMediaSerializer, StepMediaSerializer, ReviewMediaSerializer, InteractionSerializer
from accounts.models import User
from accounts.serializers import UserDetailSerializer
from rest_framework.permissions import AllowAny

# Create your views here.


class AllRecipes(ListAPIView):
    serializer_class = RecipesSerializer

    def get_queryset(self):
        return RecipeModel.objects.all()


class PopularRecipes(ListAPIView):
    serializer_class = RecipesSerializer

    def get_queryset(self):
        options = ['total_reviews', 'total_likes', 'total_favs']
        if self.kwargs['filter'] not in options:
            # return Response(
            #     {
            #         'Error': 'Not a valid filter. Please select a filter from the following list',
            #         'Possible Values': options
            #     }
            # )
            raise APIException("Not a valid filter. Please select a filter from the following list: "
                               "['total_reviews', 'total_likes', 'total_favs']")
        else:
            return RecipeModel.objects.all().order_by('-' + self.kwargs['filter'])

class RemixRecipeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RecipeSerializer

    def post(self, request, *args, **kwargs):

        # Get the original recipe
        original_recipe = get_object_or_404(RecipeModel, id=kwargs['recipe_id'])

        # Create a new recipe instance
        new_recipe = RecipeModel()

        # Update the new recipe instance with values from the original recipe and user input
        for key, value in original_recipe.__dict__.items():
            if key not in ["_state", "id"]:
                setattr(new_recipe, key, value)

        new_recipe.id = None
        new_recipe.pk = None
        new_recipe.user_id = request.user
        new_recipe.based_on = original_recipe
        new_recipe.published_time = timezone.now()
        new_recipe.save()

        # Copy over foreign key relations for StepModel
        new_steps = []

        for step in original_recipe.steps.all():
            new_step = StepModel(recipe_id=new_recipe, step_num=step.step_num, cooking_time = step.cooking_time, prep_time= step.prep_time, instructions= step.instructions)
            new_step.save()
            new_steps.append(new_step)

        new_recipe.steps.set(new_steps)

        # Copy over foreign key relations for IngredientModel
        new_ingredients = []
        for ingredient in original_recipe.ingredients.all():
            new_ingredient = IngredientModel(recipe_id=new_recipe, name=ingredient.name, quantity=ingredient.quantity, unit=ingredient.unit)
            new_ingredient.save()
            new_ingredients.append(new_ingredient)
        new_recipe.ingredients.set(new_ingredients)

        # Copy over foreign key relations for RecipeMediaModel
        new_medias = []
        for item in original_recipe.media.all():
            new_media = RecipeMediaModel(recipe_id=new_recipe, media=item.media)
            new_media.save()
            new_medias.append(new_media)
        new_recipe.media.set(new_medias)

        # Update the new recipe instance with values from user input
        for key, value in request.data.items():
            if key == "steps":
                steps_list = [int(x.strip()) for x in value.split(",")]
                step_ids = []
                # Create Step instances
                total_cook = timedelta(hours=0, minutes=0)
                total_prep = timedelta(hours=0, minutes=0)

                for index, step_id in enumerate(steps_list):
                    base_step = get_object_or_404(StepModel, id=step_id)
                    total_cook += base_step.cooking_time
                    total_prep += base_step.prep_time
                    base_step.recipe_id = new_recipe
                    base_step.step_num = index + 1
                    base_step.save()
                    step_ids.append(base_step)
                new_recipe.calculated_prep_time = total_prep
                new_recipe.calculated_cooking_time = total_cook
                new_recipe.steps.set(step_ids)
                new_recipe.save()

            if key == "ingredients":     
                ingredients_list = json.loads(value)
                print(ingredients_list)
                ingredient_ids = []
                # Create Ingredient instances
                for ingredient_id, data in ingredients_list.items():
                    quantity = data[0]
                    unit = data[1]
                    ingredient_base = get_object_or_404(IngredientModel, id=ingredient_id)
                    copied_ingredient = IngredientModel()
                    copied_ingredient.recipe_id = new_recipe
                    # copied_ingredient.name 
                    copied_ingredient.quantity = quantity
                    #copied_ingredient.quantity = int(int(ingredient_base.quantity) / int(original_recipe.servings_num) * int(new_recipe.servings_num))

                    copied_ingredient.unit = unit
                    copied_ingredient.save()

                    ingredient_ids.append(copied_ingredient)

                new_recipe.ingredients.set(ingredient_ids)
                new_recipe.save()

            if key == "media":
                media_list = [int(x.strip()) for x in value.split(",")]
                media_ids = []
                # Create Media instances
                for media_data in media_list:
                    media_base = get_object_or_404(RecipeMediaModel, id=media_data)
                    media_base.recipe_id = new_recipe
                    media_base.save()
                    media_ids.append(media_base)
                new_recipe.media.set(media_ids)
                new_recipe.save()

            if key in ['cooking_time', 'prep_time']:
                if isinstance(value, str):
                    hours, minutes, seconds = map(int, value.split(":"))
                    delta = timedelta(hours=int(hours), minutes=int(minutes), seconds=int(seconds))
                else:
                    delta = value

            if key not in ["steps", "ingredients", "media", 'cooking_time', 'prep_time']:
                setattr(new_recipe, key, value)

        # Save the new recipe instance
        setattr(new_recipe, 'total_favs', 0)
        setattr(new_recipe, 'total_likes', 0)
        setattr(new_recipe, 'total_reviews', 0)
        setattr(new_recipe, 'avg_rating', 0)

        new_recipe.save()

        # Return the new recipe data
        response_data = RecipeSerializer(new_recipe).data
        return Response(response_data)

class CreateRecipeView(CreateAPIView):
    # To create a recipe, send a POST request to /recipes/create-recipe/.
    # To update a recipe with ID 123, send a PUT or PATCH request to /recipes/123/.

    permission_classes = [IsAuthenticated]
    queryset = RecipeModel.objects.all()
    serializer_class = RecipeSerializer

    def create(self, request, *args, **kwargs):
        step_ids = []
        ingredient_ids = []
        media_ids = []

        print("requesting data", request.data)

        steps_list = request.data.get('steps', '')
        ingredients_list = request.data.get('ingredients', '')
        media_list = request.data.get('media', '')

        print("requesting medis",media_list)
        print("requesting ings", ingredients_list)
        print("requesting steps", steps_list)


        if steps_list:
            steps_list = [int(x.strip()) for x in steps_list.split(",")]
        if ingredients_list:
            ingredients_list = json.loads(ingredients_list)
            # ingredients_list = [int(x.strip()) for x in ingredients_list.split(",")]
        if media_list:
            media_list = [int(x.strip()) for x in media_list.split(",")]
        
        recipe_data = request.data.copy()
        recipe_data['published_time'] = timezone.now()

        # Set default values for the fields 
        required_fields = ['cooking_time', 'prep_time', 'name', 'diet', 'cuisine', 'servings_num', 'steps', 'ingredients']
        errors = []
        for field in required_fields:
            if request.data.get(field, '') == '':
                errors.append(f"{field} is required.")

        # Return errors if any required fields are empty
        if errors:
            error_message = " ".join(errors)
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)


        recipe_serializer = RecipeSerializer(data=recipe_data, partial=True)
        recipe_serializer.is_valid(raise_exception=True)
        recipe = recipe_serializer.save()

        # # Create Step instances
        total_cook = timedelta(hours=0, minutes=0)
        total_prep = timedelta(hours=0, minutes=0)
        for index, step_id in enumerate(steps_list):
            base_step = get_object_or_404(StepModel, id=step_id)
            total_cook += base_step.cooking_time
            total_prep += base_step.prep_time
            base_step.recipe_id = recipe
            base_step.step_num = index + 1
            base_step.save()
            step_ids.append(base_step)
            
        # # Create Ingredient instances
        for ingredient_id, ingredient_data in ingredients_list.items():
            ingredient_base = get_object_or_404(IngredientModel, id=int(ingredient_id))

            # make a copy of the base ingredient - base ingredient has null
            copied_ingredient = IngredientModel()
            copied_ingredient.name = ingredient_base.name
            copied_ingredient.recipe_id = recipe
            copied_ingredient.quantity = ingredient_data[0]
            copied_ingredient.unit = ingredient_data[1]
            copied_ingredient.save()
            ingredient_ids.append(copied_ingredient)

        # # Create Media instances
        for media_data in media_list:
            media_base = get_object_or_404(RecipeMediaModel, id=media_data)
            media_base.recipe_id = recipe
            media_base.save()
            media_ids.append(media_base)
        
        # Create Recipe instance
        recipe.steps.set(step_ids)
        recipe.ingredients.set(ingredient_ids)
        recipe.media.set(media_ids)
        recipe.calculated_prep_time = total_prep
        recipe.calculated_cook_time = total_cook
        # we need to calculate the total cooking time, prep_time

        user = self.request.user
        recipe = recipe_serializer.save(user_id=user)
        recipe.chef = user.name
        recipe.save()
                
        return Response(recipe_serializer.data, status=status.HTTP_201_CREATED)

class RecipeUpdateView(UpdateAPIView):
    queryset = RecipeModel.objects.all()
    serializer_class = RecipeSerializer

    def patch(self, request, *args, **kwargs):
        recipe = get_object_or_404(RecipeModel, id=kwargs['recipe_id'])

        # Check if the authenticated user is the owner of the recipe
        if request.user != recipe.user_id:
            return Response({'message': 'You do not have permission to edit this recipe.'}, status=403)

        # Set default values for the fields 
        required_fields = ['cooking_time', 'prep_time', 'name', 'diet', 'cuisine', 'servings_num', 'steps', 'ingredients']
        errors = []
        for field in required_fields:
            if field in request.data and request.data.get(field, '') == '':
                errors.append(f"{field} is required.")

        # Return errors if any required fields are empty
        if errors:
            error_message = " ".join(errors)
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)


        step_ids = []
        ingredient_ids = []
        media_ids = []

        steps_list = request.data.get('steps', '')
        ingredients_list = request.data.get('ingredients', '')
        media_list = request.data.get('media', '')

        if steps_list:
            steps_list = [int(x.strip()) for x in steps_list.split(",")]
        if ingredients_list:
            ingredients_list = json.loads(ingredients_list)
        if media_list:
            media_list = [int(x.strip()) for x in media_list.split(",")]

        if steps_list:
            existing_step_ids = list(recipe.steps.values_list('id', flat=True))
            new_step_ids = [step_id for step_id in steps_list if step_id not in existing_step_ids]
            removed_step_ids = [step_id for step_id in existing_step_ids if step_id not in steps_list]

            total_cook = timedelta(hours=0, minutes=0)
            total_prep = timedelta(hours=0, minutes=0)

            existing_steps = StepModel.objects.filter(id__in=existing_step_ids)
            existing_step_nums = [step.step_num for step in existing_steps]

            for step_id in existing_step_ids:
                step = get_object_or_404(StepModel, id=step_id)
                step.step_num = existing_step_nums.pop(0)
                step.recipe_id = recipe
                total_cook += step.cooking_time
                total_prep += step.prep_time
                step.save()
                step_ids.append(step)


            for step_id in removed_step_ids:
                step = get_object_or_404(StepModel, id=step_id)
                step.delete()

            new_steps = []
            for index, step_id in enumerate(new_step_ids):
                step = get_object_or_404(StepModel, id=step_id)
                step.step_num = len(existing_step_ids) + index + 1
                total_cook += step.cooking_time
                total_prep += step.prep_time
                step.recipe_id = recipe
                step.save()
                step_ids.append(step)

            recipe.calculated_prep_time = total_prep
            recipe.calculated_cook_time = total_cook
            recipe.calculated_total_time = total_cook + total_prep
            recipe.steps.set(step_ids)

            
        # Update Media instances
        if media_list:
            existing_media_ids = list(recipe.media.values_list('id', flat=True))
            new_media_ids = [media_id for media_id in media_list if media_id not in existing_media_ids]
            removed_media_ids = [media_id for media_id in existing_media_ids if media_id not in media_list]

            for items in media_list:
                media = get_object_or_404(RecipeMediaModel, id=items)
                media.recipe_id = recipe
                media.save()
                media_ids.append(media)

            # Remove old media that are not in the new media list
            for media_id in removed_media_ids:
                media = get_object_or_404(RecipeMediaModel, id=media_id)
                media.delete()

            recipe.media.set(media_ids)

        # Update Ingredient instances
        if ingredients_list:
            # Get existing child ingredients and create a mapping of their names
            existing_child_ingredients = recipe.ingredients.all()
            name_to_child_map = {ing.name: ing for ing in existing_child_ingredients}
            # Update child Ingredient instances or create new ones
            for ingredient_id, ingredient_data in ingredients_list.items():
                ingredient_base = get_object_or_404(IngredientModel, id=int(ingredient_id))

                # If there is an existing child ingredient with the same name, update it
                if ingredient_base.name in name_to_child_map:
                    child_ingredient = name_to_child_map[ingredient_base.name]
                    child_ingredient.quantity = ingredient_data[0]
                    child_ingredient.unit = ingredient_data[1]
                    child_ingredient.save()
                    ingredient_ids.append(child_ingredient)
                else:
                    # Make a copy of the base ingredient
                    copied_ingredient = IngredientModel()
                    copied_ingredient.name = ingredient_base.name
                    copied_ingredient.recipe_id = recipe
                    copied_ingredient.quantity = ingredient_data[0]
                    copied_ingredient.unit = ingredient_data[1]
                    copied_ingredient.save()
                    ingredient_ids.append(copied_ingredient)


            # Remove old child ingredients that are not in the new ingredients list
            removed_child_ingredients = [ing for ing in existing_child_ingredients if ing not in ingredient_ids]
            for ing in removed_child_ingredients:
                ing.delete()
            recipe.ingredients.set(ingredient_ids)


        # Save the recipe instance
        recipe.published_time = timezone.now()
        recipe.save()
        serializer = self.get_serializer(recipe, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateStepView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        media_list = ', '.join(map(str, request.data.get('media', [])))
        if media_list:
            media_list = [int(x.strip()) for x in media_list.split(",")]

        cook = request.data['cooking_time']
        prep = request.data['prep_time']

        if isinstance(cook, str):
            hours, minutes, seconds = map(int, cook.split(':'))
            cook = timedelta(hours=int(hours), minutes=int(minutes), seconds=int(seconds))

        if isinstance(prep, str):
            hours, minutes, seconds = map(int, prep.split(':'))
            prep = timedelta(hours=int(hours), minutes=int(minutes), seconds=int(seconds))

        step = StepModel.objects.create(cooking_time=cook, prep_time=prep,
                                         instructions=request.data['instructions'])

        # Associate the media objects with the step
        media_objects = []
        for media_id in media_list:
            media = get_object_or_404(StepMediaModel, id=media_id)
            media.step_id = step
            media.save()
            media_objects.append(media)
        # if media_list:
        #     StepMediaModel.objects.bulk_update(media_objects, ['step_id'])
        step.refresh_from_db()
        serializer_data = StepSerializer(step)

        return Response(serializer_data.data, status=status.HTTP_201_CREATED)

class AddRecipeMedia(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = StepMediaModel.objects.all()
    serializer_class = RecipeMediaSerializer
    parser_classes = [MultiPartParser]  # Add this line

    def perform_create(self, serializer):
        serializer.save()
        return serializer.data


class AddStepMedia(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StepMediaSerializer
    parser_classes = [MultiPartParser, FormParser]  # Add this line

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CreateIngredientView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IngredientSerializer
    
    def perform_create(self, serializer):
        name = serializer.validated_data.get('name')
        if IngredientModel.objects.filter(name=name).exists():
            return Response({'message': 'Ingredient with this name already exists.'})
        serializer.save()
        return serializer.data

class RecipeDetailView(RetrieveAPIView):
    serializer_class = RecipeSerializer
    queryset = RecipeModel.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]
    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.kwargs['recipe_id'])
        return obj

class DeleteRecipe(DestroyAPIView):
    # handles DELETE requests
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        recipe = get_object_or_404(RecipeModel, id=kwargs['recipe_id'])

        # Check if the authenticated user is the owner of the recipe
        if request.user != recipe.user_id:
            return Response({'message': 'You do not have permission to delete this recipe.'}, status=403)

        recipe.delete()
        return Response({'message': 'Recipe has been deleted.'}, status=204)

class AddInteractionMedia(CreateAPIView):
    serializer_class = ReviewMediaSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # Add this line

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        # Get the interaction, if it exists
        interaction = get_object_or_404(InteractionModel, id=self.kwargs['interaction_id'])
        try:
            # Attempt to create a new ReviewMediaModel
            review_media = ReviewMediaModel.objects.create(interaction_id=interaction, media=request.FILES['media'])
        except:
            # If the above attempt is unsuccessful, respond with error
            return Response({'message': 'invalid upload'}, status=400)
        # If a new ReviewMediaModel was created, save it in our database and return
        review_media.save()
        return Response(ReviewMediaSerializer(review_media).data, status=200)


class InteractionView(RetrieveUpdateAPIView):
    serializer_class = InteractionSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        recipe = get_object_or_404(RecipeModel, id=self.kwargs['recipe_id'])
        return get_object_or_404(InteractionModel, user_id=user, recipe_id=recipe)

    def get(self, request, *args, **kwargs):
        interaction = self.get_object()
        serializer = self.serializer_class(interaction)
        return Response(serializer.data, status=200)
   
    @transaction.atomic
    def post(self, request, *args, **kwargs):
        serializer = InteractionSerializer(data=request.data)
        try:
            # Check if there already exists an InteractionModel between the user and the recipe
            interaction = InteractionModel.objects.get(user_id=request.user, recipe_id=self.kwargs['recipe_id'])
        except:
            # If no such InteractionModel exists, create a new one
            serializer.is_valid(raise_exception=True)
            interaction = serializer.create(request.data, request.user, get_object_or_404(RecipeModel, id=self.kwargs['recipe_id']))
            return Response(InteractionSerializer(interaction).data, status=200)
        return Response({'message': 'There already exists an interaction between this user and the recipe. Use a PATCH request instead.'}, status=400)

    def patch(self, request, *args, **kwargs):
        serializer = InteractionSerializer(data=request.data)
        try:
            # Check if there already exists an InteractionModel between the user and the recipe
            interaction = InteractionModel.objects.get(user_id=request.user, recipe_id=self.kwargs['recipe_id'])
        except:
            # If no InteractionModel exists, return with information
            return Response({'message': 'There is no interaction between this user and the recipe. Use a POST request instead.'}, status=400)
        # If an InteractionModel does exist, update its data instead of making a new one
        serializer.is_valid(raise_exception=True)
        serializer.update(request.data, interaction)
        return Response(InteractionSerializer(interaction).data, status=200)
    
    # I can update my vote
    # mark/unmark a recipe as fav
    # post a comment
    # this should update the recipe fields
    # I can change the servings (this should create a ShoppingListModel)

    

class SearchView(ListAPIView):
    serializer_class = RecipesSerializer
    
    def get_queryset(self):

        # Create the base search results based on simple dropdown filters
        search_results = RecipeModel.objects.filter(cuisine=int(self.request.query_params.get('cuisine', 13))).distinct() if (int(self.request.query_params.get('cuisine', 14)) < 14) else RecipeModel.objects.all()
        search_results = search_results.filter(meal=int(self.request.query_params.get('meal', 5))).distinct() if (int(self.request.query_params.get('meal', 6)) < 6) else search_results
        diet_filter = [int(d) for d in self.request.query_params.get('diet', '6').split(',')]
        if (len(diet_filter) > 0 and 6 not in diet_filter):
            for recipe in search_results:
                recipe_diets = recipe.get_diet_list()
                check = [n for n in diet_filter if n in recipe_diets]
                if (check != diet_filter):
                    search_results = search_results.exclude(id=recipe.id)
                        
        
        # Check for the search query based on the search category
        category = self.request.query_params.get('category', '')
        query = self.request.query_params.get('query', '')
        if category == 'Recipe':
            search_results = search_results.filter(name__icontains=query).distinct()
        elif category == 'Ingredients':
            search_results = search_results.filter(ingredients__name__icontains=query).distinct()
        elif category == 'User':
            search_results = search_results.filter(user_id__username__icontains=query).distinct()
        else:
            raise APIException("Not a valid search category. Please select a category from the following list: "
                               "['Recipe', 'Ingredients', 'User']")

        try:
            cooking_time = int(self.request.query_params.get('cooking_time', 0))
        except:
            raise APIException("Not a valid cooking time filter. Please select a cooking from the following list by inputting its number: "
                               "[0: None, 1: Less than 10 minutes, 2: Between 10 and 30 minutes, 3: Between 30 and 60 minutes, 4: One hour or longer]")
        # Filter by cooking time filter
        # match case would probably work better here
        if cooking_time == 0:
            return search_results
        elif cooking_time == 1:
            return search_results.filter(cooking_time__lte=timedelta(minutes=10)).distinct()
        elif cooking_time == 2:
            return search_results.filter(cooking_time__lte=timedelta(minutes=30), cooking_time__gte=timedelta(minutes=10)).distinct()
        elif cooking_time == 3:
            return search_results.filter(cooking_time__lte=timedelta(minutes=60), cooking_time__gte=timedelta(minutes=30)).distinct()
        else:
            return search_results.filter(cooking_time__gte=timedelta(minutes=60)).distinct()

class HomeView(APIView):
    serializer_class = RecipesSerializer

    def get(self, request):
        PopularSet = RecipeModel.objects.all().order_by('-total_reviews')[:6]
        BreakfastSet = RecipeModel.objects.filter(meal=0).order_by('total_favs')[:3]
        LunchSet = RecipeModel.objects.filter(meal=1).order_by('total_favs')[:3]
        DinnerSet = RecipeModel.objects.filter(meal=2).order_by('total_favs')[:3]
        return Response({'Popular' : RecipesSerializer(PopularSet, many=True).data,
                         'Breakfasts' : RecipesSerializer(BreakfastSet, many=True).data,
                         'Lunches': RecipesSerializer(LunchSet, many=True).data,
                         'Dinners': RecipesSerializer(DinnerSet, many=True).data})

class AutocompleteView(ListAPIView):
    serializer_class = IngredientSerializer

    def get_queryset(self):
        # Get values from params, default will be 0
        category = int(self.request.query_params.get('category', '0'))
        search_query = self.request.query_params.get('query', '')
        # Set up serializers and querysets based on category, default is the IngredientModel
        if category == 1:
            self.serializer_class = RecipesSerializer
            queryset = RecipeModel.objects.all()
        elif category == 2:
            self.serializer_class = UserDetailSerializer
            queryset = User.objects.all()
            queryset = queryset.filter(username__icontains=search_query)
        else:
            queryset = IngredientModel.objects.filter(recipe_id=None)

        if search_query and category != 2:
            queryset = queryset.filter(name__icontains=search_query)

        return queryset
