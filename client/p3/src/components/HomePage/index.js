import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import $ from 'jquery'
import HomeRecipeCarousel from './HomeRecipeCarousel'
import SearchHeader from '../SearchHeader'

function HomePage(props) {
    const [popular, setPopular] = useState([])
    const [breakfast, setBreakfast] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])

    useEffect(() => {
        $.ajax({
            url: 'http://127.0.0.1:8000/recipes/',
            method: 'Get',
            success: function(xhr){
                //console.log(xhr)
                setPopular(xhr.Popular)
                setBreakfast(xhr.Breakfasts)
                setLunch(xhr.Lunches)
                setDinner(xhr.Dinners)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    }, [])

    return(
        <>
        <div>Navbar goes here</div>
        <SearchHeader />
        <div className='container-fluid carousel-table'>
            <div className='row'>
                <div className='col recipe-col'> <HomeRecipeCarousel category='0' cardInfo={breakfast} key='Breakfast_Carousel' /> </div>
                <div className='col recipe-col'> <HomeRecipeCarousel category='1' cardInfo={lunch} key='Lunch_Carousel' /> </div>
                <div className='col recipe-col'> <HomeRecipeCarousel category='2' cardInfo={dinner} key='Dinner_Carousel' /> </div>
            </div>
            <div className='row'>
                <div className='col recipe-col'> <HomeRecipeCarousel category='3' cardInfo={popular} key='Popular_Carousel' /> </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;