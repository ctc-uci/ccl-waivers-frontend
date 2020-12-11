import React, { useState } from 'react';
import File from '../../components/File';
import cloudUploadIcon from '../../images/dashboard/cloud-upload.png';
import templates from './templates';
import Popup from '../../components/Popup';
import './WaiverTemplates.css';

const WaiverTemplates = () => {
  const [showPopup, setShowPopup] = useState(false);

  const getDate = (uploadDate) => {
    const date = `${uploadDate.toLocaleDateString(undefined, { month: 'short' })}
  ${uploadDate.toLocaleDateString(undefined, { day: '2-digit' })},
  ${uploadDate.toLocaleDateString(undefined, { year: 'numeric' })}`;
    return date;
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [filesSelected, setFilesSelected] = useState(templates.info.map(() => false));

  const setFileSelected = (n, selected) => {
    filesSelected[n] = selected;
    setFilesSelected(filesSelected);
  };

  const templateList = templates.info.map(
    (temps) => (
      <File
        key={temps.id}
        id={temps.id}
        fileName={temps.name}
        date={getDate(temps.date)}
        url={temps.url}
        initCopy={false}
        setSelected={setFileSelected}
      />
    ),
  );

  // RENDERING TEMPLATE MANAGER PAGE
  return (
    <div className="template-list">
      <button
        type="button"
        className="template-upload-btn"
        href="#"
        onClick={togglePopup}
      >
        <img
          className="template-upload-icon"
          src={cloudUploadIcon}
          alt="upload template"
        />
        <div className="template-upload-text">
          Upload template
        </div>
      </button>
      {showPopup ? <Popup closePopup={togglePopup} /> : null}

      {templateList}
    </div>
  );
};

export default WaiverTemplates;
