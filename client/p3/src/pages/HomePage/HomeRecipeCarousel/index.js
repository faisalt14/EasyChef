import React, { useEffect, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { ArrowRight } from 'react-bootstrap-icons'
import RecipeCard from '../../../components/RecipeCard'
import { useNavigate } from 'react-router-dom'


function HomeRecipeCarousel(props) {
    const categoryDict = {'0': ['Breakfasts', 0],
                          '1': ['Lunches', 1],
                          '2': ['Dinners', 2],
                          '3': ['Popular', 3]}
    const navigate = useNavigate()

    const handleClick = (meal) => {
        if (meal === 3){
            navigate('/recipes')
        }
        else{
           props.setSearchParams({
            category: 'Recipe',
            meal: meal
           })
            navigate('/search/')
        }
    }

    return(
        <div className='recipe-carousel'>
        <div className="recipe-carousel-header">
            <a className="nav-link btn" onClick={() => {handleClick(categoryDict[props.category][1])}}> {categoryDict[props.category][0]} <ArrowRight /></a>
          </div>
        <div className="recipe-carousel-cards">
            {props.cardInfo.map((cardInfo, index) => {
                return <RecipeCard info={cardInfo} key={index}/>
            })}
        </div>
        </div>
    );
}

export default HomeRecipeCarousel;