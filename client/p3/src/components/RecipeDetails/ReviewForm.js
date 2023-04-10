import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UploadImage from '../CreateRecipe/UploadImage.js';
import './style.css';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset, setReset]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted rating:', rating);
    console.log('Submitted comment:', comment);
    console.log('Submitted images:', images);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{margin: 'auto' }}>
      <Stack spacing={2}>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={1}
        />
        <TextField
          id="comment"
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          variant="outlined"
          fullWidth
        />
        <label htmlFor="images">
        <div className="col mt-4">
            <UploadImage
              selectImages={images}
              setImages={setImages}
              image_name="Review"
              reset={reset}
              setReset={setReset}
            />
          </div>
        </label>
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewForm;
