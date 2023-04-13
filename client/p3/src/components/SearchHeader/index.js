import React, { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import CookingTime from '../Filters/CookingTime'
import Cuisine from '../Filters/Cuisine'
import Diet from '../Filters/Diet'
import Meal from '../Filters/Meal'
import SearchCategory from '../Filters/SearchCategory'
import { Search } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

function SearchHeader(props) {
    const [query, setQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedCookingTime, setSelectedCookingTime] = useState(null)
    const [selectedCuisine, setSelectedCuisine] = useState(null)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [selectedDiets, setSelectedDiets] = useState([])
    let navigate = useNavigate()

    const handleKeyPress = (event) =>{
        setQuery(event.target.value)
        if (event.key === 'Enter'){
            searchRedirect()
        }
    }

    const searchRedirect = () => {
        let categoryDict = {0: 'Recipe', 1: 'User', 2: 'Ingredients'}
        let dietsField = ''
        for (let [key, value] of Object.entries(selectedDiets)){
            dietsField = dietsField + value.value + ','
        }
        dietsField = dietsField.slice(0, -1)
        props.setSearchParams({
            query: query,
            category: (selectedCategory ? categoryDict[selectedCategory.value] : categoryDict[0]),
            cooking_time: (selectedCookingTime ? selectedCookingTime.value : 0),
            cuisine: (selectedCuisine ? selectedCuisine.value : 14),
            meal: (selectedMeal ? selectedMeal.value : 6),
            diet: (dietsField ? dietsField : 6)
        })
        if (!props.searchPage){
            navigate('/search/')
        }
    }

    return(
        <div className="search-wrapper">
            <div className="search-bg"></div>
            <h1 className="search-title">
                Search for Recipes
            </h1>
            <div className="search-bar-wrapper">
                <Search className="magnifying-glass-icon" style={{cursor:'pointer'}} onClick={searchRedirect} />
                <input className="search-bar" type="text" id="searchBar" name="search" onKeyUp={handleKeyPress} placeholder="Search for a Recipe..."></input>
            </div>
            
            <div className="search-filters-wrapper">
                <div className="search-dropdown-wrapper">
                    <SearchCategory 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                    fontSize='calc(0.5rem + 0.5vw)' 
                    height='calc(1rem + 1vw)'/>
                </div>
                <div className="search-dropdown-wrapper">
                    <CookingTime 
                    selectedCookingTime={selectedCookingTime} 
                    setSelectedCookingTime={setSelectedCookingTime} 
                    fontSize='calc(0.5rem + 0.5vw)' 
                    height='calc(1rem + 1vw)'/>
                </div>
                <div className="search-dropdown-wrapper">
                    <Cuisine 
                    selectedCuisine={selectedCuisine} 
                    setSelectedCuisine={setSelectedCuisine} 
                    fontSize='calc(0.5rem + 0.5vw)' 
                    height='calc(1rem + 1vw)'/>
                </div>
                <div className="search-dropdown-wrapper">
                    <Meal 
                    selectedMeal={selectedMeal} 
                    setSelectedMeal={setSelectedMeal} 
                    fontSize='calc(0.5rem + 0.5vw)' 
                    height='calc(1rem + 1vw)'/>
                </div>
            </div>
            <div className="diet-filter-wrapper">
                <Diet 
                selectedDiets={selectedDiets} 
                setSelectedDiets={setSelectedDiets} 
                fontSize='calc(0.5rem + 0.5vw)' 
                height='calc(2*calc(1rem + 1vw))'/>
            </div>
        </div>
    );
}

export default SearchHeader;