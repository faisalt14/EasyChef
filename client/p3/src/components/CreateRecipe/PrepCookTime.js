import '../../pages/CreateRecipePage/CreateForm.css';
import React, { useState, useEffect } from 'react';

function PrepCookTime({selectedPrepTime, selectedCookTime, setPrepTime, setCookTime, 
  reset, // Add resetForm prop
  name}) {
    const [prepHours, setPrepHours] = useState(selectedPrepTime.hours);
    const [prepMins, setPrepMins] = useState(selectedPrepTime.minutes);
    const [cookHours, setCookHours] = useState(selectedCookTime.hours);
    const [cookMins, setCookMins] = useState(selectedCookTime.minutes);
    


  useEffect(() => {
    const formatTime = (hours, mins) => {
      hours = parseInt(hours) || 0;
      mins = parseInt(mins) || 0;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMins = mins < 10 ? `0${mins}` : mins;
      return `${formattedHours}:${formattedMins}:00`;
    }

  
    const prepTime = formatTime(prepHours, prepMins);
    const cookTime = formatTime(cookHours, cookMins);
    setPrepTime(prepTime);
    setCookTime(cookTime);
  }, [prepHours, prepMins, cookHours, cookMins, setPrepTime, setCookTime]);

  useEffect(() => {
    if (reset) {
      setPrepHours("00");
      setPrepMins("00");
      setCookHours("00");
      setCookMins("00");
    }
  }, [reset]);
  
  const handlePrepHours = (e) => {
    const regex = /^[0-9]{1,2}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPrepHours(e.target.value);
    }
  };

  const handlePrepMins = (e) => {
    const regex = /^[0-9]{1,2}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPrepMins(e.target.value);
    }
  };

  const handleCookHours = (e) => {
    const regex = /^[0-9]{1,2}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCookHours(e.target.value);
    }
  };

  const handleCookMins = (e) => {
    const regex = /^[0-9]{1,2}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCookMins(e.target.value);
    }
  };


  return (
    <div className="container-fluid">
        <div className="recipe1.2 form-group row">

          <div
            className="input-group mb-5 mt-3"
            style={{
              width: "36rem",
              height: "20px",
              display: "flex",
              flexWrap: "nowrap",
            }}
                >
            <label
              className="col-form-label"
              style={{ fontSize: "18px", width: "45%" }}
            >
              <span className="required" style={{color: "red"}}>* </span>

              {name} Prep time
            </label>
            <div className="input-group" style={{ width: "20rem", marginLeft: "30px" }}>
              <input
                type="number"
                className="form-control"
                min="0"
                max="24"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                name="hours"
                value={prepHours}
                onChange={handlePrepHours}
              />
              <label className="input-group-text me-3">hr</label>

              <input
                type="number"
                className="form-control"
                min="0"
                max="59"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                name="minutes"
                value={prepMins}
                onChange={handlePrepMins}
              />
              <label className="input-group-text">mins</label>
            </div>
          </div>
          </div>

          <div className="recipe1.3 form-group row">

          <div
            className="input-group mb-5 mt-3"
            style={{
              width: "36rem",
              height: "20px",
              display: "flex",
              flexWrap: "nowrap"
            }}
          >
            <label
              // id="recipe1.3-name"
              className="col-form-label"
              style={{ fontSize: "18px", width: "45%" }}
            >
              <span className="required" style={{color: "red"}}>* </span>

              {name} Cooking time
            </label>
            <div className="input-group" style={{ width: "20rem", marginLeft: "30px" }}>
              <input
                type="number"
                className="form-control"
                max="24"
                min="0"
                name="hours"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                value={cookHours}
                onChange={handleCookHours}
              />
              <label className="input-group-text me-3">hr</label>

              <input
                type="number"
                className="form-control"
                max="59"
                min="0"
                name="minutes"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                value={cookMins}
                onChange={handleCookMins}
              />
              <label className="input-group-text">mins</label>
            </div>
            </div>

          </div>
    </div>
  );
}

export default PrepCookTime;
