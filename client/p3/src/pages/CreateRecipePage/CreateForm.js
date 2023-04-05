import React, { useEffect, useState } from 'react';
import './CreateForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFilters from '../../components/CreateRecipe/RecipeFilters';
import UploadImage from '../../components/CreateRecipe/UploadImage';
import PrepCookTime from '../../components/CreateRecipe/PrepCookTime';
import axios from 'axios';
import Ingredients from '../../components/CreateRecipe/Ingredients';
import AddStep from '../../components/CreateRecipe/AddStep';
import Meal from '../../components/Filters/Meal';

const baseURL = "http://127.0.0.1:8000/recipes/create-recipe/";


function CreateForm() {
  const [post, setPost] = useState(null);
  const [selectedName, setName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedPrepTime, setPrepTime] = useState({ hours: 0, minutes: 0 });
  const [selectedCookTime, setCookTime] = useState({ hours: 0, minutes: 0 });
  const [selectImages, setImages] = useState([]);
  const [ingredient_dic, setIngredient_dic] = useState({});

  // const handleAddIngredient = (newIngredient) => {
  //   setIngredients([...ingredients, newIngredient]);
  // };

  // const handleRemoveIngredient = (indexToRemove) => {
  //   setIngredients(ingredients.filter((ingredient, index) => index !== indexToRemove));
  // };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNjcxOTMzLCJpYXQiOjE2ODA2NjgzMzMsImp0aSI6IjYzMmU3ODM3YjAxODRlYzBhN2RjMDg1ZjAxNWIxMmI3IiwidXNlcl9pZCI6Mn0.SBtsLGqnTWiqb60dP0G6OXpNbOHtOUvnm5u4XEJL1Z8";
  console.log(token);

  const headers = {
    'Authorization': `Token ${token}`
  };
  
  // axios.get(baseURL, { headers })
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // useEffect(() => {
  //   axios.get(baseURL, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }).then((response) => {
  //     setPost(response.data);
  //   });
  // }, []);

  // make a post request for recipes. use a post request to iterate over selectedImages and send post request
  // then put them in a string for final request

  function createPost() {
    console.log(headers);
    axios
      .post(baseURL, {
        name: selectedName.value,
        difficulty: selectedDifficulty.value,
        meal: selectedMeal.value,
        cuisine: selectedCuisine.value,
        diet: selectedDiets.map(diet => diet.value).join(', '),
        cooking_time: `${selectedCookTime.hours}:${selectedCookTime.minutes}:00`,
        prep_time: `${selectedPrepTime.hours}:${selectedPrepTime.minutes}:00`,
        servings_num: "",
        media: "",
        steps: "",
        ingredients: ""
      },  {
        headers: {
          'Authorization': `Token ${token}`
        }})
      .then((response) => {
        setPost(response.data);
      });

  }


  console.log({
    name: selectedName,
    difficulty: selectedDifficulty.value,
    meal: selectedMeal.value,
    cuisine: selectedCuisine.value,
    diet: selectedDiets.map(diet => diet.value).join(', '),
    cooking_time: `${selectedCookTime.hours}:${selectedCookTime.minutes}:00`,
    prep_time: `${selectedPrepTime.hours}:${selectedPrepTime.minutes}:00`,
    servings_num: "",
    media: "",
    steps: "",
    ingredients: ""
  })

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
  
      <form className="container-fluid recipe-form">
  <div className='container-fluid mx-auto my-5'>
    <div className="form1 col-xs-12 col-lg-12 col-sm-12 col-md-12">
      <div className="recipe1 form-group">
        <div className="input-group mb-4">
          <div className="recipe-name d-flex align-items-center mt-4 mb-3">
            <div className="col-lg-5 d-flex">
              <label id="recipe-name" className="col-form-label" style={{fontSize: "18px", width: "100%"}}>Recipe Name:</label>
              <input type="text" className="form-control"
                id="recipe-name-input"
                value={selectedName}  
                style={{minWidth: "100%"}}
                onChange={(event) => setName(event.target.value)}/>
            </div>
          </div>
        </div>

        <RecipeFilters
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedMeal={selectedMeal}
          setSelectedMeal={setSelectedMeal}
          selectedDiets={selectedDiets}
          setSelectedDiets={setSelectedDiets}
          style={{width: '100%'}}
        />

        <PrepCookTime
          selectedPrepTime={selectedPrepTime}
          selectedCookTime={selectedCookTime}
          setCookTime={setCookTime}
          setPrepTime={setPrepTime}  
        />
      </div>

      <div className="form2 col-xs-12 col-lg-4 col-sm-12 col-md-12">
        <div className="row justify-content-center">
          <UploadImage selectImages={selectImages} setImages={setImages} image_name="Recipe"/>
        </div>
      </div>

      <Ingredients setIngredient_dic={setIngredient_dic} ingredient_dic={ingredient_dic} />
      <AddStep/>
    </div>
    <Meal/>
    <button type="submit" onClick={createPost}>Create Recipe</button>
  </div>
</form>

    </>
  );
}

export default CreateForm;