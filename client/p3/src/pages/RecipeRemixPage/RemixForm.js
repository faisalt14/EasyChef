import React, { useState, useEffect } from 'react';
import CreateForm from '../CreateRecipePage/CreateForm'
import { useParams } from 'react-router-dom';

function RemixForm() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { recipe_id } = useParams(); // Get the recipe ID from the URL parameter
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjk5OTMzLCJpYXQiOjE2ODEyOTYzMzMsImp0aSI6ImU4ZGNlOTE2MzY2ZjQ0OWFiMzMxNTgwYzNjY2I2YjQ5IiwidXNlcl9pZCI6Mn0.-DStPJra41-opP2COLzno3gB6MdK8sqpcLhCeKImeuU";
  async function fetchRecipeData() {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe_id}/details/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      const recipeData = await response.json();
      setSelectedRecipe(recipeData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (recipe_id) {
      fetchRecipeData();
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pass recipe data to CreateForm component
  return (
    <div>
      {selectedRecipe && (<>
      {/* <h2>Remix Recipe: {selectedRecipe.name}</h2> */}
      <CreateForm initialValues={selectedRecipe} name="Remix" method_name="Remix" />
      </>)}
    </div>
  );
}

export default RemixForm;