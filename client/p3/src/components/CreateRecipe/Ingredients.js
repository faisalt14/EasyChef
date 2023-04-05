import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './ingredients.css';
import CloseButton from 'react-bootstrap/CloseButton';

function Ingredients({ ingredient_dic, setIngredient_dic }) {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [options, setOptions] = useState([]);
  const [errorMessage1, setErrorMessage1] = useState('');


  const units_object = [
    { value: "cups", label: 'cups' },
    { value: "kg", label: 'kg'},
    { value: "g", label: 'g' },
    { value: "tbs", label: 'tbs' },
    { value: "tsp", label: 'tsp' },
    { value: "lb", label: 'lb' },
    { value: "oz", label: 'oz' },
    { value: "cm", label: 'cm' },
    { value: "m", label: 'm' },
  ];
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/recipes/autocomplete/?category=0')
      .then(response => {
        setOptions(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    if (name.name === "" || quantity === "" || unit.value === "") {
      setErrorMessage1("Please fill out all fields.");
      return;
    }
  
    if (ingredients.some((i) => i.split(' ')[2] === name.name)) {
      setErrorMessage1("This ingredient has already been added.");
      return;
    }
  

    event.preventDefault();
    const newIngredient = [parseInt(quantity), unit.value];
    const newIngredientId = name.id.toString();
    setIngredient_dic(prevIngredient_dic => ({...prevIngredient_dic, [newIngredientId]: newIngredient}));
    setIngredients(prevIngredients => [...prevIngredients, `${quantity} ${unit.value} ${name.name}`]);
    setName('');
    setQuantity('');
    setUnit('');
  };

  const handleRemove = (ingredient) => {
    // Split the ingredient string to extract the name
    const name = ingredient.split(' ').pop();
    console.log(name);
    // Find the corresponding option based on the name
    const option = options.find(o => o.name.toLowerCase() === name.toLowerCase());
  
    // Remove the corresponding entry from the ingredient_dic
    if (option) {
      const id = option.id.toString();
      setIngredient_dic(prevIngredient_dic => {
        const newIngredient_dic = { ...prevIngredient_dic };
        delete newIngredient_dic[id];
        return newIngredient_dic;
      });
    }
  
    // Remove the ingredient from the ingredients list
    setIngredients(prevIngredients => prevIngredients.filter(e => e !== ingredient));
  };    

  return (
    <>
    <div style={{width: "50%"}}>
      <h3>List of Ingredients</h3>
      {ingredients.length > 0 && (
    <div className="ing" style={{ backgroundColor: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', padding: '20px' }}>
    {ingredients.map((ingredient, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <i style={{ maxWidth: '2rem', fontSize: '10px', color: '#04B4B4', cursor: 'pointer' }} className="bi bi-circle-fill"></i>
        <p style={{ maxWidth: '20rem', fontSize: '18px', margin: '0 0 0 10px' }}>
          {ingredient.split(' ').slice(0, 2).join(' ')}
          <span style={{ fontWeight: '600' }}> {ingredient.split(' ').slice(2).join(' ')}</span>
        </p>
        <button onClick={() => handleRemove(ingredient)} style={{ marginLeft: 'auto', borderRadius: '2px', cursor: 'pointer', border: 'none', backgroundColor: '#E47E20', color: 'white', padding: '5px 10px', fontSize: '16px' }}>Remove</button>
      </div>
    ))}
  </div>
      )}
      <div className="row" style={{ backgroundColor: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', padding: '20px' }}>
          <div className='col-3'>
            <label>Ingredient:</label>
            <Select
              type="text" 
              options={options}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.id}
              value={name}
              onChange={setName}
            >
            </Select>

          </div>
          <div className='col-3'>
            <label>Quantity:</label>
            <input
              className="form-control"

              type="number"
              value={quantity}
              onChange={(e) => {
                const regex = /^[0-9]{1,2}$/;
                if (e.target.value === "" || regex.test(e.target.value)) {
                  setQuantity(e.target.value);
                }
              }}
            />
          </div>
          <div className='col-3'>

            <label>Unit:</label>
            <Select
              type="text" 
              value={unit}
              onChange={setUnit}
              options = {units_object}
            >
              
            </Select>
            </div>

            <div className='col-3' style={{padding: 0, margin: 0}}>

            <button type="button" className="btn"
                      style={{backgroundColor: "#04b4b4", color: "white"}}
                      onClick={handleSubmit}>Add</button>
            </div>
            {errorMessage1 && (
        <div className="d-flex alert alert-danger" role="alert" style={{width: "40%"}}>
          {errorMessage1}
          <CloseButton style={{marginLeft: "20px"}} onClick={() => setErrorMessage1('')}/>

        </div>
      )}

      </div>
    </div>
    </>
  );
}

export default Ingredients;