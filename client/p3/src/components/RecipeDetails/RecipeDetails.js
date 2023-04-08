import React from 'react';
import { Carousel } from 'react-bootstrap';

import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

function ratingStars(rating) {
  let result = [];
  let round_rating = Math.round(rating * 2) / 2;
  for (let i = 0; i < 5; i++) {
    if (i < round_rating && 0.5 === (round_rating - i)) {
      result.push(<StarHalf className="rating-stars" key={i} />);
    } else if (i < round_rating) {
      result.push(<StarFill className="rating-stars" key={i} />);
    } else {
      result.push(<Star className="rating-stars" key={i} />);
    }
  }
  return result;
}

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
    total_likes,
    total_favs,
  } = recipe;

  return (
    <div>
      <Carousel>
        {media.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Image ${index}`}
              style={{ height: '35rem', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container-fluid padding" style={{ backgroundColor: 'white' }}>
        <div className="row welcome text-center">
          <div className="col-12 mt-3">
            <h2 style={{ fontSize: '1.8rem' }}>{chef}</h2>
            <h1 style={{ fontWeight: 700 }}>{name}</h1>
          </div>
        </div>

        <div>{ratingStars(avg_rating)}</div>
      <p>Total reviews: {total_reviews}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;
