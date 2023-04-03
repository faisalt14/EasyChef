import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../egg.jpg'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { StarFill } from 'react-bootstrap-icons'
import $ from 'jquery'

function RecipeCard({info}) {
    const [id, setId] = useState(info.id)
    const [name, setName] = useState(info.name)
    const [chef, setChef] = useState('info.chef')
    const [img, setImg] = useState(DefaultImage)
    const [rating, setRating] = useState(info.avg_rating)
    const [difficulty, setDifficulty] = useState('info.difficulty')
    const [cuisine, setCuisine] = useState('info.cuisine')
    const [meal, setMeal] = useState('info.meal')
    const [diet, setDiet] = useState('info.diet')
    const [cookTime, setCookTime] = useState('info.cooking_time')


    const update = () => {
    }

    function ratingStars(rating) {
        let result = [];
        for (let i = 0; i < 5; i++){
            if (i < rating){
                result.push(<StarFill color="#E47E20" />)
            }
            else{
                result.push(<StarFill />)
            }
        }
        return result
    }

    useEffect(() =>{
        $.ajax({
            url: 'http://127.0.0.1:8000/' + id + '/details/',
            method: 'Get',
            success: function(xhr){
                console.log(xhr)
                setName(xhr.data.name)
                setChef(xhr.data.chef)
                setDifficulty(xhr.data.difficulty)
                setMeal(xhr.data.meal)
                setDiet(xhr.data.diet.split(',')[0])
                setCuisine(xhr.data.cuisine)
                setCookTime(xhr.data.cooking_time)
                setImg(xhr.data.media[0].media)
                setRating(Math.round(xhr.data.avg_rating))
            },
            error: function(xhr){
                console.log(xhr)
            }
        })
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
            <Card.Body style={{paddingBottom:'0px', paddingTop:'0px'}}>
                <Card.Text >
                    <div className="rating-wrapper">
                        {ratingStars(rating)}
                    </div>
                    <h5 style={{paddingBottom:'0px'}}>{name}</h5>
                    <div style={{paddingTop:'0px'}}>{chef}</div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;