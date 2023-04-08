import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function Diet({selectedDiets, setSelectedDiets, fontSize, height}) {
  const diet = [
    { value: "0", label: 'Vegan'},
    { value: "1", label: 'Vegetarian'},
    { value: "2", label: 'Gluten-Free'},
    { value: "3", label: 'Halal' },
    { value: "4", label: 'Kosher' },
    { value: "5", label: 'None'}];
    
    const newFontSize = (fontSize ? fontSize : "1rem")
    const newHeight = (height ? height : "56px")

    const customStyles = {
      valueContainer: base => ({
        ...base,
        maxWidth: '90vw',
        maxHeight: newHeight,
        overflowY: "Scroll",
        "::-webkit-scrollbar": {
          display: 'none',
        }
      }),

      menuPortal: base => ({ ...base, zIndex: 1 }),

      option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isSelected ? "#ffff" : "black",
        backgroundColor: state.isSelected ? "#04B4B4" : "#fff",
        fontSize: newFontSize, // increase font size
      }),
  
      control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "#04B4B4",
        padding: "10px",
        fontSize: newFontSize, // increase font size
        height: newHeight,
        border: "none",
        boxShadow: "none",
        padding: 0,
        paddingTop: '0px',  
      }),
      singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff",     fontSize: newFontSize, // increase font size
    }),
      placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: "#fff",
        fontSize: newFontSize, // increase font size
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
        fontSize: newFontSize, // increase font size
        fontWeight: "normal",
      }),
    
      multiValueRemove: (defaultStyles) => ({
        ...defaultStyles,
        color: "#fff",
        fontSize: newFontSize, // increase font size
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
          value={selectedDiets}
          placeholder="Diet"
          onChange={setSelectedDiets}
          options={diet}
          menuPortalTarget={document.body}
          styles={customStyles}
          isMulti
          isClearable
          isSearchable
        />  )
}

export default Diet