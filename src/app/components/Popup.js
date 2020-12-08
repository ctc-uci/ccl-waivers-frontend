import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from './DropZone';

const Popup = (props) => {
  const popupStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0, 0.5)',
  };

  const popupBoxStyle = {
    position: 'absolute',
    left: '20%',
    right: '20%',
    top: '12%',
    bottom: '12%',
    margin: 'auto',
    borderRadius: '20px',
    background: 'white',
  };

  const closeUpload = () => {
    props.closePopup();
  };

  return (
    <>
      <a href=" #" onClick={closeUpload}>
        <div style={popupStyle} />
      </a>
      <div style={popupBoxStyle}>
        <h1>
          Upload Template
          {' '}
          <button onClick={closeUpload} type="button" className="close" aria-label="Close">
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
