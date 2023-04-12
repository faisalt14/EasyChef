import React, { useEffect, useState } from 'react';
import './CreateForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeFilters from '../../components/CreateRecipe/RecipeFilters';
import UploadImage from '../../components/CreateRecipe/UploadImage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrepCookTime from '../../components/CreateRecipe/PrepCookTime';
import axios from 'axios';
import Ingredients from '../../components/CreateRecipe/Ingredients';
import AddStep from '../../components/CreateRecipe/AddStep';
import { useNavigate  } from 'react-router-dom';


const baseURL = "http://127.0.0.1:8000/recipes/create-recipe/";


// there are all functions outside of the CreateRecipe component that are used in Remix Recipe and Edit Recipe
function createFileObjects(item) {
  const { File } = window;
  if (item.media === undefined) {
    return [];
  }

  const filename = item.media.split('/').pop();
  const isVideo = filename.endsWith('.mp4');

  return new File([], filename, {
    type: isVideo ? 'video/mp4' : 'image/jpeg',
    lastModified: Date.now()
  });
}

const convertResponseToSteps = (response) => {
  return Object.entries(response).map(([index, step]) => {
    const mediaItems = Array.isArray(step.media)
      ? Object.entries(step.media)
          .filter(([mediaIndex, mediaItem]) => mediaItem.media !== undefined && mediaItem.media !== [])
          .map(([mediaIndex, mediaItem]) => createFileObjects(mediaItem))
      : [];
    return {
      id: step.id,
      prepTime: step.prep_time,
      cookTime: step.cooking_time,
      instructions: step.instructions,
      images: [],
    };
  });
};

const formatTime = (timeString) => {
  if (!timeString) {
    return {
      hours: "00",
      minutes: "00"
    };
  }

  const timeArray = timeString.split(':');
  const hours = timeArray[0];
  const minutes = timeArray[1];

  return {
    hours,
    minutes
  };
};

function dietStringToArray(dietStr) {
  const dietLabels = {
    '0': 'Vegan',
    '1': 'Vegetarian',
    '2': 'Gluten-Free',
    '3': 'Halal',
    '4': 'Kosher',
    '5': 'None',
  };

  return dietStr.split(', ').map(diet => {
    const index = Object.values(dietLabels).indexOf(diet);
    return { value: index.toString(), label: diet };
  });
}

function getObjectByLabel(array, label) {
  return array.find(element => element.label === label);
}

function getDifficultyObjectByLabel(label) {
  const difficulty = [
    { value: "0", label: 'Easy' },
    { value: "1", label: 'Medium'},
    { value: "2", label: 'Hard' }
  ];

  return getObjectByLabel(difficulty, label);
}

function getMealObjectByLabel(label) {
  const meal = [
    { value: "0", label: 'Breakfast' },
    { value: "1", label: 'Lunch'},
    { value: "2", label: 'Dinner' },
    { value: "3", label: 'Desserts' },
    { value: "4", label: 'Snacks' },
    { value: "5", label: 'Other' }
  ];

  return getObjectByLabel(meal, label);
}

function getCuisineObjectByLabel(label) {
  const cuisine = [
    { value: "0", label: 'African'},
    { value: "1", label: 'Caribbean'},
    { value: "2", label: 'East Asian'},
    { value: "3", label: 'European' },
    { value: "4", label: 'French' },
    { value: "5", label: 'Italian'},
    { value: "6", label: 'Middle-Eastern'},
    { value: "7", label: 'North American'},
    { value: "8", label: 'Oceanic'},
    { value: "9", label: 'Russian' },
    { value: "10", label: 'Spanish' },
    { value: "11", label: 'South American'},
    { value: "12", label: 'South Asian'},
    { value: "13", label: 'Other' }
  ];

  return getObjectByLabel(cuisine, label);
}


function CreateForm({ initialValues, method_name, name, recipe_id }) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzQ0Njc5LCJpYXQiOjE2ODEzNDEwNzksImp0aSI6IjEyYjVhZmE4MTY4NzQ1MDFiNDU4ZDg0MzFmMTRlYmEyIiwidXNlcl9pZCI6Mn0.Zl12MHyv3fpclKYWVVowxPgu_0JCcz-RQhsiG84eQng";  
  const navigate = useNavigate();

  const initialPrepTime = initialValues ? formatTime(initialValues.prep_time) : { hours: "00", minutes: "00" };
  const initialCookTime = initialValues ? formatTime(initialValues.cooking_time) : { hours: "00", minutes: "00" };
  const convertedSteps = initialValues ? convertResponseToSteps(initialValues.steps) : [];
  const [post, setPost] = useState(null);
  const [selectedName, setName] = useState(initialValues ? initialValues.name : '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialValues ? getDifficultyObjectByLabel(initialValues.difficulty) : '');
  const [selectedCuisine, setSelectedCuisine] = useState(initialValues ? getCuisineObjectByLabel(initialValues.cuisine) : '');
  const [selectedMeal, setSelectedMeal] = useState(initialValues ? getMealObjectByLabel(initialValues.meal) : '');
  const [selectedDiets, setSelectedDiets] = useState(
    initialValues ? dietStringToArray(initialValues.diet) : []
  );
  const [selectSteps, setSelectedSteps] = useState(initialValues ? convertedSteps : []);
  const [selectImages, setImages] = useState([]);

  // const [selectImages, setImages] = useState(initialValues ? createFileObjects(initialValues.media) : []);
  const [ingredient_dic, setIngredient_dic] = useState(initialValues ? initialValues.ingredients : {});

  const [selectedPrepTime, setPrepTime] = useState(initialPrepTime);
  const [selectedCookTime, setCookTime] = useState(initialCookTime);
  const [resetPrepCookTime, setResetPrepCookTime] = useState(false);
  const [selectedServings, setServings] = useState(initialValues ? initialValues.servings_num : 0);
  // const [initialFiles, setInitialFiles] = useState([]);

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
  const [reset, setReset] = useState(false);

  // useEffect(() => {
  //   if (initialValues) {
  //     setName(initialValues.name);
  //     setSelectedDifficulty(getDifficultyObjectByLabel(initialValues.difficulty));
  //     setSelectedCuisine(getCuisineObjectByLabel(initialValues.cuisine));
  //     setSelectedMeal(getMealObjectByLabel(initialValues.meal));
  //     setSelectedDiets(dietStringToArray(initialValues.diets));
  //     setSelectedSteps(initialValues.steps);
  //     setImages(initialValues.images);
  //     setIngredient_dic(initialValues.ingredients);
  //     setPrepTime(formatTime(initialValues.prep_time));
  //     setCookTime(formatTime(initialValues.cooking_time));
  //     setServings(initialValues.servings_num);
  //   }
  // }, [initialValues]);
  


useEffect(() => {
  if (selectedCuisine !== "" && selectedDiets.length > 0) {
    setErrorMessageFilters("");
    setDisplayFiltersError(false);
  }

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

}, [selectSteps, selectedServings, ingredient_dic, selectedName, selectedPrepTime, selectedCookTime, selectedCuisine, selectedDiets]);

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

  function handleSubmit(event) {
    // Reset error messages on every submit
    event.preventDefault();
  
    setErrorMessageName("");
    setErrorMessageFilters("");
    setErrorMessagePrep("");
    setErrorMessageServing("");
    setErrorMessageIngredients("");
    setErrorMessageSteps("");
    setDisplayFiltersError(false);
  
    let hasErrors = false;
  
    if (selectedName === "") {
      setErrorMessageName("Recipe Name is required");
      hasErrors = true;
    }
  
    if (selectedPrepTime === "00:00:00" || selectedCookTime === "00:00:00") {
      setErrorMessagePrep("Recipe Prep time and Recipe Cooking time are required");
      hasErrors = true;
    }
  
    if (selectedCuisine === "" || selectedDiets.length === 0) {
      setErrorMessageFilters("Cuisine and Diet are required");
      // Set displayFiltersError to true when the error occurs
      setDisplayFiltersError(true);
      hasErrors = true;
    }
  
    if (selectSteps.length === 0) {
      setErrorMessageSteps("At least 1 Step is required");
      hasErrors = true;
    }
  
    if (Object.keys(ingredient_dic).length === 0) {
      setErrorMessageIngredients("At least 1 Ingredient is required");
      hasErrors = true;
    }
  
    if (selectedServings === 0) {
      setErrorMessageServing("Servings are required");
      hasErrors = true;
    }
    if (!hasErrors) {
      (async () => {
        if (name === "Edit") {
          await updatePost(recipe_id);
        } else {
          await createPost();
        }
      })();
    }    
  }
  
  async function updatePost(recipe_id) {
    // ... (keep the code for handling media and steps the same as in createPost)
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
          return { failed: true };
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
          let stepMediaIds = [];
          console.log("step", step.images);
          console.log("seleected steps", selectSteps);
        
          if (step.images.length !== 0) {
            const stepMediaPromises = step.images.map(async (image) => {        
              // Create a FormData object
              const formData = new FormData();
              formData.append('media', image);
        
              return axios.post('http://127.0.0.1:8000/recipes/steps/create/media/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
                },
              }).catch(error => {
                console.log(error.response.data);
                return { failed: true };
              });
            });
        
  
            const mediaResponses = await Promise.all(stepMediaPromises);
  
            stepMediaIds = mediaResponses.map((response) => response.data.id);
          }
  
          const stepResponse = await axios.post('http://127.0.0.1:8000/recipes/steps/create/', {
            ...(stepMediaIds.length > 0 && { media: stepMediaIds }),
            instructions: step.instructions,
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
            return { failed: true };

          });
    
          stepIds.push(stepResponse.data.id);
        }
      };
  
      await sendPostRequests();
    }
  
    stepIds = stepIds.join(', ');
    // console.log("ingredients", ingredient_dic)
  
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
  
    axios.patch(`http://127.0.0.1:8000/recipes/${recipe_id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    }).then((response) => {
      setReset(true);
      console.log('Recipe updated successfully:', response.data);
      toast.success('Recipe updated successfully');
      setPost(response.data);
      resetForm();
      navigate(`/recipes/${response.data.id}/details`);
  
    }).catch(error => {
      console.log(error.response.data);
    });
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
          return { failed: true };
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
          let stepMediaIds = [];
          console.log("step", step.images);
          console.log("seleected steps", selectSteps);
        
          if (step.images.length !== 0) {
            const stepMediaPromises = step.images.map(async (image) => {        
              // Create a FormData object
              const formData = new FormData();
              formData.append('media', image);
        
              return axios.post('http://127.0.0.1:8000/recipes/steps/create/media/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
                },
              }).catch(error => {
                console.log(error.response.data);
                return { failed: true };
              });
            });
        
  
            const mediaResponses = await Promise.all(stepMediaPromises);
  
            stepMediaIds = mediaResponses.map((response) => response.data.id);
          }
  
          const stepResponse = await axios.post('http://127.0.0.1:8000/recipes/steps/create/', {
            ...(stepMediaIds.length > 0 && { media: stepMediaIds }),
            instructions: step.instructions,
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
            return { failed: true };

          });
    
          stepIds.push(stepResponse.data.id);
        }
      };
  
      await sendPostRequests();
    }
  
    stepIds = stepIds.join(', ');
    console.log("ingredients", ingredient_dic)

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
      setReset(true);
      console.log('Recipe created successfully:', response.data);
      toast.success('Recipe created successfully');
      setPost(response.data);
      resetForm();
      navigate(`/recipes/${response.data.id}/details`);

    }).catch(error => {
      console.log(error.response.data);
    });
  }
  return (
    <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12" style={{ height: '5em', backgroundColor: '#E47E20', color: '#FFFFFF', paddingTop: '0.5rem', textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset' }}>
        <h2 className='mt-2' style={{fontWeight:"550"}}>
        {name ? `${name} a Recipe` : "Create a Recipe"}
      </h2>
        </div>
        <hr />
        <div className="col-12 mb-5" style={{ backgroundColor: '#efeeee' }}>
          <p className="lead fw-normal" style={{ fontSize: '22px', color: '#656767', textAlign: 'center' }}>
            Create your own recipe here! Show off your culinary skills and share your masterpiece with the world.
          </p>
          {name=="Remix" && (<div style={{ fontSize: '14px', color: '#656767', textAlign: 'center' }}>
        Please ensure you only use images that you have the rights to or are freely available for use. We encourage originality and respect for intellectual property.
      </div>)}
        </div>
      </div>
    </div>

    <form className="ms-2 container-fluid recipe-form" style={{backgroundColor: "#efeeee"}} method="POST" encType="multipart/form-data">
    <div className='ms-5 mt-3' style={{ backgroundColor: "#04a5a5", padding: "1rem", borderRadius: "5px", width:"50%"}}>
  <h2 style={{ color: "white", fontWeight: "550", marginBottom: "0.5rem" }}>
    1. Recipe Basics
  </h2>
  <p
    className="mt-2 lead fw-normal"
    style={{
      fontSize: "19px",
      color: "#F9F9F9",
      width: "100%",
      marginLeft: "0.5rem",
    }}
  >
    Let's get cookin'! Start by filling in your recipe's basic info.
  </p>
</div>

      <div className="row mx-auto my-5 ms-4">
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
        <div className="row mb-5 ms-3">
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
        <div className='ms-4 mt-4' style={{ backgroundColor: "#04a5a5", padding: "1rem", borderRadius: "5px", width:"122%"}}>
  <h2 style={{ color: "white", fontWeight: "550", marginBottom: "0.5rem" }}>
  2. Recipe Ingredients
    </h2>
  <p
    className="mt-2 lead fw-normal"
    style={{
      fontSize: "19px",
      color: "#F9F9F9",
      width: "100%",
      marginLeft: "0.5rem",
    }}
  >
        Adding ingredients is easy! Just list them one by one, with the quantity and unit of measurement.  </p>
</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="row justify-content-center">
          <UploadImage selectImages={selectImages} setImages={setImages} image_name="Recipe"
            reset={reset}
            setReset={setReset}
            // initialFiles={initialFiles} // pass the initialFiles state as a prop
          />

          </div>
        </div>
        {(errorMessageIngredients && !hasAddedIngredients) && (
              <div style={{width:"100%"}}>
                <div className="ms-4 alert alert-danger" role="alert" style={{width:"18%"}}>
                {errorMessageIngredients}
                </div>
             </div>
)}

        <Ingredients
          setIngredient_dic={setIngredient_dic}
          ingredient_dic={ingredient_dic}
          onIngredientAdded={() => setHasAddedIngredients(true)}
          initialIngredients={initialValues ? initialValues.ingredients : []}
        />
        <br/>


        <AddStep 
        selectSteps={selectSteps}
        setSelectedSteps={setSelectedSteps}
        onStepAdded={() => setHasAddedSteps(true)}
        name={method_name}
         />

{(errorMessageSteps && !hasAddedSteps) && (
              <div className="ms-3 row" style={{width:"100%"}}>
                <div className="ms-4 mt-3 alert alert-danger" role="alert" style={{width:"15%"}}>
                {errorMessageSteps}
                </div>
             </div>
)}
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-lg" onClick={handleSubmit} style={{backgroundColor: "#E47E20", color: "white", fontWeight: '550'
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