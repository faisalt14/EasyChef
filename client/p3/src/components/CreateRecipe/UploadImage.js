import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../pages/CreateRecipePage/CreateForm.css';
import CloseButton from 'react-bootstrap/CloseButton';


function UploadImage({selectImages, setImages, image_name}) {
  const [errorMessage, setErrorMessage] = useState('');

  const onSelectFile = (event) => {
    const selectedFile = event.target.files;
    const selectedFilesArray = Array.from(selectedFile);

    if (selectImages.length + selectedFilesArray.length > 3) {
      setErrorMessage('Maximum of 3 images allowed.');
      return;
    }

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages([...selectImages, ...imagesArray]);
    setErrorMessage('');

  };


  return (
    <>
        <div className="image-upload" style={{height: '50%', width:'80%', backgroundColor: 'white'}}>
          <label className="image-icon-click"  style={{textAlign: 'center', display: 'inline-block'}}>
            <h4 style={{textAlign: 'center'}}>Upload {image_name} images or videos</h4>
            <br/>
            <input className="fileUpload" type="file" name='images' onChange={onSelectFile} multiple accept="image/png, image/jpeg, image/webp, video/*" style={{display: 'none'}}></input>
            <i className="bi bi-images"></i>
          </label>
        </div>
        {errorMessage && (
        <div className="alert alert-danger" role="alert" style={{width: "40%"}}>
          {errorMessage}
          <CloseButton style={{marginLeft: "20px"}} onClick={() => setErrorMessage('')}/>

        </div>
      )}
        <div className="images" style={{margin: "20px"}}>
          {selectImages && selectImages.map((image, index) => {
            return(
              <>
              <div key={image} className="image">
                <img className="div-image" src={image} height="200"/>
                <button onClick={() => setImages(selectImages.filter((e) => e !== image))}
                >Delete</button>
              </div>
              </>
            )
          }) }
        </div>

</>
  )
}

export default UploadImage