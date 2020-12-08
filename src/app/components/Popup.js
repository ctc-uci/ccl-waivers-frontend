import React from 'react';

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

const Popup = () => (
  <>
    <div style={popupStyle} />
    <div style={popupBoxStyle}>
      <h1>Upload Template</h1>
    </div>
  </>

);

export default Popup;
