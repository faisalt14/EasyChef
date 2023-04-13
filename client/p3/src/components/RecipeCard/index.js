import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../Easy Chef Logo.png'
import Card from 'react-bootstrap/Card'
import { StarFill, StarHalf, Star, Stopwatch, Bookmark } from 'react-bootstrap-icons'

function RecipeCard({info}) {
    const img = info.media ? 'http://127.0.0.1:8000' + info.media : DefaultImage

    function timeToStr(time){
        let cleanedTime = time.split(':')
        if (parseInt(cleanedTime[2]) > 30){
            cleanedTime[1] = parseInt(cleanedTime[1]) + 1
        }
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
            if (0.5 === (round_rating - i)){
                result.push(<StarHalf className="rating-stars" key={i}/>)
            }
            else if (i < round_rating){
                result.push(<StarFill className="rating-stars" key={i}/>)
            }
            else{
                result.push(<Star className="rating-stars" key={i}/>)
            }
        }
        return result
    }

    return(
        <Card className='recipe-card-wrapper'>
            <div className="card-img-tag-wrapper">
                <Card.Img className="card-img" variant="top" src={img} alt={img.split('/').slice(-1)} />
                <div className="tags-wrapper">
                    <h5 className={"badge tag " + info.difficulty.toLowerCase()}>{info.difficulty}</h5>
                    {[info.cuisine, info.meal].map((item, index) =>{
                        if(item !== ''){
                            return <h5 className="badge tag" key={index}>{item}</h5>
                        }
                        return null
                    })}
                    {info.diet.split(',').map((diet_str, index) => {
                        return <h5 className="badge tag" key={index}>{diet_str}</h5>
                    })}
                </div>
            </div>
            <Card.Body>
                <div className="recipe-info-wrapper">
                    <div className="rating-wrapper">
                        {ratingStars(info.avg_rating)}
                    </div>
                    <div className="cook-time-fav-wrapper text-no-overflow cutoff">
                        <b className="grey">{timeToStr(info.cooking_time)}</b> <Stopwatch />
                        &nbsp;&nbsp;&nbsp;
                        <b className="grey">{favShortener(parseInt(info.total_favs))}</b> <Bookmark />
                    </div>
                </div>
                <h4 className="card-title text-no-overflow"><b>{info.name}</b></h4>
                <i className="text-no-overflow">{info.chef}</i>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;