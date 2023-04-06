import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../pages/CreateRecipePage/CreateForm.css';
import CloseButton from 'react-bootstrap/CloseButton';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);


function UploadImage({ selectImages, setImages, image_name }) {
  const [errorMessage, setErrorMessage] = useState('');

  const handleInit = () => {
    console.log('FilePond instance has initialized');
  };

  const handleFileChange = async (fileItems) => {
    const filesArray = await Promise.all(
      fileItems.map((fileItem) => {
        const file = fileItem.file;
        const filename = file.name;
        const type = file.type;
        return new File([file], filename, { type });
      })
    );

    setImages(filesArray);
    setErrorMessage('');
    const deletedFiles = fileItems.filter((item) => !item.file);
    deletedFiles.forEach((item) => {
      const index = fileItems.indexOf(item);
      if (index !== -1) {
        fileItems.splice(index, 1);
      }
    });
  };

  return (
    <>
      <div className="image-upload" style={{ width: '80%', backgroundColor: 'white', maxHeight: '500px', overflow: 'scroll', paddingTop: "100px",
    justifyContent: "center",
    alignItems: "center"}}>
        <div className="image-icon-click" style={{ textAlign: 'center', width: "70%", position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
          <h4 style={{ textAlign: 'center'}}>Upload {image_name} images or videos</h4>
          <h6 style={{color: 'grey'}}>Maximum of 3 files are allowed</h6>
          <br />
          <FilePond
            allowMultiple={true}
            maxFiles={3}
            oninit={() => handleInit()}
            onupdatefiles={(fileItems) => handleFileChange(fileItems)}
          />
          <i className="bi bi-images"></i>
        </div>
      </div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '40%' }}>
          {errorMessage}
          <CloseButton style={{ marginLeft: '20px' }} onClick={() => setErrorMessage('')} />
        </div>
      )}
      {/* <div className="images" style={{ margin: '20px' }}>
        {selectImages &&
          selectImages.map((file, index) => {
            return (
              <>
                <div key={index} className="image">
                  <img className="div-image" src={URL.createObjectURL(file)} height="200" />
                  <button onClick={() => setImages(selectImages.filter((e) => e !== file))}>Delete</button>
                </div>
              </>
            );
          })}
      </div> */}
    </>
  );
}

export default UploadImage;
