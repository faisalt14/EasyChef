import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import $ from 'jquery'

function SearchFilterDropdown(props) {

    const [dropdownType, setDropdownType] = useState(parseInt(props.type))
    const typeDict = {0: ['Search By...', ['Recipe', 'Chef', 'Ingredients']], 
                      1: ['Cooking Time', ['Under 10m', '10m-30m', '30m-1h', '1h+']], 
                      2: ['Cuisine', ['American', 'Brazilian','Chinese', 'English', 'German',
                                      'Greek', 'Hungarian', 'Indian', 'Italian', 'Japanese', 
                                      'Mediterranean', 'Middle-Eastern', 'Mexican', 'South-Asian',
                                      'Scandanavian', 'Spanish']],
                      3: ['Meal', ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snack', 'Other']], 
                      4: ['Diet', ['Vegan', 'Vegetarian', 'Gluten-Free', 'Kosher', 'Halal', 'None']]}
    const dropdownItems = [<option value='-1'>{typeDict[dropdownType][0]}</option>]

    typeDict[dropdownType][1].forEach((element, index) => {
        dropdownItems.push(<option value={index} className="home-search-filter-option">
                                {element}
                            </option>)
    });
    
    const update = () => {
    }

    useEffect(() =>{
        /*$.ajax({
            url: 'http://127.0.0.1:8000/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })*/
    })

    return(
        <Form.Select className="home-search-dropdown">
            {dropdownItems}
        </Form.Select>
    );
}

export default SearchFilterDropdown;

/*
<>
        <Dropdown aria-haspopup="true" aria-expanded="false" >
            <Dropdown.Toggle variant="secondary" className="home-search-dropdown">
            {typeDict[dropdownType][0]}
            </Dropdown.Toggle>
            <Dropdown.Menu className="home-search-filter-options">
                {dropdownItems}
            </Dropdown.Menu>
        </Dropdown>
        </>
                 */