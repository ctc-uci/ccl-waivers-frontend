import React, { useEffect } from 'react';
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
    borderRadius: '10px',
    background: 'white',
    padding: '30px',
    zIndex: 99999,
  };

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
        <div style={popupStyle} />
      </a>
      <div style={popupBoxStyle}>
        <h1>
          Upload Template
          {' '}
          <button onClick={closeUpload} type="button" className="close" style={{ float: 'right' }} aria-label="Close">
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
