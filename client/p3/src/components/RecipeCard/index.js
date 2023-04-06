import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../Easy Chef Logo.png'
import Card from 'react-bootstrap/Card'
import { StarFill, StarHalf, Star, Stopwatch, BookmarkFill } from 'react-bootstrap-icons'
import $ from 'jquery'

function RecipeCard({info}) {
    const [id, setId] = useState(info.id)
    const [name, setName] = useState(info.name)
    const [chef, setChef] = useState(info.chef)
    const [img, setImg] = useState(media_or_default(info.media))
    const [rating, setRating] = useState(info.avg_rating)
    const [difficulty, setDifficulty] = useState(info.difficulty)
    const [cuisine, setCuisine] = useState(info.cuisine)
    const [meal, setMeal] = useState(info.meal)
    const [diet, setDiet] = useState(info.diet)
    const [cookTime, setCookTime] = useState(timeToStr(info.cooking_time))
    const [favs, setFavs] = useState(favShortener(parseInt(info.total_favs)))

    function media_or_default(mediaArray){
        if (mediaArray !== null){
            return 'localhost:8000/' + mediaArray[0]
        }
        return DefaultImage
    }

    function timeToStr(time){
        let cleanedTime = time.split(':')
        let result = ''
        let timeUnits = ['h', 'm']
        timeUnits.forEach((item, index) => {
            result += cleanedTime[index] + item
        })
        if (result[0] === "0"){
            return result.substring(1)
        }
        return result
    }

    function favShortener(i){
        if (i > 1000){
            if (i > 1000000){
                return (Math.round(i/100000) / 10) + "m"
            }
            return (Math.round(i/100)/10) + "k"
        }
        return i
    }

    function ratingStars(rating) {
        let result = [];
        let round_rating = Math.round(rating*2)/2
        for (let i = 0; i < 5; i++){
            if (i < round_rating && 0.5 === (round_rating - i)){
                result.push(<StarHalf className="rating-stars"/>)
            }
            else if (i < round_rating){
                result.push(<StarFill className="rating-stars"/>)
            }
            else{
                result.push(<Star className="rating-stars"/>)
            }
        }
        return result
    }

    const update = () => {
        
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/recipes/' + id + '/details/',
            method: 'Get',
            success: function(xhr){
                //console.log(xhr)
                setId(xhr.id)
                setName(xhr.name)
                setChef(xhr.chef)
                setDifficulty(xhr.difficulty)
                setMeal(xhr.meal)
                setDiet(xhr.diet)
                setCuisine(xhr.cuisine)
                if (xhr.media[0]){
                    setImg(xhr.media[0].media)
                }
                setRating(xhr.avg_rating)
                setCookTime(timeToStr(xhr.cooking_time))
                setFavs(favShortener(parseInt(xhr.total_favs)))
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
    }, [info])

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
                    {diet.split(',').map(diet_str => {
                        return <h5><span className="badge d-flex tag" key={diet_str + ' tag for ' + name + ' (' + id + ')'}>{diet_str}</span></h5>
                    })}
                </div>
            </div>
            <Card.Body>
                    <div className="recipe-info-wrapper">
                        <div className="rating-wrapper">
                            {ratingStars(rating)}
                        </div>
                        <div className="cook-time-fav-wrapper text-no-overflow cutoff">
                            <b>{cookTime}</b> <Stopwatch />
                            &nbsp;&nbsp;&nbsp;
                            <b>{favs}</b> <BookmarkFill color="#0DE7E7"/>
                        </div>
                    </div>
                    <h4 className="card-title text-no-overflow">{name}</h4>
                    <i className="text-no-overflow">{chef}</i>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;