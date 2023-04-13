import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { useLocation } from 'react-router-dom';

function RecipeDetailView() {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { recipe_id } = useParams();
  const location = useLocation();


  useEffect(() => {
    if (location.state && location.state.scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/recipes/${recipe_id}/details/`);
        const data = await response.json();
        setRecipeDetails(data);
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipe_id]);

  return (
    <div>
      {recipeDetails ? (
        <RecipeDetails recipe={recipeDetails} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RecipeDetailView;
