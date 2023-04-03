import React, { useEffect, useState } from 'react';
import './CreateForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFilters from '../components/RecipeFilters';
import UploadImage from '../components/UploadImage';

function CreateForm() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDiets, setSelectedDiets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert filters to comma-separated string
    const diets = selectedDiets.map(diet => diet.value).join(', ');
    const difficulty = selectedDifficulty;
    const cuisine = selectedCuisine;
    const meal = selectedMeal;

    const recipe = {
      difficulty,
      cuisine,
      meal,
      diets,
    };

    // Send POST request to server
    const response = await fetch('/api/recipes/create-recipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      // Recipe successfully created
      console.log('Recipe created!');
    } else {
      // Error creating recipe
      console.error('Error creating recipe:', response.statusText);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12" style={{height: '3.5em', backgroundColor: '#E47E20', color:'#FFFFFF', paddingTop: '0.5rem', textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset'}}>
          <h2>Create a Recipe</h2>
          </div>
        <hr />
        <div className="col-12" style={{backgroundColor: '#efeeee'}}>
        <p className="lead fw-normal" style={{fontSize: '22px', color: '#656767', textAlign:'center'}}>
        Create your own recipe here! Show off your culinary skills and share
        your masterpiece with the world.
        </p>
        </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
      <RecipeFilters
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedMeal={selectedMeal}
          setSelectedMeal={setSelectedMeal}
          selectedDiets={selectedDiets}
          setSelectedDiets={setSelectedDiets}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </>
  );
}

export default CreateForm;