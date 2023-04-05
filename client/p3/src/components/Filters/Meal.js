import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function Meal({selectedMeal, setSelectedMeal}) {
  const meal = [
    { value: "0", label: 'Breakfast' },
    { value: "1", label: 'Lunch'},
    { value: "2", label: 'Dinner' },
    { value: "3", label: 'Desserts' },
    { value: "4", label: 'Snacks' },
    { value: "5", label: 'Other' }
    
  ];

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
        <Select
          value={selectedMeal}
          placeholder="Meal"
          onChange={setSelectedMeal}
          styles={customStyles}
          options={meal}
          isClearable
          isSearchable
        />  )
}

export default Meal