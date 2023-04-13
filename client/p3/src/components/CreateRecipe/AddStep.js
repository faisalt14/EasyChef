import React, { useState, useEffect } from 'react';
import PrepCookTime from './PrepCookTime';
import UploadImage from './UploadImage';
import CloseButton from 'react-bootstrap/CloseButton';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { v4 as uuidv4 } from 'uuid';
import './AddStep.css'

function AddStep({ selectSteps, setSelectedSteps, name }) {
	const [steps, setSteps] = useState(selectSteps ? selectSteps: []);
  // console.log("steps hereee", steps);
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

  const [initialFiles, setInitialFiles] = useState([]);

  const handleEditStep = (stepIndex) => {
    const stepToEdit = steps[stepIndex];
    setDesc(stepToEdit.instructions);
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
      instructions: desc,
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
      {Object.entries(steps).map(([stepIndex, step], index) => (
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
    <div className="col-md-12 col-sm-12 col-lg-6 col-12">
      <div
  key={index}
  className="mb-2"
  style={{
    backgroundColor: 'white',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
    padding: '20px',
    borderRadius: '8px',
    minHeight: '170px',
    maxHeight: '190px',
    overflowY:"scroll",
    overflowX: 'hidden'
  }}
>
  <div style={{ minWidth: '400px', whiteSpace:'pre-wrap', wordBreak: 'break-word' }}>
    <p style={{ fontSize: '17px' }}>{step.instructions}</p>
  </div>
</div>


    <div className="d-flex flex-wrap" style={{ justifyContent: "flex-start", minWidth:'650px' }}>
  <div
    className="me-2"
    style={{
      fontWeight: "600",
      color: "white",
      backgroundColor: "#04b4b4",
      padding: "5px",
      paddingLeft: "8px",
      paddingRight: "8px",
      borderRadius: "5px",
      marginBottom: "0.5rem",
    }}
  >
    Cook time: {step.cookTime.split(":")[0]} hrs{" "}
    {step.cookTime.split(":")[1]} mins
  </div>
  <div
      className="me-2"

    style={{
      fontWeight: "600",
      color: "white",
      backgroundColor: "#04b4b4",
      padding: "5px",
      paddingLeft: "8px",
      paddingRight: "8px",
      borderRadius: "5px",
      marginBottom: "0.5rem",
    }}
  >
    Prep time: {step.prepTime.split(":")[0]} hrs{" "}
    {step.prepTime.split(":")[1]} mins
  </div>
  <div

    style={{
      fontWeight: "600",
      color: "white",
      backgroundColor: "#04b4b4",
      padding: "5px",
      paddingLeft: "8px",
      paddingRight: "8px",
      borderRadius: "5px",
      marginBottom: "0.5rem",
    }}
  >
    Total time: {calculateTotalTime(step.prepTime, step.cookTime).split(":")[0]} hrs{" "}
    {calculateTotalTime(step.prepTime, step.cookTime).split(":")[1]} mins
  </div>
</div>

  </div>
  <div className="col-md-12 col-sm-12 col-lg-6 col-12">
  {(name === "remix" && step.media || step.images) &&
  (name === "remix" && step.media || step.images).length > 0 && (
    <div
    className="d-flex flex-wrap"
    style={{ justifyContent: 'start', alignItems: 'center', minHeight:'170px', marginTop:'-15px'}}
  >
    {(name === "remix" && step.media || step.images).map((image, index) => (
      <>
      {console.log("image", URL.createObjectURL(image))}
      <div
        key={index}
        className="mb-3 me-3 col-lg-4 col-md-12 col-sm-12 col-12 px-0 custom-col" // Updated Bootstrap classes
        style={{
          flexBasis: 'calc(30% - 8px)',
          marginRight: '4px',
          minWidth: 0,
        }}
      >
          {/* {console.log(`stepIndex: ${stepIndex}, image: ${image}, index: ${index}`)} */}
        <Zoom>
						{image.url ? (
            <img className="step-image" src={image.url} alt="Step"             
             style={{ width: '100%', objectFit: 'cover', minHeight:'160px', minWidth:'160px'}}	 />
          ) : (
            <img
              className="step-image"
              src={URL.createObjectURL(image)}
              alt="Step"
              style={{ width: '100%', objectFit: 'cover', minHeight:'160px', minWidth:'160px'}}	
            />
          )}
        </Zoom>
      </div>
      </>
    ))}
  </div>)
    }
  </div>
</div>

          </div>
        </>
      ))}
<div className="row ms-4" style={{ width: '100%'}}>
  <div className="col-md-12 col-lg-6 col-sm-12 col-12 form-outline me-5">
      <div className="row align-items-center">
      <label className="col-sm-12 col-lg-3 form-label" style={{ fontSize: '27px', fontWeight: '550', minWidth:'180px' }}> <span className="required" style={{color: "red"}}>* </span>
    New Step</label>
      {errorMessage && (
        <div className="col-sm-12 col-md-9 d-flex align-items-center">
          <div className="alert alert-danger d-flex align-items-center" role="alert" style={{ padding: "6px 12px", marginBottom: "0" }}>
            {errorMessage}
            <CloseButton style={{ position: 'relative', marginLeft: '5px' }} onClick={() => setErrorMessage('')} />
          </div>
        </div>
      )}
    </div>

    <h5 className='ms-3'>Step Description</h5>

    <textarea
      className="ms-3 form-control"
      value={desc}
      onChange={(event) => setDesc(event.target.value)}
      style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: '100%', overflow: 'auto' }}
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

  <div className="col-md-12 col-lg-5 col-sm-12 col-12 mt-4 ms-4 d-flex justify-content-center align-items-center">
    <UploadImage
      selectImages={images}
      setImages={setImages}
      image_name="Step"
      reset={reset}
      setReset={setReset}
    />
  </div>
  <div className="row ms-4" style={{ marginTop: 0}}>
  <div className="col-12">
    <button 
      type="button"
      className="btn"
      style={{ backgroundColor: "#04b4b4", color: "white", fontWeight: '550', minWidth: "120px", padding: "6px 12px", fontSize:'18px' }}
      onClick={handleSubmit}
    >
      Add Step
    </button>
  </div>
</div>
</div>
</>); };

export default AddStep;

