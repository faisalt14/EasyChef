import React, { useState, useEffect } from 'react';
import CreateForm from '../CreateRecipePage/CreateForm';
import RemixForm from '../RecipeRemixPage/RemixForm';
import EditRecipe from '../EditRecipe.js/EditRecipe';
import { useParams } from 'react-router-dom';

function ParentComponent({ mode }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { recipe_id } = useParams();

  useEffect(() => {
    if (mode === 'remix') {
      async function fetchRecipeData() {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe_id}`);
        const recipeData = await response.json();
        setSelectedRecipe(recipeData);
      }

      fetchRecipeData();
    }
  }, [mode, recipe_id]);

  return (
    <div>
{mode === 'remix' ? (
  <RemixForm recipe={selectedRecipe} />
) : mode === 'edit' ? (
  <EditRecipe/>
) : (
  <CreateForm initialValues={selectedRecipe} />
)}

    </div>
  );
}

export default ParentComponent;
