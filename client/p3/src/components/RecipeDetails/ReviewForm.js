import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './style.css';
import UploadImage from '../CreateRecipe/UploadImage';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Zoom from 'react-medium-image-zoom'
import './style.css'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzUxNDc4LCJpYXQiOjE2ODEzNDc4NzgsImp0aSI6IjAwOWUxZjUwOWVkZjQ2NzNiNzRhZDBmN2QxMDIwMzIwIiwidXNlcl9pZCI6Mn0.0tOEMArOndcW0OS-_jgoUPHv_pQBHK7fUcWRbwrQP9w";

const ReviewForm = ({ interactions, id }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [postCount, setPostCount] = useState(0);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/accounts/profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postCount]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event, value) => {
    setNewRating(value);
  };

  const handleReviewSubmit = async (event) => {

    event.preventDefault();
    console.log(`Submitted review with rating ${newRating} and comment "${newComment}"`);
    console.log(id);
    const decodedToken = jwt_decode(token);
    const currentUserId = decodedToken.user_id;
    const existingInteraction = interactions.find(interaction => interaction.user_id === currentUserId);

    let interactionId;

    try {
      // Upload images
      const interactionData = {
        rating: newRating,
        comment: newComment,
      };
      if (existingInteraction) {
        const patchResponse = await axios.patch(`http://127.0.0.1:8000/recipes/${id}/details/interaction/`, interactionData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        interactionId = patchResponse.data.id;
      } else {
        const postResponse = await axios.post(`http://127.0.0.1:8000/recipes/${id}/details/interaction/`, interactionData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        interactionId = postResponse.data.id;
      }

      for (const image of images) {
        console.log(image)
        const formData = new FormData();
        const objectUrl = URL.createObjectURL(image);
        const filename = image.name;
        const type = image.type;
        const convertedFile = await fetch(objectUrl)
          .then((response) => response.arrayBuffer())
          .then((buffer) => new File([buffer], filename, { type }));

        formData.append("media", convertedFile);
        await axios.post(`http://127.0.0.1:8000/recipes/interactions/${interactionId}/add-media/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
    // Clear the state
      setNewComment('');
      setNewRating(0);
      setImages([]);
      window.location.reload();

  
      // TODO: Refresh the interactions list or handle the response as needed
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error', error.message);
      }
    }
  };

  return (
    <>
    <div id="reviews" className="row text-center mt-2 pt-2 pb-2" style={{maxWidth: "80rem", margin: "auto"}}>
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            {/* <Modal.Title>Upload photos</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <UploadImage       
            selectImages={images}
            setImages={setImages}/>
          </Modal.Body>
    </Modal>

    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom style={{fontWeight:550}}>
        Reviews
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Rating name="rating" value={newRating} onChange={handleRatingChange} size="large" />
        </Box>
        <form onSubmit={handleReviewSubmit} style={{width:"60%", justifyContent:'center', alignItems:'center'}}>
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
            {userDetails && (
              <Avatar alt="User Avatar" src={userDetails.avatar} sx={{ width: 40, height: 40 }} />
              )}
              {/* <Rating name="rating" value={newRating} onChange={handleRatingChange} size="large" /> */}
              <TextField
              id="comment"
              label="Leave a review!"
              variant="outlined"
              size="large"
              fullWidth
              value={newComment}
              onChange={handleCommentChange}
              inputProps={{               
                style: { 
                fontSize: '1rem',
                maxHeight: '6rem', 
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                },
                rows: 4,
                multiline: "true"}}
              sx={{ 
                flex: 1,
                // minHeight: '200px', 
                // maxHeight:
                // overflowX: 'auto' 
              }}              />
            <IconButton sx={{ color: '#4b4b4b' }} onClick={() => setShowModal(true)}>
              <AddAPhotoIcon style={{ color: '#04B4B4', fontSize: '30px' }} />
            </IconButton>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#04B4B4', color: 'white' }}>
              Post
              </Button>
              </Stack>
              </form>
              </Box>
<Box sx={{ mt: 2, alignItems: "center",
    justifyContent: "flex-start"}}>
  {/* set a condition where either rating is not empty or comment is not empty */}
  {/* set a condition where either rating is not empty or comment is not empty */}
  {interactions.filter((interaction) => interaction.rating !== 0 || interaction.comment.trim() !== '').map((interaction) => (
      <Box
        key={interaction.id}
        sx={{
          borderRadius: 16,
          padding: 2,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'start',
          my: 2,
          justifyContent: 'start',
          width: '80%'
        }}
      >
        <Avatar alt="User Avatar" src={interaction.avatar || 'https://i.pravatar.cc/40'} sx={{ width: 40, height: 40 }} />
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {interaction.username}
          </Typography>
          <Rating name={`rating-${interaction.id}`} value={interaction.rating} readOnly size="small" />
          <Typography variant="body1" gutterBottom>
            {interaction.comment}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {interaction.media &&
              interaction.media.map((media) => (
                <Zoom key={media.id} className="step-image">
                  <img
                    src={media.media}
                    alt="Interaction Media"
                    style={{
                      width: 'calc(100% / 3 - 1rem)',
                      objectFit: 'cover',
                      minHeight: '160px',
                      minWidth: '160px',
                    }}
                  />
                </Zoom>
              ))}
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
              </Box>
              </div>
              </>
              );
              };
              
              export default ReviewForm;
