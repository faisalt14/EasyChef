import React from 'react';
import './style.css';

const RecipeSteps = ({ steps }) => {
  return (
    <>
<div className="row d-flex mt-4 pt-3 pb-4" style={{ 
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
        <div className="col-7">
          <p style={{ fontSize: "27px", fontWeight: 500, maxWidth: "9rem" }}>Step {step.step_num}:</p>
          <p style={{ fontSize: '18px' }}>{step.instructions}</p>
        </div>
        <div className="col-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <strong>Prep Time:</strong> {step.prep_time.slice(0, -3)}
            <strong>Cooking Time:</strong> {step.cooking_time.slice(0, -3)}
          </div>
        </div>
        <div className="col-12">
          {step.media.map((media) => (
            <img
              key={media.id}
              src={media.media}
              alt={`Step ${step.step_num}`}
              style={{ width: '100%', height: 'auto', marginTop: '10px' }}
            />
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
</>
  );
};

export default RecipeSteps;
