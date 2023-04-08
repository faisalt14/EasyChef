import React, { useState, useEffect } from 'react';
import PrepCookTime from './PrepCookTime';
import UploadImage from './UploadImage';
import CloseButton from 'react-bootstrap/CloseButton';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { v4 as uuidv4 } from 'uuid';

function AddStep({ selectSteps, setSelectedSteps }) {
  const [steps, setSteps] = useState([]);
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedPrepTime, setPrepTime] = useState("00:00:00");
  const [selectedCookTime, setCookTime] = useState("00:00:00");
  const [resetPrepCookTime, setResetPrepCookTime] = useState(false);
  const [reset, setReset] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleRemoveStep = (stepIndex) => {
    setSteps(prevSteps => prevSteps.filter((_, index) => index !== stepIndex));
    setSelectedSteps(prevSteps => prevSteps.filter((_, index) => index !== stepIndex));

  };

  const handleEditStep = (stepIndex) => {
    const stepToEdit = steps[stepIndex];
    setDesc(stepToEdit.description);
    setPrepTime(stepToEdit.prepTime);
    setCookTime(stepToEdit.cookTime);
    setImages(stepToEdit.images);
    setIsEditing(true);
    setEditIndex(stepIndex);
  };

  const calculateTotalTime = (prepTime, cookTime) => {
    const [prepHours, prepMinutes] = prepTime.split(':');
    const [cookHours, cookMinutes] = cookTime.split(':');

    let totalHours = parseInt(prepHours, 10) + parseInt(cookHours, 10);
    let totalMinutes = parseInt(prepMinutes, 10) + parseInt(cookMinutes, 10);

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    return `${totalHours.toString().padStart(2, '0')}:${totalMinutes
      .toString()
      .padStart(2, '0')}:00`;
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset, setReset]);

  const resetForm = () => {
    setDesc('');
    setPrepTime("00:00:00");
    setCookTime("00:00:00");
    setErrorMessage('');
    setImages([]);
    setResetPrepCookTime(true);
    setTimeout(() => setResetPrepCookTime(false), 100);
  };

  const handleSubmit = () => {
    if (desc.trim() === '' || selectedPrepTime === 0 || selectedCookTime === 0) {
      setErrorMessage('Please fill out the fields: description, prep time, and cooking time');
      return;
    }

    setReset(true);
  
    setErrorMessage("");

    const newStep = {
      id: isEditing ? steps[editIndex].id : uuidv4(),
      description: desc,
      prepTime: selectedPrepTime,
      cookTime: selectedCookTime,
      images: images,
    };

    if (isEditing) {
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => (index === editIndex ? newStep : step))
      );
      setSelectedSteps((prevSteps) =>
        prevSteps.map((step, index) => (index === editIndex ? newStep : step))
      );
    } else {
      setSteps((prevSteps) => [...prevSteps, newStep]);
      setSelectedSteps((prevSteps) => [...prevSteps, newStep]);
    }

    resetForm();
    setIsEditing(false);
    setEditIndex(null);
  };

  return (
    <>
    <div className="mt-4">

    </div>
    <div className='ms-5 mt-5' style={{ backgroundColor: "#04a5a5", padding: "1rem", borderRadius: "5px", width:"60%"}}>
  <h2 style={{ color: "white", fontWeight: "550", marginBottom: "0.5rem" }}>
  3. Preparation Steps
    </h2>
  <p
    className="mt-2 lead fw-normal"
    style={{
      fontSize: "19px",
      color: "#F9F9F9",
      width: "100%",
      marginLeft: "0.5rem",
    }}
  >
     Cook it up with some easy-to-follow recipe steps!
</p>
</div>
    {steps.map((step, index) => (
        <>
          <div
            className="container-fluid mb-3 ms-4 mt-4"
            style={{ borderRadius: '10px' }}
          >
            <div className="ms-3 d-flex align-items-center">
              <label
                className="form-label me-3 ms-2"
                style={{ fontSize: '27px', fontWeight: '550' }}
              >
                Step {index + 1}
              </label>
              <button
                type="button"
                className="btn btn-danger"
                style={{backgroundColor: "#E47E20", borderColor: "#E47E20"}}
                onClick={() => handleRemoveStep(index)}
              >
                Remove
              </button>
              <button
      type="button"
      className="btn btn-warning ms-3"
      style={{backgroundColor: "#E47E20", borderColor: "#E47E20", color: "white"}}
      onClick={() => handleEditStep(index)}
    >
      Edit
    </button>
            </div>
            <div className="row ms-2">
              <div
                key={index}
                className="mb-2 col-6 ms-2"
                style={{
                  backgroundColor: 'white',
                  boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                  padding: '20px',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  overflow: 'auto',
                }}
              >
                <p style={{ fontSize: '17px', position: 'absolute' }}>
                  {step.description}
                </p>
              </div>
              <div className="col-4 ms-4">
                <div
                  className="mt-4 d-flex"
                  style={{ margin: 0, padding: 0 }}
                >
                  {step.images.map((image, index) => (
                    <div
                      key={index}
                      className="mb-3"
                      style={{ flexBasis: 'calc(100% / 3)', marginRight: '4px' }}
                    >
                      <Zoom>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="step"
                        style={{ width: '100%' }}
                      />
                      </Zoom>
                    </div>
                  ))}
                </div>
              </div>
              <div className='ms-2 me-2'
                  style={{
                    fontWeight: '600',
                    color: 'white',
                    backgroundColor: '#04b4b4',
                    padding: '5px',
                    paddingRight: 0, 
                    marginRight: 0,
                    borderRadius: '5px',
                    marginBottom: '0.5rem',
                    width: '15%',
                  }}
                >
                  Cook time: {step.cookTime.split(':')[0]} hrs{' '}
                  {step.cookTime.split(':')[1]} mins
                </div>
                <div
                  style={{
                    fontWeight: '600',
                    color: 'white',
                    backgroundColor: '#04b4b4',
                    padding: '5px',
                    borderRadius: '5px',
                    marginBottom: '0.5rem',
                    width: '14%',
                  }}
                >
                  Prep time: {step.prepTime.split(':')[0]} hrs{' '}
                  {step.prepTime.split(':')[1]} mins
                </div>
                <div className='ms-2'
                  style={{
                    fontWeight: '600',
                    color: 'white',
                    backgroundColor: '#04b4b4',
                    padding: '5px',
                    borderRadius: '5px',
                    marginBottom: '0.5rem',
                    width: '14%',
                  }}
                >
                  Total time: {calculateTotalTime(step.prepTime, step.cookTime).split(':')[0]} hrs{' '}
                  {calculateTotalTime(step.prepTime, step.cookTime).split(':')[1]} mins
                </div>
            </div>
          </div>
        </>
      ))}
        <div className="row ms-4" style={{ width: '100%', marginTop: "60px" }}>
          <div className="col-md-7 form-outline" style={{ margin: 0, padding: 0, width: "49%"}}>
            <div className="d-flex align-items-center">
              <label className="form-label me-3" style={{ fontSize: '27px', fontWeight: '550' }}> <span className="required" style={{color: "red"}}>* </span>
New Step</label>
            </div>
            <h5 className='ms-3'>Step Description</h5>

            <textarea
              className="ms-3 form-control"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
              style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 'calc(22vw + 300px)', overflow: 'auto' }}
              rows="8"
            ></textarea>
        <div className='row mt-3' style={{padding: 0, margin: 0}}>
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
              reset={reset}
              setReset={setReset}
            />
          </div>
        </div>
        <div>
        <button
                type="button"
                className="btn mb-3"
                style={{ backgroundColor: "#04b4b4", color: "white", fontWeight: '550', width:"10%", marginLeft:'4rem' }}
                onClick={handleSubmit}
              >
                Add Step
        </button>
        </div>
        {errorMessage && (
          <div className="ms-5 d-flex alert alert-danger" role="alert" style={{ width: "40%" }}>
            {errorMessage}
            <CloseButton style={{ marginLeft: "20px" }} onClick={() => setErrorMessage('')} />
          </div>
        )}

</>); };

export default AddStep;