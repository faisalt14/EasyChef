import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../egg.jpg'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { StarFill, Stopwatch, BookmarkFill } from 'react-bootstrap-icons'
import $ from 'jquery'

function RecipeCard({info}) {
    const [id, setId] = useState(info.id)
    const [name, setName] = useState(info.name)
    const [chef, setChef] = useState(info.chef)
    const [img, setImg] = useState(DefaultImage)
    const [rating, setRating] = useState(info.avg_rating)
    const [difficulty, setDifficulty] = useState(info.difficulty)
    const [cuisine, setCuisine] = useState(info.cuisine)
    const [meal, setMeal] = useState(info.meal)
    const [diet, setDiet] = useState(info.diet)
    const [cookTime, setCookTime] = useState(timeToStr(info.cooking_time))
    const [favs, setFavs] = useState(info.total_favs)

    function timeToStr(time){
        let cleanedTime = time.split(':')
        let result = ''
        let timeUnits = ['h', 'm']
        timeUnits.forEach((item, index) => {
            result += cleanedTime[index] + item
        })
        return result
    }

    const update = () => {
        $.ajax({
            url: 'http://127.0.0.1:8000/' + id + '/details/',
            method: 'Get',
            success: function(xhr){
                setId(xhr.data.id)
                setName(xhr.data.name)
                setChef(xhr.data.chef)
                setDifficulty(xhr.data.difficulty)
                setMeal(xhr.data.meal)
                setDiet(xhr.data.diet.split(',')[0])
                setCuisine(xhr.data.cuisine)
                setCookTime(xhr.data.cooking_time)
                setImg(xhr.data.media[0].media)
                setRating(Math.round(xhr.data.avg_rating))
                setCookTime(xhr.data.cooking_time)
                setFavs(xhr.data.total_favs)
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    }

    function ratingStars(rating) {
        let result = [];
        for (let i = 0; i < 5; i++){
            if (i < rating){
                result.push(<StarFill className="rating-stars" color="#E47E20" />)
            }
            else{
                result.push(<StarFill className="rating-stars" />)
            }
        }
        return result
    }

    useEffect(() =>{

    })

    return(
        <Card className='recipe-card-wrapper' id={'Card-' + id + '-Home'}>
            <div className="d-flex card-img-tag-wrapper">
                <Card.Img className="card-img" variant="top" src={img} alt="preview image" />
                <div className="tags-wrapper">
                    <h5><span className={"badge d-flex tag " + difficulty.toLowerCase()}>{difficulty}</span></h5>
                    {[cuisine, meal].map(item =>{
                        if(item !== ''){
                            return <h5><span className="badge d-flex tag" >{item}</span></h5>
                        }
                    })}
                    {diet.split(',').map(diet => {
                        return <h5><span className="badge d-flex tag" >{diet}</span></h5>
                    })}
                </div>
            </div>
            <Card.Body>
                    <div className="recipe-info-wrapper">
                        <div className="rating-wrapper">
                            {ratingStars(rating)}
                        </div>
                        <div className="cook-time-fav-wrapper text-no-overflow cutoff">
                            <b>{cookTime}</b>
                            <Stopwatch />
                        </div>
                        <div className="cook-time-fav-wrapper text-no-overflow cutoff">
                            <b>{favs}</b>
                            <BookmarkFill />
                        </div>
                    </div>
                    <h4 className="card-title text-no-overflow">{name}</h4>
                    <i className="text-no-overflow">{chef}</i>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;