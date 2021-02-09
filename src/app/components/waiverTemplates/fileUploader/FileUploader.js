import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropzone from '../dropzone/DropZone';
import './FileUploader.css';

const FileUploader = (props) => {
  const closeUpload = () => {
    props.closePopup();
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      closeUpload();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  });

  return (
    <>
      <a href=" #" onClick={closeUpload}>
        <div className="popup-backdrop" />
      </a>
      <div className="popup-box">
        <h1 className="title">
          Upload Template
        </h1>
        <Dropzone onClose={closeUpload} />
      </div>
    </>
  );
};

FileUploader.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default FileUploader;
