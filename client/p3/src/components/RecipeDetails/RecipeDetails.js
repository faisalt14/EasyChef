import React, { useState, useCallback } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Star, StarFill, StarHalf, HeartFill, BookmarkFill, AlignCenter } from 'react-bootstrap-icons';
import ReviewForm from './ReviewForm';
import './style.css';
import Servings from './Servings';
import RecipeSteps from './RecipeSteps';
import RecipeCard from '../RecipeCard';
import LikeFav from './Interactions/LikeFav';

export const formatTime = (timeString) => {
  const timeParts = timeString.split(':').map(Number);
  const hours = timeParts[0];
  const minutes = timeParts[1];

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours} hr${hours > 1 ? 's' : ''} `;
  } else if (hours === 0 && minutes === 0) {
    formattedTime += `0 hr `;
  }
  
  if (minutes > 0) {
    formattedTime += `${minutes} min${minutes > 1 ? 's' : ''}`;
  } else if (hours === 0 && minutes === 0) {
    formattedTime += `0 mins`;
  }

  return formattedTime.trim();
};

function ratingStars(rating) {
  let result = [];
  let round_rating = Math.round(rating * 2) / 2;
  for (let i = 0; i < 5; i++) {
    if (i < round_rating && 0.5 === (round_rating - i)) {
      result.push(<StarHalf style={{color: '#E47E20'}} className="rating-stars me-1" key={i} />);
    } else if (i < round_rating) {
      result.push(<StarFill style={{color: '#E47E20'}} className="rating-stars me-1" key={i} />);
    } else {
      result.push(<Star style={{color: '#E47E20'}} className="rating-stars me-1" key={i} />);
    }
  }
  return result;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${monthName} ${ordinal(day)}, ${year}`;
};

function RecipeDetails({ recipe }) {
  const {
    id,
    chef,
    name,
    avg_rating,
    total_reviews,
    difficulty,
    cuisine,
    meal,
    diet,
    total_time,
    prep_time,
    cooking_time,
    media,
    based_on,
    total_likes,
    total_favs,
    published_time,
    servings_num,
    steps,
    ingredients, 
    interactions
  } = recipe;

  const based_onInfo = {
    id: based_on,
    name: '',
    chef: '',
    avg_rating: 0,
    difficulty: '',
    cuisine: '',
    meal: '',
    diet: '',
    cooking_time: '',
    total_favs: 0,
  };

  const [totalLikes, setTotalLikes] = useState(total_likes);
  const [totalFavs, setTotalFavs] = useState(total_favs);

  // Split ingredients into two columns
  const half = Math.ceil(ingredients.length / 2);
  const [servings, setServings] = useState(servings_num);
  const [displayedIngredients, setDisplayedIngredients] = useState(ingredients);

  const handleServingsChange = (newServings) => {
    setServings(newServings);
    const updatedIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: Math.ceil((ingredient.quantity / servings_num) * newServings),
    }));
    setDisplayedIngredients(updatedIngredients);
  };

  const updateTotalLikes = useCallback((total_likes) => {
    setTotalLikes(total_likes);
  }, []);
  
  const updateTotalFavs = useCallback((total_favs) => {
    setTotalFavs(total_favs);
  }, []);
  
  return (
    <div style={{fontFamily: 'Roboto'}}>
<Carousel>
  {media.map((imageObj, index) => (
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={imageObj.media}
        alt={`Image ${index}`}
        style={{ height: '35rem', objectFit: 'contain' }}
      />
    </Carousel.Item>
  ))}
</Carousel>

      <div className="container-fluid padding" style={{ backgroundColor: 'white', fontFamily: 'Roboto'}}>
        <div className="row welcome text-center">
          <div className="col-12 mt-3">
            <h2 style={{ fontSize: '1.8rem', fontWeight:'400' }}>{chef}</h2>
            <h1 style={{ fontWeight: 700 }}>{name}</h1>
          </div>
        </div>

        <div className="row justify-content-center text-center" style={{ maxWidth: "20rem", marginTop:'-10px', color: "#656767", fontSize: "18px", display: 'block', marginLeft: 'auto', marginRight:'auto' }}>Updated on: {formatDate(published_time)}</div>

        <div className="row justify-content-center" style={{ padding: 0, marginTop:'-10px', marginBottom: '-50px' }}>
        <div className="col-md-6" style={{ maxWidth: "11rem" }}>
            <div style={{ flex: 0.75, fontSize: "1.5em", color: "#E47E20" }}>
              {ratingStars(avg_rating)}
            </div>
          </div>
          <div className="col-md-6 mt-1" style={{ maxWidth: "8rem", color: "#656767", fontSize: "20px" }}>
            <p style={{ marginTop:'2px' }}>{total_reviews} {total_reviews === 1 ? 'Review' : 'Reviews'}</p>
          </div>
          <hr
            className="my-4"
            style={{
              width: "200%",
              position: "relative",
              top: "-25px",
            }}
          />
        </div>
        
        <div className="row justify-content-center">
      <div className="col-xs-12 col-sm-4 col-md-4 mb-3 mt-3 text-center ms-3" style={{ maxWidth: '29rem', borderRight: '1px solid #c8cccc' }}>
          {difficulty && (
      <p style={{ fontSize: '20px' }}>
        Difficulty: <span style={{ fontWeight: 500 }}>{difficulty}</span>
      </p>
    )}
    {cuisine && (
      <p style={{ fontSize: '20px' }}>
        Cuisine: <span style={{ fontWeight: 500 }}>{cuisine}</span>
      </p>
    )}
    {meal && (
      <p style={{ fontSize: '20px' }}>
        Meal: <span style={{ fontWeight: 500 }}>{meal}</span>
      </p>
    )}
    {diet && (
      <p style={{ fontSize: '20px' }}>
        Diet: <span style={{ fontWeight: 500 }}>{diet}</span>
      </p>
    )}

      </div>
      <div className="col-xs-12 col-sm-4 col-md-4 mb-3 mt-3 text-center" style={{ maxWidth: '29rem', borderRight: '1px solid #c8cccc' }}>
        <p style={{ fontSize: '20px' }}>Total time: <span style={{ fontWeight: 500 }}>{formatTime(total_time)}</span> </p>
        <p style={{ fontSize: '20px' }}>Prep time: <span style={{ fontWeight: 500 }}>{formatTime(prep_time)}</span> </p>
        <p style={{ fontSize: '20px' }}>Cooking time: <span style={{ fontWeight: 500 }}>{formatTime(cooking_time)}</span> </p>
      </div>
      <div className="col-xs-12 col-sm-4 col-md-4 mb-3 mt-3 text-center" style={{ maxWidth: '29rem' }}>
        <div className="d-flex justify-content-between">
        <LikeFav
        recipeId={id}
        fav_number={total_favs}
        like_number={total_likes}     
        updateTotalLikes={updateTotalLikes}
        updateTotalFavs={updateTotalFavs} />
          {/* <div className="row justify-content-center" style={{ margin: 'auto' }}>
            <div className="col">
              <HeartFill style={{ fontSize: '25px', color: '#04B4B4', cursor: 'pointer' }} />
              <p style={{ fontSize: '20px', marginTop: '1px' }}>{total_likes}</p>
            </div>
            <div className="col">
              <BookmarkFill style={{ fontSize: '25px', color: '#04B4B4', cursor: 'pointer' }} />
              <p style={{ fontSize: '20px', marginTop: '1px' }}>{total_favs}</p>
            </div>
          </div> */}
        </div>
        <div className="row d-flex justify-content-center">
        <Link to={`/recipes/${id}/remix-recipe`}>
        <button
          type="button"
          className="btn ms-3 ps-4 pe-4"
          style={{
            backgroundColor: '#04B4B4',
            color: 'white',
            fontSize: '17px',
            maxWidth: '20rem',
            fontWeight: '500',
          }}
        >
          Remix Recipe
        </button>
      </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <button type="button" className="btn mt-2 ms-3" style={{ backgroundColor: '#04B4B4', color: 'white', maxWidth: '9.5rem', fontSize: '17px' }}><a href="#reviews" style={{ textDecoration: 'none', color:"white", fontWeight:'500' }}>Leave a Review</a></button>
        </div>
      </div>
      {based_on && (
  <div className="based-on-container">
    <div className="based-on-text-wrapper">
      <p style={{ maxWidth: "10rem", fontSize: "25px", fontWeight: "550" }}>Based on:</p>
    </div>
    <div className="based-on-card-wrapper">
      <RecipeCard info={based_onInfo} />
    </div>
  </div>
)}

    </div>
    <div className="mt-5" style={{ padding: "1rem", borderRadius: "5px", width:'80%', marginLeft: 'auto', marginRight: 'auto'}}>
  <h1 className="justify-content-center text-center" style={{ color: "#E47E20", fontWeight: "550", marginBottom: "0.5rem" }}>
  Ingredients
    </h1>
    <hr style={{ height: '7px', opacity: 0.8, backgroundColor: '#E47E20', border: 'none' }}></hr>
    
</div>
<div className="row mx-auto" style={{ maxWidth: '40%' }}>
        <div className="col-6 mt-2 d-flex flex-column align-items-start" style={{padding:0, margin:0}}>
          {displayedIngredients.slice(0, half).map((ingredient, index) => (
            <div key={index} className="d-flex align-items-start mb-2 me-5">
              <i
                style={{
                  maxWidth: '2rem',
                  fontSize: '16px',
                  color: '#04B4B4',
                }}
                className="bi bi-circle-fill"
              ></i>
              <p className="mb-0 ms-2" style={{ fontSize: '18px' }}>
                {ingredient.quantity} {ingredient.unit}{' '}
                <span style={{ fontWeight: '500' }}>{ingredient.name}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="col-6 mt-2 d-flex flex-column align-items-start" style={{padding:0, margin:0}}>
          {displayedIngredients.slice(half).map((ingredient, index) => (
            <div key={index} className="d-flex align-items-start mb-2">
              <i
                style={{
                  maxWidth: '2rem',
                  fontSize: '16px',
                  color: '#04B4B4',
                }}
                className="ms-5 bi bi-circle-fill"
              ></i>
              <p className="mb-0 ms-2" style={{ fontSize: '18px' }}>
                {ingredient.quantity} {ingredient.unit}{' '}
                <span style={{ fontWeight: '500' }}>{ingredient.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      <Servings initialServings={servings_num} onServingsChange={handleServingsChange} recipe_id={id}/>
      <div className="mt-5" style={{ padding: "1rem", borderRadius: "5px", width:'80%', marginLeft: 'auto', marginRight: 'auto'}}>
  <h1 className="justify-content-center text-center" style={{ color: "#E47E20", fontWeight: "550", marginBottom: "0.5rem" }}>
  Directions
    </h1>
    <hr style={{ height: '7px', opacity: 0.8, backgroundColor: '#E47E20', border: 'none' }}></hr>
    
</div>
      <RecipeSteps steps={steps} 
      />
      <div id="reviews">
      <ReviewForm interactions={interactions} id={id}/>
      </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
