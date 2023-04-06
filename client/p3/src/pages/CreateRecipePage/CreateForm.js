import React, { useEffect, useState } from 'react';
import './CreateForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFilters from '../../components/CreateRecipe/RecipeFilters';
import UploadImage from '../../components/CreateRecipe/UploadImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrepCookTime from '../../components/CreateRecipe/PrepCookTime';
import axios from 'axios';
import Ingredients from '../../components/CreateRecipe/Ingredients';
import AddStep from '../../components/CreateRecipe/AddStep';

const baseURL = "http://127.0.0.1:8000/recipes/create-recipe/";


function CreateForm() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwODIxODk3LCJpYXQiOjE2ODA4MTgyOTcsImp0aSI6ImY5MDJmYmMyYTgxODQ5YWRhMDc2Yzc1OTg4Zjc3NmUyIiwidXNlcl9pZCI6Mn0.rw8-_C_WjsIHt97B_W8oufxFYbfxWaU8iR8YzdDs74A";

  const [post, setPost] = useState(null);
  const [selectedName, setName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDiets, setSelectedDiets] = useState([]);

  const [selectSteps, setSelectedSteps] = useState([]);
  const [selectImages, setImages] = useState([]);
  const [ingredient_dic, setIngredient_dic] = useState({});

  const [selectedPrepTime, setPrepTime] = useState("00:00:00");
  const [selectedCookTime, setCookTime] = useState("00:00:00");
  const [resetPrepCookTime, setResetPrepCookTime] = useState(false);
  const [selectedServings, setServings] = useState(0);

  const [errorMessageName, setErrorMessageName] = useState("");
  const [errorMessageFilters, setErrorMessageFilters] = useState("");
  const [errorMessageSteps, setErrorMessageSteps] = useState("");
  const [errorMessageIngredients, setErrorMessageIngredients] = useState("");
  const [errorMessagePrep, setErrorMessagePrep] = useState("");
  const [errorMessageServing, setErrorMessageServing] = useState("");
  const [displayFiltersError, setDisplayFiltersError] = useState(false);

  const [hasTypedName, setHasTypedName] = useState(false);
  const [hasTypedPrepCookTime, setHasTypedPrepCookTime] = useState(false);
  const [hasTypedServings, setHasTypedServings] = useState(false);
  const [hasAddedIngredients, setHasAddedIngredients] = useState(false);
  const [hasAddedSteps, setHasAddedSteps] = useState(false);
  
useEffect(() => {
  if (selectedCuisine !== "" && selectedDiets.length > 0) {
    setErrorMessageFilters("");
    setDisplayFiltersError(false);
  }
}, [selectedCuisine, selectedDiets]);

useEffect(() => {
  if (selectSteps.length > 0) {
    setHasAddedSteps(true);
    setErrorMessageSteps("");
  } else {
    setHasAddedSteps(false);
  }

  if (selectedPrepTime !== "00:00:00" && selectedCookTime !== "00:00:00") {
    setHasTypedPrepCookTime(true);
    setErrorMessagePrep("");
  } else {
    setHasTypedPrepCookTime(false);
  }

  if (selectedServings !== 0) {
    setHasTypedServings(true);
    setErrorMessageServing("");
  } else {
    setHasTypedServings(false);
  }

  if (Object.keys(ingredient_dic).length !== 0) {
    setHasAddedIngredients(true);
    setErrorMessageIngredients("");
  } else {
    setHasAddedIngredients(false);
  }

  if (selectedName !== "") {
    setHasTypedName(true);
    setErrorMessageName("");
  } else {
    setHasTypedName(false);
  }

}, [selectSteps, selectedServings, ingredient_dic, selectedName, selectedPrepTime, selectedCookTime]);

  // make a post request for recipes. use a post request to iterate over selectedImages and send post request
  // then put them in a string for final request
  function resetForm() {
    setName('');
    setSelectedDifficulty('');
    setSelectedCuisine('');
    setSelectedMeal('');
    setSelectedDiets([]);
    setImages([]);
    setSelectedSteps([]);
    setIngredient_dic({});
    setPrepTime("00:00:00");
    setCookTime("00:00:00");
  }

  function handleSubmit() {
    // Reset error messages on every submit
    setErrorMessageName("");
    setErrorMessageFilters("");
    setErrorMessagePrep("");
    setErrorMessageServing("");
    setErrorMessageIngredients("");
    setErrorMessageSteps("");
    setDisplayFiltersError(false);
  
    if (selectedName === "") {
      setErrorMessageName("Recipe Name is required");
    }
  
    if (selectedPrepTime === "00:00:00" || selectedCookTime === "00:00:00") {
      setErrorMessagePrep("Recipe Prep time and Recipe Cooking time are required");
    }
  
    if (selectedCuisine === "" || selectedDiets.length === 0) {
      setErrorMessageFilters("Cuisine and Diet are required");
      // Set displayFiltersError to true when the error occurs
      setDisplayFiltersError(true);
    }
  
    if (selectSteps.length === 0) {
      setErrorMessageSteps("At least 1 Step is required");
    }
  
    if (Object.keys(ingredient_dic).length === 0) {
      setErrorMessageIngredients("At least 1 Ingredient is required");
    }
  
    if (selectedServings === 0) {
      setErrorMessageServing("Servings are required");
    } else {
      createPost();
    }
  }
  
  
  async function createPost() {
    let mediaIds = "";
    if (selectImages.length !== 0) {
      const mediaPromises = selectImages.map(async (image) => {
        const objectUrl = URL.createObjectURL(image);
        const filename = image.name;
        const type = image.type;
        const convertedFile = await fetch(objectUrl)
          .then((response) => response.arrayBuffer())
          .then((buffer) => new File([buffer], filename, { type }));
        return axios.post('http://127.0.0.1:8000/recipes/create-recipes/add-media/', { media: convertedFile }, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }).catch(error => {
          console.log(error.response.data);
        });
      });
  
      mediaIds = (await Promise.all(mediaPromises)).map((response) => {
        console.log('Media added successfully:', response.data);
        toast.success('Media added successfully');
        return response.data.id;
    }).join(', ');    
        }
  
    let stepIds = [];
    if (selectSteps.length !== 0) {
      const stepMediaIds = [];
  
      const sendPostRequests = async () => {
        for (const step of selectSteps) {
          let stepMediaIds = '';
  
          if (step.images.length !== 0) {
            const stepMediaPromises = step.images.map(async (image) => {
              const objectUrl = URL.createObjectURL(image);
              const filename = image.name;
              const type = image.type;
              const convertedFile = await fetch(objectUrl)
                .then((response) => response.arrayBuffer())
                .then((buffer) => new File([buffer], filename, { type }));
              return axios.post('http://127.0.0.1:8000/recipes/steps/create/media/', { media: convertedFile }, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
                },
              }).catch(error => {
                console.log(error.response.data);
              });
            });
  
            const mediaResponses = await Promise.all(stepMediaPromises);
  
            stepMediaIds = mediaResponses.map((response) => response.data.id).join(', ');
          }
  
          const stepResponse = await axios.post('http://127.0.0.1:8000/recipes/steps/create/', {
            ...(stepMediaIds.length > 0 && { media: stepMediaIds }),
            instructions: step.description,
            prep_time: step.prepTime,
            cooking_time: step.cookTime,
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).then((response) => {
            console.log('Step added successfully:', response.data);
            toast.success('Step added successfully');
            return response;
          }).catch(error => {
            console.log(error.response.data);
          });
    
          stepIds.push(stepResponse.data.id);
        }
      };
  
      await sendPostRequests();
    }
  
    stepIds = stepIds.join(', ');

    const formData = new FormData();

    // Append all fields to formData
    formData.append('name', selectedName);
    if (selectedDifficulty.value) {
      formData.append('difficulty', selectedDifficulty.value);
    }    
    if (selectedMeal.value) {
      formData.append('meal', selectedMeal.value);
    }
    formData.append('cuisine', selectedCuisine.value);
    formData.append('diet', selectedDiets.map(diet => diet.value).join(', '));
    formData.append('cooking_time', selectedCookTime);
    formData.append('prep_time', selectedPrepTime);
    formData.append('servings_num', selectedServings);
    if (mediaIds.length > 0) {
      formData.append('media', mediaIds);
    }
    formData.append('steps', stepIds);
    formData.append('ingredients', JSON.stringify(ingredient_dic));
  
    axios.post(baseURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      console.log('Recipe created successfully:', response.data);
      toast.success('Recipe created successfully');
      setPost(response.data);
      resetForm();
    }).catch(error => {
      console.log(error.response.data);
    });
  }
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12" style={{ height: '3.5em', backgroundColor: '#E47E20', color: '#FFFFFF', paddingTop: '0.5rem', textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset' }}>
          <h2>Create a Recipe</h2>
        </div>
        <hr />
        <div className="col-12" style={{ backgroundColor: '#efeeee' }}>
          <p className="lead fw-normal" style={{ fontSize: '22px', color: '#656767', textAlign: 'center' }}>
            Create your own recipe here! Show off your culinary skills and share your masterpiece with the world.
          </p>
        </div>
      </div>
    </div>

    <form className="container-fluid recipe-form" style={{backgroundColor: "#efeeee"}} method="POST" encType="multipart/form-data">
      <div className="row mx-auto my-5">
        <div className="col-md-6">
        {(errorMessageName && hasTypedName===false) && (
              <div className="ms-4 alert alert-danger" role="alert" style={{margin:0, width: "30%"}}>
                {errorMessageName}
              </div>
            )}
          <div className="recipe1 form-group mb-4">
            <div className="recipe-name row mb-3 ms-1">
              <label htmlFor="recipe-name" className="col-2 form-label" style={{ fontSize: "18px", width:"20%" }}>
              <span className="required" style={{color: "red"}}>* </span>Recipe Name
              </label>
              <div className="col-8">
              <input
                type="text"
                className="form-control"
                id="recipe-name-input"
                value={selectedName}
                onChange={(event) => {
                  setName(event.target.value);
                  setHasTypedName(true);
                }}
                />
              </div>
            </div>

            {displayFiltersError && errorMessageFilters && (
            <div className="ms-4 alert alert-danger" role="alert" style={{maxWidth: "400px", marginBottom: "10px"}}>
              {errorMessageFilters}
            </div>
          )}
            <RecipeFilters
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedCuisine={selectedCuisine}
              setSelectedCuisine={setSelectedCuisine}
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              selectedDiets={selectedDiets}
              onTimeChange={() => setHasTypedPrepCookTime(true)}
              setSelectedDiets={setSelectedDiets}
            />
              {(errorMessagePrep && !hasTypedPrepCookTime) && (
              <div className="row ms-4 alert alert-danger" role="alert" style={{width:"63%"}}>
              {errorMessagePrep}
              </div>
            )}
            <PrepCookTime
              selectedPrepTime={selectedPrepTime}
              selectedCookTime={selectedCookTime}
              setPrepTime={setPrepTime}
              setCookTime={setCookTime}
              reset={resetPrepCookTime}
              name="Recipe"
            />

{(errorMessageServing && !hasTypedServings) && (
              <div className="row ms-4 alert alert-danger" role="alert" style={{width:"32%"}}>
                {errorMessageServing}
              </div>
            )}
        <div className="row mb-3 ms-3">
          <label htmlFor="number-of-servings" className="col-3 form-label" style={{ fontSize: "18px", width:"30%" }}>
          <span className="required" style={{color: "red"}}>* </span>

            Number of Servings
          </label>
          <div className="col-2">
            <input
              type="number"
              className="form-control"
              id="number-of-servings-input"
              value={selectedServings}
              onChange={(event) => {
                setServings(event.target.value);
                setHasTypedServings(true);
              }}
              min="1"
              style={{ width: "90px" }}
            />
          </div>
        </div>

          </div>
        </div>

        <div className="col-md-6">
          <div className="row justify-content-center">
            <UploadImage selectImages={selectImages} setImages={setImages} image_name="Recipe" />
          </div>
        </div>
        {(errorMessageIngredients && !hasAddedIngredients) && (
              <div style={{width:"100%"}}>
                <div className="ms-4 alert alert-danger" role="alert" style={{width:"18%"}}>
                {errorMessageIngredients}
                </div>
             </div>
)}
        <Ingredients setIngredient_dic={setIngredient_dic} ingredient_dic={ingredient_dic} onIngredientAdded={() => setHasAddedIngredients(true)}/>
        <br/>

        {(errorMessageSteps && !hasAddedSteps) && (
              <div className="mt-4 ms-1 row" style={{width:"100%"}}>
                <div className="ms-4 mt-3 alert alert-danger" role="alert" style={{width:"15%"}}>
                {errorMessageSteps}
                </div>
             </div>
)}
        <AddStep 
        selectSteps={selectSteps}
        setSelectedSteps={setSelectedSteps}
        onStepAdded={() => setHasAddedSteps(true)}
         />

        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-lg" onClick={handleSubmit} style={{backgroundColor: "#E47E20", color: "white", fontWeight: '500'
}}>
          Post to Easy Chef!
        
          </button>
        </div>
      </div>
    </form>

  </>
  );
}

export default CreateForm;