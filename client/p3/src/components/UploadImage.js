import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


function UploadImage() {
  return (
    <>
      <div className="form2 row padding justify-content-center">
        <h3 style={{textAlign: 'center'}}>Upload images or videos</h3>
        <div className="image-upload mb-4 pb-4" style={{height: '300px', backgroundColor: 'white'}}>
          <label className="image-icon-click" htmlFor="file-input">
            <i className="bi bi-images" style={{pointerEvents: 'none'}}></i>
          </label>
        </div>

        <div className="image-rows row">
          <div className="columns1 col"></div>
          <div className="columns1 col"></div>
          <div className="columns1 col"></div>
          <div className="columns1 col d-flex justify-content-center align-items-center position-relative" style={{maxHeight: '80px'}}>
            <i className="bi bi-plus-circle mt-5 position-relative" style={{fontSize: '40px', color: '#656767'}}></i>
          </div>
        </div>
      </div>
</>
  )
}

export default UploadImage