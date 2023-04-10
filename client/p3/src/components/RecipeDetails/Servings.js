import React, { useState, useEffect } from 'react';
import './style.css';

function Servings({ initialServings, ingredients, onServingsChange }) {
  const [servingNumber, setServingNumber] = useState(initialServings);
  const [inputValue, setInputValue] = useState(initialServings);

  useEffect(() => {
    onServingsChange(servingNumber);
  }, [servingNumber]);

  const handleSetServings = () => {
    setServingNumber(prevServingNumber => Math.ceil(parseFloat(inputValue)) || prevServingNumber);
  };

  const handleResetServings = () => {
    setServingNumber(initialServings);
    setInputValue(initialServings);
  };

  return (
    <div
      className="row d-flex mt-4 pt-3 pb-4"
      style={{
        backgroundColor: '#D9D9D9',
        color: 'white',
        display: 'flex',
        fontFamily: 'Roboto',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '70rem',
        margin: 'auto',
        borderRadius: '15px',
      }}
    >
      <span
        style={{
          maxWidth: '7rem',
          fontSize: '18px',
          marginTop: '3px',
          color: 'black',
          fontFamily: 'Roboto',
          fontWeight: 500,
        }}
      >
        Serves: {servingNumber}
      </span>
      <label
        style={{
          maxWidth: '10.4rem',
          fontSize: '18px',
          marginTop: '3px',
          color: 'black',
          fontFamily: 'Roboto',
          fontWeight: 500,
        }}
        htmlFor="serving_number"
      >
        Custom Servings:
      </label>
      <input
        style={{
          width: '13vh',
          height: '2.6rem',
          fontFamily: 'Roboto',
          marginTop: '5px',
        }}
        type="number"
        min="1"
        className="form-control"
        id="serving_number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder=""
      />
      <button
        type="button"
        className="btn mt-2 ms-3"
        style={{
          backgroundColor: '#04B4B4',
          color: 'white',
          maxWidth: '12rem',
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '17px',
        }}
        onClick={handleSetServings}
      >
        Set Servings
      </button>
      <button
        type="button"
        className="btn mt-2 ms-3"
        style={{
          backgroundColor: '#04B4B4',
          color: 'white',
          maxWidth: '12rem',
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '17px',
        }}
        onClick={handleResetServings}
      >
        Reset to Original
      </button>
      <button
        type="button"
        className="btn mt-2 ms-3"
        style={{
          backgroundColor: '#04B4B4',
          color: 'white',
          maxWidth: '12rem',
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: '17px',
        }}
      >
        Add to Shopping List
      </button>
    </div>
  );
}

export default Servings;
