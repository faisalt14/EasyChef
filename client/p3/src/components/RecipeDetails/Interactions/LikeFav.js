import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartFill, BookmarkFill } from 'react-bootstrap-icons';
import { useNavigate  } from 'react-router-dom';

function LikeFav({ recipeId, fav_number, like_number, totalLikes, totalFavs, updateTotalLikes, updateTotalFavs }) {
  const [liked, setLiked] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [intExists, setIntExists] = useState(false);
  const [likes, setLikes] = useState(like_number);
  const [favs, setFavs] = useState(fav_number); 

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    setRedirectToLogin(true);
  };
  // const token = 'Bearer ' + localStorage.getItem('token');
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTc3NDgxLCJpYXQiOjE2ODExNzM4ODEsImp0aSI6IjkyNmE1NTI0NTllZjQ3OWZhMzhlNTdmNDM4OGNjM2Y4IiwidXNlcl9pZCI6Mn0.vHhSXtz9r3CUk95OXpv-oBDibcg9u5puQWK6_K3VqfU";
  const token = "";
  useEffect(() => {
    if (liked) {
      updateTotalLikes(Math.max(like_number + 1, 0));
    } else {
      updateTotalLikes(Math.max(like_number - 1, 0));
    }
  }, [liked]);
  
  useEffect(() => {
    if (favourited) {
      updateTotalFavs(Math.max(fav_number + 1, 0));
    } else {
      updateTotalFavs(Math.max(fav_number - 1, 0));
    }
  }, [favourited]);

  useEffect(() => {
    const fetchInteraction = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/recipes/${recipeId}/details/interaction/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
  
        setLiked(JSON.parse(response.data.like));
        setFavourited(JSON.parse(response.data.favourite));
        setIntExists(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If there is no interaction, set the initial state to false
          setLiked(false);
          setFavourited(false);
          setIntExists(false);
        } else if (error.response && error.response.status === 401) {
          // If the user is unauthorized, call the handleUnauthorized function from the parent component
        } else {
          console.log(error);
        }
      }
    };
    fetchInteraction();
  }, [recipeId]);
  


const handleInteraction = async (likeValue, favouriteValue) => {
  const method = intExists ? 'patch' : 'post';
  const data = {
    like: likeValue.toString(),
    favourite: favouriteValue.toString(),
  };

  try {
    const response = await axios[method](`http://127.0.0.1:8000/recipes/${recipeId}/details/interaction/`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const newLiked = JSON.parse(response.data.like);
    const newFavourited = JSON.parse(response.data.favourite);

    setLiked(newLiked);
    setFavourited(newFavourited);

    if (newLiked !== liked) {
      updateTotalLikes(likeValue ? like_number + 1 : Math.max(like_number - 1, 0));
      setLikes(likeValue ? like_number + 1 : Math.max(like_number - 1, 0));
    }
    if (newFavourited !== favourited) {
      updateTotalFavs(favouriteValue ? fav_number + 1 : Math.max(fav_number - 1, 0));
      setFavs(favouriteValue ? fav_number + 1 : Math.max(fav_number - 1, 0));
    }

  } catch (error) {
    console.log(error);
  }
};

  

const handleLike = () => {
  if (!token) {
    navigate('/accounts/login');
  } else {
    handleInteraction(!liked, favourited);
  }
};

const handleFavourite = () => {
  if (!token) {
    navigate('/accounts/login');
  } else {
    handleInteraction(liked, !favourited);
  }
};

  return (
    <>
    <div className="row justify-content-center" style={{ margin: 'auto' }}>
      <div className="col" data-toggle="tooltip" data-placement="top" title="Like me!">
        <HeartFill
          style={{ fontSize: '25px', color: liked ? '#E47E20' : '#04B4B4', cursor: 'pointer' }}
          onClick={handleLike}
        />
        <p style={{ fontSize: '20px', marginTop: '1px' }}>{likes}</p>
      </div>
      <div className="col" data-toggle="tooltip" data-placement="top" title="Add me to your favourites!">
        <BookmarkFill
          style={{ fontSize: '25px', color: favourited ? '#E47E20' : '#04B4B4', cursor: 'pointer' }}
          onClick={handleFavourite}
        />
        <p style={{ fontSize: '20px', marginTop: '1px' }}>{favs}</p>
      </div>
    </div>
    </>
  );
}

export default LikeFav;