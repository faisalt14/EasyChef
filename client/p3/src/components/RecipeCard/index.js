import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../egg.jpg'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { StarFill, Stopwatch, BookmarkFill } from 'react-bootstrap-icons'
import $ from 'jquery'

function RecipeCard({info}) {
    const [id, setId] = useState('info.id')
    const [name, setName] = useState('info.name')
    const [chef, setChef] = useState('info.chef')
    const [img, setImg] = useState(DefaultImage)
    const [rating, setRating] = useState('info.avg_rating')
    const [difficulty, setDifficulty] = useState('info.difficulty')
    const [cuisine, setCuisine] = useState('info.cuisine')
    const [meal, setMeal] = useState('info.meal')
    const [diet, setDiet] = useState('info.diet')
    const [cookTime, setCookTime] = useState('info.cooking_time')
    const [favs, setFavs] = useState('info.total_favs')


    const update = () => {
        $.ajax({
            url: 'http://127.0.0.1:8000/' + id + '/details/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
                setName({name: xhr.data.name})
                setChef({chef: xhr.data.chef})
                setDifficulty({difficulty: xhr.data.difficulty})
                setMeal({meal: xhr.data.meal})
                setDiet({diet: xhr.data.diet.split(',')[0]})
                setCuisine({cuisine: xhr.data.cuisine})
                setCookTime({cookTime: xhr.data.cooking_time})
                setImg({img: xhr.data.media[0].media})
                setRating({rating: Math.round(xhr.data.avg_rating)})
                setCookTime({cookTime: xhr.data.cooking_time})
                setFavs({favs: xhr.data.total_favs})
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
        <Card className='recipe-card-wrapper'>
            <div className="d-flex card-img-tag-wrapper">
                <Card.Img className="card-img" variant="top" src={img} alt="preview image" />
                <div className="tags-wrapper">
                    <h5><span className="badge d-flex tag easy">{difficulty}</span></h5>
                    <h5><span className="badge d-flex tag" >{cuisine}</span></h5>
                    <h5><span className="badge d-flex tag" >{meal}</span></h5>
                    <h5><span className="badge d-flex tag" >{diet}</span></h5>        
                </div>
            </div>
            <Card.Body>
                    <div className="recipe-info-wrapper">
                        <div className="rating-wrapper">
                            {ratingStars(rating)}
                        </div>
                        <div className="cook-time-fav-wrapper">
                            <b>3h15m{/*cookTime*/}</b>
                            <Stopwatch />
                        </div>
                        <div className="cook-time-fav-wrapper">
                            <b>300{/*favs*/}</b>
                            <BookmarkFill />
                        </div>
                    </div>
                    <h4 className="card-title">{name}</h4>
                    <i>{chef}</i>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;