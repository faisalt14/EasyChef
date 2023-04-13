import React from 'react';
import './style.css';
import { formatTime } from './RecipeDetails';


const RecipeSteps = ({ steps}) => {
  return (
    <>
<div className="row d-flex mt-2 pt-3 pb-4" style={{ 
        width: "80%",
        display: 'flex',
        fontFamily: 'Roboto',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '70rem',
        margin: 'auto',
         }}>
          
  {steps.map((step) => (
    <div className="container-fluid" key={step.id} style={{ marginBottom: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-9">
          <p style={{ fontSize: "27px", fontWeight: 550, maxWidth: "9rem" }}>Step {step.step_num}:</p>
          <p style={{ fontSize: '18px' }}>{step.instructions}</p>
        </div>
        <div className="col-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="time-box">
        <strong>Prep Time:</strong> {formatTime(step.prep_time)}
        <br />
        <strong>Cooking Time:</strong> {formatTime(step.cooking_time)}
      </div>
    </div>
        <div className="col-12">
          {step.media.map((media) => (
            <img
              key={media.id}
              src={media.media}
              alt={`Step ${step.step_num}`}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                marginTop: '10px',
                objectFit: 'contain',
              }}
/>
          ))}
        </div>
      </div>
      <hr className="d-flex align-items-center justify-content-center" style={{maxWidth: "80rem", margin: "0 auto"}}/>
    </div>
  ))}
</div>
</>
  );
};

export default RecipeSteps;
