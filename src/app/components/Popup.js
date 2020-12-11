import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropzone from './DropZone';
import './Popup.css';

const Popup = (props) => {
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
        <h1>
          Upload Template
          {' '}
          <button onClick={closeUpload} type="button" className="popup-close-btn" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </h1>
        <Dropzone />
      </div>
    </>
  );
};

Popup.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default Popup;
