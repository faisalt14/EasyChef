import React from 'react';
import '../../pages/CreateRecipePage/CreateForm.css';

function PrepCookTime({selectedPrepTime, selectedCookTime, setPrepTime, setCookTime}) {

  const handlePrepTimeChange = (e) => {
    const regex = /^[0-9]{1,2}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPrepTime(e.target.value);
    }
  };

  const handleCookTimeChange = (e) => {
    const regex = /^[0-9]{1,2}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCookTime(e.target.value);
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
              id="recipe1.2-name"
              className="col-form-label"
              style={{ fontSize: "18px" }}
            >
              Prep time
            </label>
            <div className="input-group" style={{ width: "20rem", marginLeft: "30px" }}>
              <input
                type="number"
                className="form-control"
                min="0"
                max="24"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                name="hours"
                value={selectedPrepTime.hours}
                onChange={handlePrepTimeChange}
              />
              <label className="input-group-text me-3">hr</label>

              <input
                type="number"
                className="form-control"
                min="0"
                max="59"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                name="minutes"
                value={selectedPrepTime.minutes}
                onChange={handlePrepTimeChange}
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
              id="recipe1.3-name"
              className="col-form-label"
              style={{ fontSize: "18px" }}
            >
              Cooking time
            </label>
            <div className="input-group" style={{ width: "20rem", marginLeft: "30px" }}>
              <input
                type="number"
                className="form-control"
                max="24"
                min="0"
                name="hours"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                value={selectedCookTime.hours}
                onChange={handleCookTimeChange}
              />
              <label className="input-group-text me-3">hr</label>

              <input
                type="number"
                className="form-control"
                max="59"
                min="0"
                name="minutes"
                pattern="[0-9]{1,2}" // only allows 1-2 digits
                value={selectedCookTime.minutes}
                onChange={handleCookTimeChange}
              />
              <label className="input-group-text">mins</label>
            </div>
            </div>

          </div>
    </div>
  );
}

export default PrepCookTime;
