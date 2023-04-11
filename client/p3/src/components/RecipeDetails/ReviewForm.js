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


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMTc3NDgxLCJpYXQiOjE2ODExNzM4ODEsImp0aSI6IjkyNmE1NTI0NTllZjQ3OWZhMzhlNTdmNDM4OGNjM2Y4IiwidXNlcl9pZCI6Mn0.vHhSXtz9r3CUk95OXpv-oBDibcg9u5puQWK6_K3VqfU";

const ReviewForm = ({ interactions }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
  }, []);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleRatingChange = (event, value) => {
    setNewRating(value);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted review with rating ${newRating} and comment "${newComment}"`);
    // TODO: Add logic to submit review to backend
    setNewComment('');
    setNewRating(0);
  };

  return (
    <>
    <div id="reviews" className="row text-center mt-2 pt-2 pb-2" style={{maxWidth: "80rem", margin: "auto"}}>
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            {/* <Modal.Title>Upload photos</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center">
            <UploadImage />
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
                multiline: true}}
              sx={{ 
                flex: 1,
                // minHeight: '200px', 
                // maxHeight:
                // overflowX: 'auto' 
              }}              />
              <IconButton sx={{ color: '#4b4b4b' }}>
              <AddAPhotoIcon style={{color: '#04B4B4', fontSize:'30px'}} onClick={() => setShowModal(true)} />
              </IconButton>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#04B4B4', color: 'white' }}>
              Post
              </Button>
              </Stack>
              </form>
              </Box>
<Box sx={{ mt: 2 }}>
    {interactions.map((interaction) => (
      <Box
        key={interaction.id}
        sx={{ borderRadius: 16, padding: 2, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', my: 2 }}
      >
        <Avatar alt="User Avatar" src={interaction.user_avatar || 'https://i.pravatar.cc/40'} sx={{ width: 40, height: 40 }} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" gutterBottom>
            User {interaction.user_id}
          </Typography>
          <Rating name={`rating-${interaction.id}`} value={interaction.rating} readOnly size="small" />
          <Typography variant="body1" gutterBottom>
            {interaction.comment}
          </Typography>
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
