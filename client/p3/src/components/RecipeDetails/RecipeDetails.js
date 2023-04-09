import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Star, StarFill, StarHalf, HeartFill, BookmarkFill } from 'react-bootstrap-icons';
import ReviewForm from './ReviewForm';

const formatTime = (timeString) => {
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
    published_time
  } = recipe;

  return (
    <div style={{fontFamily: 'Roboto'}}>
    <Carousel>
      {media.map((imageObj, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={imageObj.media}
            alt={`Image ${index}`}
            style={{ height: '35rem', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>


      <div className="container-fluid padding" style={{ backgroundColor: 'white' }}>
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
        Difficulty: <span style={{ fontWeight: 550 }}>{difficulty}</span>
      </p>
    )}
    {cuisine && (
      <p style={{ fontSize: '20px' }}>
        Cuisine: <span style={{ fontWeight: 550 }}>{cuisine}</span>
      </p>
    )}
    {meal && (
      <p style={{ fontSize: '20px' }}>
        Meal: <span style={{ fontWeight: 550 }}>{meal}</span>
      </p>
    )}
    {diet && (
      <p style={{ fontSize: '20px' }}>
        Diet: <span style={{ fontWeight: 550 }}>{diet}</span>
      </p>
    )}

      </div>
      <div className="col-xs-12 col-sm-4 col-md-4 mb-3 mt-3 text-center" style={{ maxWidth: '29rem', borderRight: '1px solid #c8cccc' }}>
        <p style={{ fontSize: '20px' }}>Total time: <span style={{ fontWeight: 550 }}>{formatTime(total_time)}</span> </p>
        <p style={{ fontSize: '20px' }}>Prep time: <span style={{ fontWeight: 550 }}>{formatTime(prep_time)}</span> </p>
        <p style={{ fontSize: '20px' }}>Cooking time: <span style={{ fontWeight: 550 }}>{formatTime(cooking_time)}</span> </p>
      </div>
      <div className="col-xs-12 col-sm-4 col-md-4 mb-3 mt-3 text-center" style={{ maxWidth: '29rem' }}>
        <div className="d-flex justify-content-between">
          <div className="row justify-content-center" style={{ margin: 'auto' }}>
            <div className="col">
              <HeartFill style={{ fontSize: '25px', color: '#04B4B4', cursor: 'pointer' }} />
              <p style={{ fontSize: '20px', marginTop: '1px' }}>{total_likes}</p>
            </div>
            <div className="col">
              <BookmarkFill style={{ fontSize: '25px', color: '#04B4B4', cursor: 'pointer' }} />
              <p style={{ fontSize: '20px', marginTop: '1px' }}>{total_favs}</p>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <Link to="/create_recipe">
            <button type="button" className="btn ms-3 ps-4" style={{ backgroundColor: '#04B4B4', color: 'white', fontSize: '18px', maxWidth: '20rem' }}>Remix Recipe</button>
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <Link to="/reviews">
          <button type="button" className="btn mt-2 ms-3" style={{ backgroundColor: '#04B4B4', color: 'white', maxWidth: '20rem', fontSize: '18px' }}>Leave a Review</button>
          </Link>
        </div>
      </div>
      {based_on &&
      (<div className="mt-4 pt-4 mb-4 row justify-content-center d-flex">

         </div>)
      }
    </div>
    <div style={{ backgroundColor: "#E47E20", padding: "1rem", borderRadius: "5px", width:'80%', marginLeft: 'auto', marginRight: 'auto'}}>
  <h2 className="justify-content-center text-center" style={{ color: "white", fontWeight: "450", marginBottom: "0.5rem" }}>
   Recipe Ingredients
    </h2>
</div>
<div className="row">
      <div className="container-fluid justify-content-center d-flex" style={{margin: "auto"}} >
        <div className="row">
          <div className="col-6 mt-4">
            {/* <div className="row" style={{minWidth: "23rem"}}>
              <i style="max-width: 2rem; font-size: 20px; color: #04B4B4; cursor: pointer" class="bi bi-plus-circle-fill"></i>
              <p style="max-width: 20rem; font-size: 18px;" >1 teaspoon <span style="font-weight: 600;">baking soda</span></p>
            </div>     
            <div class="row" style="min-width: 23rem;">
              <i style="max-width: 2rem; font-size: 20px; color: #04B4B4; cursor: pointer" class="bi bi-plus-circle-fill"></i>
              <p style="max-width: 16rem; font-size: 18px;" >1 cup <span style="font-weight: 600;">unsalted butter</span></p>
            </div>
            <div class="row" style="min-width: 23rem;">
              <i style="max-width: 2rem; font-size: 20px; color: #04B4B4; cursor: pointer" class="bi bi-plus-circle-fill"></i>
              <p style="max-width: 16rem; font-size: 18px;" >1 large <span style="font-weight: 600;">egg</span></p>
            </div> */}
          </div>
          <div className="col-6 mt-4">
            {/* <div class="row" style="min-width: 23rem; margin-left: 2px;">
              <i style="max-width: 2rem; font-size: 20px; color: #04B4B4; cursor: pointer" class="bi bi-plus-circle-fill"></i>
              <p style="max-width: 16rem; font-size: 18px;" >1 teaspoon <span style="font-weight: 600;">baking soda</span></p>
            </div>     
            <div class="row" style="min-width: 23rem; margin-left: 2px;">
              <i style="max-width: 2rem; font-size: 20px; color: #EEB682; cursor: pointer" class="bi bi-dash-circle-fill"></i>
              <p style="max-width: 16rem; font-size: 18px;" >1 cup <span style="font-weight: 600;">unsalted butter</span></p>
            </div> */}
          </div>
        </div>
      </div>

    </div>
    {/* <div className="row d-flex mt-4 pt-3 pb-4" style="background-color: #D9D9D9; color: white; display: flex; align-items: center; justify-content: center; max-width: 70rem; margin: auto; border-radius: 15px;">
      <span style={{maxWidth: "6.1rem", fontSize: "18px", marginTop: "3px", color: "black", fontWeight: 600}}>Serves: 3</span>
      <label style="max-width: 10.4rem; font-size: 18px; margin-top: 3px; color: black; font-weight: 600;" for="serve_number">Custom Servings:</label>
      <input style="width: 10vh; height: 2.6rem; margin-top: 5px;" type="number" class="form-control" id="serving_number" placeholder="">
      <button type="button" className="btn mt-2 ms-3" style="background-color:#04B4B4; color: white; max-width: 7.8rem; font-size: 18px;">Set Servings</button>
      <button type="button" className="btn mt-2 ms-3" style="background-color:#04B4B4; color: white; max-width: 12.5rem; font-size: 18px;">Add to Shopping List</button>

    </div> */}


      </div>
      <ReviewForm/>
    </div>
  );
}

export default RecipeDetails;
