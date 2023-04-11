import React, { useState, useEffect } from 'react';
import CreateForm from '../CreateRecipePage/CreateForm'
import { useParams } from 'react-router-dom';

function RemixForm() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { recipe_id } = useParams(); // Get the recipe ID from the URL parameter
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTk0MzE4LCJpYXQiOjE2ODExOTA3MTgsImp0aSI6IjBlYjk2ODJmNGU4MDQ4ZWVhOTg3Nzg2MWVlZDgyNWQ2IiwidXNlcl9pZCI6Mn0.mk0f0S2g1p2gi7GAt1-sBCagIB6pWrZu4msCDWjy2CU";
  useEffect(() => {
    // Only fetch data if recipeId is available
    if (recipe_id) {
      async function fetchRecipeData() {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');
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

      fetchRecipeData();
    }
  }, [recipe_id]);

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
      <h2>Remix Recipe: {selectedRecipe.name}</h2>
      <CreateForm initialValues={selectedRecipe} />
      </>)}
    </div>
  );
}

export default RemixForm;