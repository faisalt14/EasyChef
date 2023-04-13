import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import DefaultImage from '../../Easy Chef Logo.png'
import Card from 'react-bootstrap/Card'
import { StarFill, StarHalf, Star, Stopwatch, Bookmark, BookmarkFill, HeartFill, Heart, ChatFill } from 'react-bootstrap-icons'
import $ from 'jquery'
import { useNavigate  } from 'react-router-dom';
import jwt_decode from 'jwt-decode';



function RecentRecipes({info}) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzM1ODk4LCJpYXQiOjE2ODEzMzIyOTgsImp0aSI6IjMwYjJmODJlM2E3MDQzOWQ4ZDM1ZTYyOWMyMGJmMjFjIiwidXNlcl9pZCI6Mn0.F2S-bhDsLF3NSBnvdvh7TFv3rSJSgqsJe3qNA3Jwvg0";  
  const decodedToken = jwt_decode(token);
  const currentUserId = decodedToken.user_id;

  const [id, setId] = useState(info.id)
  const [name, setName] = useState(info.name)
  const [chef, setChef] = useState(info.chef)
  const [img, setImg] = useState(DefaultImage)
  const [rating, setRating] = useState(info.avg_rating)
  const [difficulty, setDifficulty] = useState(info.difficulty ? info.difficulty : "");
  const [cuisine, setCuisine] = useState(info.cuisine ? info.cuisine : "");
  const [meal, setMeal] = useState(info.meal ? info.meal : "");
  const [diet, setDiet] = useState(info.diet ? info.diet : "");
  const [cookTime, setCookTime] = useState(info.cooking_time ? timeToStr(info.cooking_time) : '');
  const [favs, setFavs] = useState(favShortener(parseInt(info.total_favs)))
  const [liked, setLiked] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [commented, setCommented] = useState(false);
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

  useEffect(() => {
    $.ajax({
      url: `http://127.0.0.1:8000/recipes/${id}/details/`,
      method: 'GET',
      success: function(xhr) {
        setId(xhr.id)
        setName(xhr.name)
        setChef(xhr.chef)
        setDifficulty(xhr.difficulty)
        setMeal(xhr.meal)
        setDiet(xhr.diet)
        setCuisine(xhr.cuisine)
        if (xhr.media[0]) {
          setImg(xhr.media[0].media)
        }
        setRating(xhr.avg_rating)
        setCookTime(timeToStr(xhr.cooking_time))
        setFavs(favShortener(parseInt(xhr.total_favs)))
  
        // check user interactions
        const userId = currentUserId;  // implement this function
        if (xhr.interactions.length > 0) {
          const interaction = xhr.interactions.filter(interaction => interaction.user_id === userId)[0]
          if (interaction) {
            if (interaction.comment !== "") {
              setCommented(true);
            }
            if (interaction.like === "true") {
              setLiked(true);

            }
            if (interaction.favourite === "true") {
              setFavourited(true);
            }
          }
        }
      },
      error: function(xhr) {
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
            <div className="bookmark-wrapper ms-1" style={{ position: 'absolute', left: '0px', top: '4px', color:"#04B4B4"}}>
                {favourited ? <BookmarkFill size={28} style={{color:"#04B4B4", backgroundColor: "#04B4B4"}}/> : <BookmarkFill size={28}/>}
                {commented && <ChatFill size={28} className=" ms-2 interaction-icon"/>}
                {liked && <HeartFill size={28} className="interaction-icon"/>}
            </div>
            <div className="recipe-info-wrapper">
                <div className="rating-wrapper">
                    {ratingStars(rating)} 
                </div>
                <div className="cook-time-fav-wrapper text-no-overflow cutoff">
                    <b className="grey">{cookTime}</b> <Stopwatch />
                    &nbsp;&nbsp;&nbsp;
                    <b className="grey">{favs}</b> {liked ? <HeartFill /> : <Heart />}
                </div>
            </div>
            <h4 className="card-title text-no-overflow"><b>{name}</b></h4>
            <i className="text-no-overflow">{chef}</i>
        </Card.Body>
    </Card>
  );
            }  
export default RecentRecipes;
