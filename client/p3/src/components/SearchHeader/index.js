import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import Form from 'react-bootstrap/Form'
import $ from 'jquery'
import CookingTime from '../Filters/CookingTime'
import Cuisine from '../Filters/Cuisine'
import Diet from '../Filters/Diet'
import Meal from '../Filters/Meal'
import SearchCategory from '../Filters/SearchCategory'

function SearchHeader(props) {
    const [query, setQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedCookingTime, setSelectedCookingTime] = useState(null)
    const [selectedCuisine, setSelectedCuisine] = useState(null)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [selectedDiets, setSelectedDiets] = useState([])

    const handleKeyPress = (event) =>{
        setQuery(document.getElementById("searchBar") ? document.getElementById("searchBar").value : '')
        if (event.key == 'Enter'){
            searchAjax()
        }
    }

    const searchAjax = () => {
        let categoryDict = {0: 'Recipe', 1: 'User', 2: 'Ingredient'}
        $.ajax({
            url: 'http://127.0.0.1:8000/recipes/search/',
            method: 'Get',
            data: {
                query: query,
                category: (selectedCategory ? categoryDict[selectedCategory.value] : categoryDict[0]),
                cooking_time: (selectedCookingTime ? selectedCookingTime.value : 0),
                cuisine: (selectedCuisine ? selectedCuisine.value : 14),
                meal: (selectedMeal ? selectedMeal.value : 6),
                diet: (selectedDiets.toString() ? selectedDiets.toString() : 6),
            },
            success: function(xhr){
                console.log(xhr)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
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
        <div className="search-wrapper">
            <div className="search-bg"></div>
            <h1 className="search-title">
                Search for Recipes
            </h1>
            <div className="search-bar-wrapper">
                <input className="search-bar" type="text" id="searchBar" name="search" onKeyUp={handleKeyPress} ></input>
                <input className="search-submit" type="button" value="Search" onClick={() => {searchAjax()}}></input>
            </div>
            
            <div className="search-filters-wrapper">
                <div className="search-dropdown-wrapper">
                    <SearchCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                </div>
                <div className="search-dropdown-wrapper">
                    <CookingTime selectedCookingTime={selectedCookingTime} setSelectedCookingTime={setSelectedCookingTime}/>
                </div>
                <div className="search-dropdown-wrapper">
                    <Cuisine selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine}/>
                </div>
                <div className="search-dropdown-wrapper">
                    <Meal selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal}/>
                </div>
                <div className="search-dropdown-wrapper">
                    <Diet selectedDiets={selectedDiets} setSelectedDiets={setSelectedDiets}/>
                </div>
            </div>
        </div>
    );
}

export default SearchHeader;

/*
<Modal 
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>User Information</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="center-wrapper" style={{textAlign: 'center', marginTop:"1rem", marginBottom: "2rem",}}>
                    <img className="profile-pic" src={defaultPFP} alt={defaultPFP}></img>
                </div>
                <div className="container-fluid">
                    <div className="row bottom-margin-1rem">
                        <ProfileDetailText category='First Name' info={fname}/>
                        <ProfileDetailText category='Last Name' info={lname}/>
                    </div>
                    <div className="row bottom-margin-1rem">
                        <ProfileDetailText category='UserName' info={username}/>
                        <ProfileDetailText category='Email Address' info={email}/>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button  className="close-button">Edit</Button>
                <Button onClick={props.onHide} className="close-button">Close</Button>
            </Modal.Footer>
        </Modal>
         */