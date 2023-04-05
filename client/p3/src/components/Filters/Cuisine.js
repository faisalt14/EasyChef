import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cuisine({selectedCuisine, setSelectedCuisine}) {
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
          value={selectedCuisine}
          placeholder="Cuisine"
          onChange={setSelectedCuisine}
          options={cuisine}
          styles={customStyles}
          isClearable
          isSearchable
        />  )
}

export default Cuisine