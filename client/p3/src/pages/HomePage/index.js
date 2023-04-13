import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import $ from 'jquery'
import HomeRecipeCarousel from './HomeRecipeCarousel'
import SearchHeader from '../../components/SearchHeader'

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
        <SearchHeader searchParams={props.searchParams} setSearchParams={props.setSearchParams} />
        <div className='container-fluid carousel-table'>
            <div className='row'>
                <div className='col recipe-col'> <HomeRecipeCarousel category='0' cardInfo={breakfast} key='Breakfast_Carousel' searchParams={props.searchParams} setSearchParams={props.setSearchParams} /> </div>
                <div className='col recipe-col'> <HomeRecipeCarousel category='1' cardInfo={lunch} key='Lunch_Carousel' searchParams={props.searchParams} setSearchParams={props.setSearchParams} /> </div>
                <div className='col recipe-col'> <HomeRecipeCarousel category='2' cardInfo={dinner} key='Dinner_Carousel' searchParams={props.searchParams} setSearchParams={props.setSearchParams} /> </div>
            </div>
            <div className='row'>
                <div className='col recipe-col'> <HomeRecipeCarousel category='3' cardInfo={popular} key='Popular_Carousel' searchParams={props.searchParams} setSearchParams={props.setSearchParams} /> </div>
            </div>
        </div>
        </>
    );
}
