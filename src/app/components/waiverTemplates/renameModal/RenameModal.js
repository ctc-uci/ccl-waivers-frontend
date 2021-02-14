import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RenameModal.css';

const RenameModal = ({ originalName, closePopup }) => {
  const [name, setName] = useState(originalName);

  const handleClick = (e) => {
    if (e.target.matches('.blur')) {
      closePopup();
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      closePopup();
    }
  };

  useEffect(() => {
  });

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const saveInfo = () => {
    closePopup(name);
  };

  const popup = (
    <>
      <div>
        <h2 className="rename-modal-popup-title">Rename template</h2>
        <button type="button" className="rename-modal-close" onClick={() => saveInfo(originalName)}>&#x2715;</button>
      </div>
      <label htmlFor="template-rename">
        <input type="text" id="template-rename" name="template-rename" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div className="rename-modal-popup-buttons">
        <button type="button" className="orange-outline-btn rename-modal-popup-btn" onClick={() => saveInfo(originalName)}>Cancel</button>
        <button type="button" className="orange-btn rename-modal-popup-btn" onClick={saveInfo}>Save</button>
      </div>
    </>
  );

  return (
    <>
      <div className="rename-modal-blur" />
      <div className="rename-modal-popup">
        {popup}
      </div>
    </>
  );
};

RenameModal.propTypes = {
  originalName: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default RenameModal;
