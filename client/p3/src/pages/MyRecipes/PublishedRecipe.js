import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../Easy Chef Logo.png'
import Card from 'react-bootstrap/Card'
import { StarFill, StarHalf, Star, Stopwatch, Bookmark } from 'react-bootstrap-icons'
import $ from 'jquery'
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


function PublishedRecipe({info}) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzQ0Njc5LCJpYXQiOjE2ODEzNDEwNzksImp0aSI6IjEyYjVhZmE4MTY4NzQ1MDFiNDU4ZDg0MzFmMTRlYmEyIiwidXNlcl9pZCI6Mn0.Zl12MHyv3fpclKYWVVowxPgu_0JCcz-RQhsiG84eQng";  
    const [id, setId] = useState(info.id)
    const [name, setName] = useState(info.name)
    const [chef, setChef] = useState(info.chef)
    const [img, setImg] = useState(DefaultImage)
    const [rating, setRating] = useState(info.avg_rating)
    const [difficulty, setDifficulty] = useState(info.difficulty ? info.difficulty : "");
    const [cuisine, setCuisine] = useState(info.cuisine ? info.cuisine : "");
    const [meal, setMeal] = useState(info.meal ? info.meal : "");
    const [diet, setDiet] = useState(info.diet ? info.diet : "");
    const [cookTime, setCookTime] = useState(timeToStr(info.cooking_time))
    const [favs, setFavs] = useState(favShortener(parseInt(info.total_favs)))
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/recipes/${id}/details`, { state: { scrollToTop: true } });
    };
    
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
    }, [info, id])

    return(
      <Card className='recipe-card-wrapper' onClick={handleCardClick}>
        <div className="card-img-tag-wrapper">
        <Card.Img className="card-img" variant="top" src={img} alt={img.split('/').slice(-1)} />
        <div className="tags-wrapper">
        {difficulty && <h5 className={"badge tag " + difficulty.toLowerCase()}>{difficulty}</h5>}
        {cuisine && <h5 className="badge tag">{cuisine}</h5>}
        {meal && <h5 className="badge tag">{meal}</h5>}
        {diet && diet.split(',').map((diet_str, index) => {
        return <h5 className="badge tag" key={index}>{diet_str}</h5>
        })}
        </div>
        </div>
        <Card.Body>
        <div className="recipe-info-wrapper">
          <div className="rating-wrapper">
            {ratingStars(rating)}
          </div>
          <div className="cook-time-fav-wrapper text-no-overflow cutoff">
            <b className="grey">{cookTime}</b> <Stopwatch />
            &nbsp;&nbsp;&nbsp;
            <b className="grey">{favs}</b> <Bookmark />
          </div>
        </div>
        <h4 className="card-title text-no-overflow"><b>{name}</b></h4>
        <i className="text-no-overflow">{chef}</i>
        <div className="card-buttons-wrapper d-flex justify-content-end">
        <button className="card-button" onClick={(e) => {
          e.stopPropagation();
          axios.delete(`http://127.0.0.1:8000/recipes/${id}/delete/`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(response => {
              // handle successful response
          })
          .catch(error => {
              // handle error
          });
      }}>Delete</button>
              <Link to={`/recipes/${id}/edit-recipe`}>
              <button className="card-button" onClick={(e) => {          
                e.stopPropagation();
}}>Edit</button>
            </Link>
        </div>
      </Card.Body>


        </Card>
    );
}

export default PublishedRecipe;
