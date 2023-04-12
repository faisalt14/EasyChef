import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import $ from 'jquery'
import SearchHeader from '../../components/SearchHeader'
import Button from 'react-bootstrap/Button'
import RecipeCard from '../../components/RecipeCard'


function SearchPage(props) {
    const [nextPage, setNextPage] = useState(false)
    const [cards, setCards] = useState([])
    let callingCards = false

    const infiniteScroll = (event) => {
        if (event.target.scrollHeight - event.target.scrollTop < (event.target.clientHeight + 10)){
            if (nextPage){
                callingCards = true
                $.ajax({
                    url: nextPage,
                    method: 'Get',
                    success: function(xhr){
                        console.log(xhr)
                        callingCards = false
                        setCards([...cards, ...xhr.results])
                        setNextPage(xhr.next)
                    },
                    error: function(xhr){
                        console.log(xhr)
                    }
                })
            }
        }
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/recipes/search/',
            method: 'Get',
            data: (props.searchParams['category'] ? props.searchParams : {category: 'Recipe'}),
            success: function(xhr){
                console.log(xhr)
                setCards(xhr.results)
                setNextPage(xhr.next)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    }, [props.searchParams])

    return(
        <>
        <SearchHeader searchParams={props.searchParams} setSearchParams={props.setSearchParams} searchPage={true}/>
        <div className='search-results-wrapper' id='searchResults' onScroll={infiniteScroll}>
            <div className='search-results-table'>
                {cards.map((cardInfo, index) => {
                    return <div className="card-wrapper-search" key={index}> <RecipeCard info={cardInfo} /> </div>
                })}
            </div>
            <div className='BTT-wrapper'>
                <Button className='BTT-button btn-secondary' onClick={() => {document.getElementById('searchResults').scrollTop = 0}}>
                    You've reached the end, click me to go back to the top!
                </Button>
            </div>
        </div>
        
        <div className='footer-space'></div>
        </>
    );
}

export default SearchPage;