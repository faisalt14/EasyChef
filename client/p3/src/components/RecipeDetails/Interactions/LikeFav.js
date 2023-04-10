import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeartFill, BookmarkFill } from 'react-bootstrap-icons';

function LikeFav({ recipeId, fav_number, like_number }) {
  const [liked, setLiked] = useState(false);
  const [favourited, setFavourited] = useState(false);
  // const token = 'Bearer ' + localStorage.getItem('token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTU4MTkzLCJpYXQiOjE2ODExNTQ1OTMsImp0aSI6IjIxYmE5Nzc2ZjU3ODRmZThhMDk4MmYyZWM2NTVmNjAyIiwidXNlcl9pZCI6Mn0.vsGqTf4p9BMZZ99qLxSYrvL0SY6UwK1ljCxUjBZE8lQ";


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
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If there is no interaction, set the initial state to false
          setLiked(false);
          setFavourited(false);
        } else {
          console.log(error);
        }
      }
    };
    fetchInteraction();
  }, [recipeId]);


  const handleLike = () => {
    axios.patch(`http://127.0.0.1:8000/recipes/${recipeId}/details/interaction/`, {
      like: (!liked).toString(),
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
        // Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setLiked(JSON.parse(response.data.like));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFavourite = () => {
    axios.patch(`http://127.0.0.1:8000/recipes/${recipeId}/details/interaction/`, {
      favourite: (!favourited).toString(),
    }, {
      headers: {
        // Authorization: `Token ${localStorage.getItem('token')}`,
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        setFavourited(JSON.parse(response.data.favourite));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddInteraction = (like, favourite) => {
    axios.post(`http://127.0.0.1:8000/recipes/${recipeId}/details/interaction/`, {
      like: (like).toString(),
      favourite: (favourite).toString(),
    }, {
      headers: {
        // Authorization: `Token ${localStorage.getItem('token')}`,
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (JSON.parse(like)) {
          setLiked(JSON.parse(response.data.like));
        }
        if (JSON.parse(favourite)) {
          setFavourited(response.data.favourite);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="row justify-content-center" style={{ margin: 'auto' }}>
      <div className="col" data-toggle="tooltip" data-placement="top" title="Like me!">
        <HeartFill
          style={{ fontSize: '25px', color: liked ? '#E47E20' : '#04B4B4', cursor: 'pointer' }}
          onClick={liked ? handleLike : () => handleAddInteraction(true, false)}
        />
        <p style={{ fontSize: '20px', marginTop: '1px' }}>{like_number}</p>

      </div>
      <div className="col" data-toggle="tooltip" data-placement="top" title="Add me to your favourites!">
        <BookmarkFill
          style={{ fontSize: '25px', color: favourited ? '#E47E20' : '#04B4B4', cursor: 'pointer' }}
          onClick={favourited ? handleFavourite : () => handleAddInteraction(false, true)}
        />
        <p style={{ fontSize: '20px', marginTop: '1px' }}>{fav_number}</p>
      </div>
    </div>
  );
}

export default LikeFav;
