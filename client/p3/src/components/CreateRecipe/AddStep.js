import React, { useState } from 'react';
import PrepCookTime from './PrepCookTime';
import UploadImage from './UploadImage';
import CloseButton from 'react-bootstrap/CloseButton';

function AddStep({ selectSteps, setSelectedSteps }) {
  const [steps, setSteps] = useState([]);
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedPrepTime, setPrepTime] = useState("00:00:00");
  const [selectedCookTime, setCookTime] = useState("00:00:00");
  const [resetPrepCookTime, setResetPrepCookTime] = useState(false);

  const handleRemoveStep = (stepIndex) => {
    setSteps(prevSteps => prevSteps.filter((_, index) => index !== stepIndex));
    setSelectedSteps(prevSteps => prevSteps.filter((_, index) => index !== stepIndex));

  };

  const resetForm = () => {
    setDesc('');
    setPrepTime("00:00:00");
    setCookTime("00:00:00");
    setImages([]);
    setErrorMessage('');
    setResetPrepCookTime(true);
    setTimeout(() => setResetPrepCookTime(false), 100);
  };

  const handleSubmit = () => {
    if (desc.trim() === '' || selectedPrepTime === 0 || selectedCookTime === 0) {
      setErrorMessage('Please fill out the fields: description, prep time, and cooking time');
      return;
    }

    const newStep = {
      description: desc,
      prepTime: selectedPrepTime,
      cookTime: selectedCookTime,
      images: images,
    };

    setSteps(prevSteps => [...prevSteps, newStep]);
    setSelectedSteps(prevSteps => [...prevSteps, newStep]);
    resetForm();
  };

  return (
    <>
    <div className="mt-4">

    </div>
{steps.map((step, index) => (
  <>
<div className='container-fluid mb-3 ms-4 mt-4' style={{borderRadius:"10px"}}>
        <div className="ms-3 d-flex align-items-center">
            <label className="form-label me-3" style={{ fontSize: '27px', fontWeight: '600' }}>Step {index + 1}</label>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveStep(index)}
            >
              Remove
            </button>
          </div>
     <div className="row">
    <div key={index} className="d-flex col-3 ms-2" style={{ width: "40%", backgroundColor: 'white', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', padding: '20px', maxHeight: '200px', overflow: 'auto' }}>
        <p style={{ fontSize: "17px", position: "absolute" }}>
          {step.description}
        </p>
    </div>
    <div className="col-4 ms-4" style={{ padding: 0, margin: 0 }}>
      <div style={{ fontWeight: '600', color: 'white', backgroundColor: '#04b4b4', padding: '5px', borderRadius: '5px', marginBottom: '0.5rem', width: "40%" }}>Cook time: {step.cookTime.split(':')[0]} hrs {step.cookTime.split(':')[1]} mins</div>
      <div style={{ fontWeight: '600', color: 'white', backgroundColor: '#04b4b4', padding: '5px', borderRadius: '5px', marginBottom: '0.5rem', width: "40%" }}>Prep time: {step.prepTime.split(':')[0]} hrs {step.prepTime.split(':')[1]} mins</div>
      <div className="mt-4 d-flex" style={{ margin: 0, padding: 0 }}>
        {step.images.map((image, index) => (
          <div key={index} className="mb-3" style={{ flexBasis: 'calc(100% / 3)', marginRight: '4px' }}>
            <img src={URL.createObjectURL(image)} alt="step" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  </>

))}
        <div className="row ms-4" style={{ width: '100%', marginTop: "60px" }}>
          <div className="col-md-7 form-outline" style={{ margin: 0, padding: 0, width: "49%"}}>
            <div className="d-flex align-items-center">
              <label className="form-label me-3" style={{ fontSize: '27px', fontWeight: '500' }}> <span className="required" style={{color: "red"}}>* </span>
New Step</label>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#04b4b4", color: "white", fontWeight: '500' }}
                onClick={handleSubmit}
              >
                Add Step
              </button>
            </div>
            <textarea
              className="form-control"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 'calc(22vw + 300px)', overflow: 'auto' }}
              rows="8"
            ></textarea>
        <div className='row mt-5' style={{padding: 0, margin: 0}}>
          <PrepCookTime
            selectedPrepTime={selectedPrepTime}
            selectedCookTime={selectedCookTime}
            setPrepTime={setPrepTime}
            setCookTime={setCookTime}
            reset={resetPrepCookTime}
            name="Step"
          />
        </div>
          </div>

          <div className="col mt-4" style={{ margin: 0, padding: 0, height: "20%" }}>
            <UploadImage
              selectImages={images}
              setImages={setImages}
              image_name="Step"
            />
          </div>
        </div>
        {errorMessage && (
          <div className="d-flex alert alert-danger" role="alert" style={{ width: "40%" }}>
            {errorMessage}
            <CloseButton style={{ marginLeft: "20px" }} onClick={() => setErrorMessage('')} />
          </div>
        )}

</>); };

export default AddStep;
