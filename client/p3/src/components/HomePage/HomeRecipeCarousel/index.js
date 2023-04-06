import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import { ArrowRight } from 'react-bootstrap-icons'
import RecipeCard from '../../RecipeCard'

function HomeRecipeCarousel(props) {
    
    const categoryDict = {'0': ['Breakfasts', 0],
                          '1': ['Lunches', 1],
                          '2': ['Dinners', 2],
                          '3': ['Popular', 3]}
    const [category, setCategory] = useState(categoryDict[props.category][0])
    const [cardInfo, setCardInfo] = useState(props.cardInfo)

    useEffect(() =>{
        setCardInfo(props.cardInfo)
    }, [props])

    return(
        <div className='recipe-carousel'>
        <div className="recipe-carousel-header">
            <a className="nav-link btn" href="#">{category} <ArrowRight /></a>
          </div>
        <div className="recipe-carousel-cards">
            {cardInfo.map((cardInfo, index) => {
                return <RecipeCard info={cardInfo} key={index}/>
            })}
        </div>
        </div>
    );
}

export default HomeRecipeCarousel;