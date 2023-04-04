import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Dropdown from 'react-bootstrap/Dropdown'
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
    const dropdownItems = []

    typeDict[dropdownType][1].forEach((element, index) => {
        dropdownItems.push(<Dropdown.Item id={index}>
                                {element}
                            </Dropdown.Item>)
    });
    
    const update = () => {
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    })

    return(
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
    );
}

export default SearchFilterDropdown;

/*
<div class="dropdown">
                    <button type="button" id="searchCategoryDropdown" class="btn btn-primary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-left:1.5em; margin-right:1.5em; width:10vw; font-size:1vw; background-color:#04B4B4; border:0px;">
                    Search By...
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="searchCategoryDropdown">
                    <li><a class="dropdown-item">Recipe</a></li>
                    <li><a class="dropdown-item">Chef</a></li>
                    <li><a class="dropdown-item">Ingredients</a></li>
                    </ul>
                </div>

                <div class="dropdown">
                    <button type="button" id="cookingTimeDropdown" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-left:1.5em; margin-right:1.5em; width:10vw; font-size:1vw; background-color:#04B4B4; border:0px;">
                    Cooking Time
                    </button>
                    <div class="dropdown-menu" aria-labelledby="cookingTimeDropdown" style="overflow-y:scroll; max-height:10em;">
                    <a class="dropdown-item">1m - 20m</a>
                    <a class="dropdown-item">10m - 30m</a>
                    <a class="dropdown-item">30m - 1hr</a>
                    <a class="dropdown-item">1hr+</a>
                    </div>
                </div>

                <div class="dropdown">
                    <button type="button" id="cuisineDropdown" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-left:1.5em; margin-right:1.5em; width:10vw; font-size:1vw; background-color:#04B4B4; border:0px;">
                    Cuisine
                    </button>
                    <div class="dropdown-menu" aria-labelledby="cuisineDropdown" style="overflow-y:scroll; max-height:10em;">
                    <a class="dropdown-item">American</a>
                    <a class="dropdown-item">Brazilian</a>
                    <a class="dropdown-item">Chinese</a>
                    <a class="dropdown-item">English</a>
                    <a class="dropdown-item">French</a>
                    <a class="dropdown-item">German</a>
                    <a class="dropdown-item">Greek</a>
                    <a class="dropdown-item">Hungarian</a>
                    <a class="dropdown-item">Indian</a>
                    <a class="dropdown-item">Italian</a>
                    <a class="dropdown-item">Japanese</a>
                    <a class="dropdown-item">Mediterranean</a>
                    <a class="dropdown-item">Middle-Eastern</a>
                    <a class="dropdown-item">Mexican</a>
                    <a class="dropdown-item">South-Asian</a>
                    <a class="dropdown-item">Scandanavian</a>
                    <a class="dropdown-item">Spanish</a>
                    </div>
                </div>

                <div class="dropdown">
                    <button type="button" id="mealDropdown" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-left:1.5em; margin-right:1.5em; width:10vw; font-size:1vw; background-color:#04B4B4; border:0px;">
                    Meal
                    </button>
                    <div class="dropdown-menu" aria-labelledby="mealDropdown" style="overflow-y:scroll; max-height:10em;">
                    <a class="dropdown-item">Breakfast</a>
                    <a class="dropdown-item">Lunch</a>
                    <a class="dropdown-item">Dinner</a>
                    <a class="dropdown-item">Desserts</a>
                    <a class="dropdown-item">Snacks</a>
                    <a class="dropdown-item">Other</a>
                    </div>
                </div>

                <div class="dropdown">
                    <button type="button" id="dietDropdown" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-left:1.5em; margin-right:1.5em; width:10vw; font-size:1vw; background-color:#04B4B4; border:0px;">
                    Diet
                    </button>
                    <div class="dropdown-menu" aria-labelledby="fdietDropdown" style="overflow-y:scroll; max-height:10em;">
                    <a class="dropdown-item">Vegan</a>
                    <a class="dropdown-item">Vegetarian</a>
                    <a class="dropdown-item">Gluten-Free</a>
                    <a class="dropdown-item">Halal</a>
                    <a class="dropdown-item">Kosher</a>
                    </div>
                </div>
                 */