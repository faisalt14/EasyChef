import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import $ from 'jquery'
import SearchHeader from '../../components/SearchHeader'
import Button from 'react-bootstrap/Button'
import RecipeCard from '../../components/RecipeCard'
//import SearchParamsContext from '../../contexts/SearchParamsContext'


function SearchPage(props) {
    const [nextPage, setNextPage] = useState(false)
    const [cards, setCards] = useState([])
    let callingCards = false

    const infiniteScroll = () => {
        if (window.scrollY >= (window.screen.availHeight - document.body.clientHeight) && (!callingCards)){
            if (nextPage){
                callingCards = true
                console.log('hello')
                /*$.ajax({
                    url: '',
                    method: 'Get',
                    success: function(xhr){
                        console.log(xhr)
                        callingCards = false
                        setNextPage(xhr.next)
                    },
                    error: function(xhr){
                        console.log(xhr)
                    }
                })*/
            }
            else{
                //display button?
            }
        }
    }

    //document.addEventListener('scroll', infiniteScroll)

    useEffect(() =>{
        console.log(props.searchParams)
        if (props.searchParams['category']){
            $.ajax({
                url: 'http://127.0.0.1:8000/recipes/search/',
                method: 'Get',
                data: (props.searchParams['category'] ? props.searchParams : {category: 'Recipe'}),
                success: function(xhr){
                    console.log(xhr)
                    setCards(xhr.results)
                },
                error: function(xhr){
                    console.log(xhr)
                }
            })
        }
    }, [props.searchParams])

    return(
        <>
        <SearchHeader searchParams={props.searchParams} setSearchParams={props.setSearchParams} searchPage={true}/>
        <div className='search-results-wrapper'>
            {cards.map((cardInfo, index) => {
                return <RecipeCard info={cardInfo} key={index}/>
            })}
        </div>
        <div className='BTT-wrapper'>
            <Button className='BTT-button btn-secondary' onClick={() => {window.scrollTo({top: 0, behavior: 'smooth',})}}>
                You've reached the end, click me to go back to the top!
            </Button>
        </div>
        <div className='footer-space'></div>
        </>
    );
}

export default SearchPage;