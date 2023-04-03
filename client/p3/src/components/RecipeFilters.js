import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/CreateForm.css';

function RecipeFilters() {
  const [selectedOptions, setSelectedOptions] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [cuisineOption, setCuisineOption] = useState("");
  const [dietOption, setDietOption] = useState([]);

  const difficulty = [
    { value: "0", label: 'Easy' },
    { value: "1", label: 'Medium'},
    { value: "2", label: 'Hard' }
  ];

  const meal = [
    { value: "0", label: 'Breakfast' },
    { value: "1", label: 'Lunch'},
    { value: "2", label: 'Dinner' },
    { value: "3", label: 'Desserts' },
    { value: "4", label: 'Snacks' },
    { value: "5", label: 'Other' }
    
  ];

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

const diet = [
      { value: "0", label: 'Vegan'},
      { value: "1", label: 'Vegetarian'},
      { value: "2", label: 'Gluten-Free'},
      { value: "3", label: 'Halal' },
      { value: "4", label: 'Kosher' },
      { value: "5", label: 'None'}];

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#ffff" : "black",
      backgroundColor: state.isSelected ? "#04B4B4" : "#fff",
      fontSize: "1rem", // increase font size
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#04B4B4",
      padding: "10px",
      fontSize: "1rem", // increase font size
      border: "none",
      boxShadow: "none",

    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff",     fontSize: "1rem", // increase font size
  }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: "#fff",
      fontSize: "1rem", // increase font size
      width: "7.2rem",
    }),
    multiValue: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "2px 8px",
      margin: "2px",
    }),
  
    multiValueLabel: (defaultStyles) => ({
      ...defaultStyles,
      color: "#04B4B4",
      fontSize: "1rem", // increase font size
      fontWeight: "normal",
    }),
  
    multiValueRemove: (defaultStyles) => ({
      ...defaultStyles,
      color: "#fff",
      fontSize: "1rem", // increase font size
      ':hover': {
        backgroundColor: '#fff',
        color: '#04B4B4',
      },
    }),
    container: (defaultStyles) => ({ ...defaultStyles, padding: 0}),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "#fff",
    }),
    clearIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: "#fff",
    }),
  };

  return (
    <>
  <div className="container" style={{ maxWidth: "65%", padding: 0, margin: 0}}>

    <label
    id="recipe1.1-name"
    className="col-form-label"
    style={{fontSize: '18px'}}
    >Select Filters</label>

    <div className="row pe-4 me-4 d-flex" style={{ marginLeft: '0', marginRight: '0' }}>
      <div className="col-xs-12 col-lg-3 col-sm-12 col-md-12 col-3">
        <Select
          options={difficulty}
          placeholder="Difficulty"
          value={selectedOptions}
          onChange={setSelectedOptions}
          styles={customStyles}
        />
      </div>
      <div className="col-xs-12 col-lg-3 col-sm-12 col-md-12 col-3">
        <Select
          value={cuisineOption}
          placeholder="Cuisine"
          onChange={setCuisineOption}
          options={cuisine}
          styles={customStyles}
          isClearable
          isSearchable
        />
      </div>
      <div className="col-xs-12 col-lg-3 col-sm-12 col-md-12 col-3">
        <Select
          value={selectedOption2}
          placeholder="Meal"
          onChange={setSelectedOption2}
          styles={customStyles}
          options={meal}
          isClearable
          isSearchable
        />
      </div>
      <div className="row-12 d-flex" style={{ marginLeft: '0', marginRight: '0'}}>
          <Select
          value={dietOption}
          placeholder="Diet"
          onChange={setDietOption}
          options={diet}
          styles={customStyles}
          isMulti
          isClearable
          isSearchable
        />
      </div>
      </div>
      </div>
    </>
  )
}

export default RecipeFilters
