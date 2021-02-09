/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import axios from 'axios';
import './DropZone.css';
import config from '../../../../config';

function Dropzone({ onClose }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({ // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'application/pdf',
  });

  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    let done = true;
    const progressBars = document.getElementsByClassName('progress');
    for (let i = 0; i < progressBars; i += 1) {
      if (progressBars[i].style.width !== '100%') {
        done = false;
        break;
      }
    }
    setUploaded(done);
  });

  const dropzoneBox = useMemo(() => {
    let base = 'dropzone-zone';
    if (isDragActive) {
      base += ' dropzone-active';
    }
    if (isDragAccept) {
      base += ' dropzone-accept';
    }
    if (isDragReject) {
      base += ' dropzone-reject';
    }
    return base;
  }, [
    isDragActive,
    isDragReject,
    isDragAccept,
  ]);

  const myUploadProgress = (myFileId) => (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percent = Math.floor((loaded * 100) / total);
    const progress = document.getElementById(myFileId);
    progress.innerHTML = '<img alt="Progress spinner" src="/icons/spinner-icon.png" height="50px" className="spinning-progress" />';
    if (percent === 100) {
      progress.innerHTML = '<img alt="Progress spinner" src="/icons/check-icon.png" height="50px" />';
    }
  };

  const uploadTemplates = () => {
    const upload = async (file, options) => {
      await axios.post(`${config.apiUrl}/templates`, file, { withCredentials: true, ...options });
    };
    if (acceptedFiles.length !== 0) {
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const options = {
          onUploadProgress: myUploadProgress(acceptedFiles[i].path),
        };

        const formData = new FormData();
        formData.append('file', acceptedFiles[i]);
        upload(formData, options);
      }
      if (uploaded) {
        setTimeout(() => {
          onClose();
        }, 750);
      }
    }
  };

  const deleteUploadedTemplate = (event) => {
    const index = acceptedFiles.findIndex((file) => file.name
    === event.target.parentNode.parentNode.parentNode.id);
    acceptedFiles.splice(index, 1);
  };
  return (
    <div className="container">
      <div className={dropzoneBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <span className="dropzone-text">Drag and drop a fillable PDF</span>
        <span className="dropzone-text">or</span>
        <button type="button" className="fileSelector" onClick={open}>
          Select file from computer
        </button>
      </div>
      <aside>
        <ul className="files-list">
          {acceptedFiles.map((file) => (
            <li key={file.path} className="file-item">
              <span id={file.path}>
                <div />
              </span>
              <p>
                {file.path}
                <br />
                {file.size / 1000}
                {' '}
                KB
              </p>
              <button type="button" className="remove-file-btn" aria-label="Remove" onClick={deleteUploadedTemplate}>
                <img alt="Close upload template form" src="/icons/close-icon.png" />
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="popup-buttons">
        <button type="button" className="orange-outline-btn popup-btn" onClick={onClose}>Cancel</button>
        {acceptedFiles.length === 0 ? (<button type="button" className="disabled-btn orange-btn popup-btn" onClick={uploadTemplates}>Upload All</button>) : (<button type="button" className="orange-btn popup-btn" onClick={uploadTemplates}>Upload All</button>)}
      </div>
    </div>
  );
}

  <Dropzone />;

Dropzone.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Dropzone;
