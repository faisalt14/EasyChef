import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ingredients.css';
import CloseButton from 'react-bootstrap/CloseButton';
import PrepCookTime from './PrepCookTime';
import UploadImage from './UploadImage';

function AddStep() {
  const [selectedPrepTime, setPrepTime] = useState({ hours: 0, minutes: 0 });
  const [selectedCookTime, setCookTime] = useState({ hours: 0, minutes: 0 });
  const [selectImages, setImages] = useState([]);

  return (
    <>
    <div className="row mt-5" style={{ width: '100%' }}>
      <div className="col-md-7 form-outline" style={{margin: 0, padding:0, width:"49%"}}>
        <label className="form-label" style={{fontSize: '27px', fontWeight: '600'}}>New Step</label>
        <textarea className="form-control" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', width: 'calc(22vw + 300px)'}} rows="8"></textarea>
        <div className='row mt-5'>
        <PrepCookTime
          selectedPrepTime={selectedPrepTime}
          selectedCookTime={selectedCookTime}
          setPrepTime={setPrepTime}
          setCookTime={setCookTime}
        />
        </div>
      </div>

      <div className="col-md-5 mt-4" style={{margin: 0, padding:0}}>
        <UploadImage
          selectImages={selectImages}
          setImages={setImages}
          image_name="Step"
        />
      </div>
    </div>
    </>
  );
};

export default AddStep;
