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
    const bar = document.getElementById(myFileId).childNodes[2].firstChild.firstChild;
    bar.style.width = `${percent}%`;
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
        }, 500);
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
        <span className="dropzone-firstLine">
          Add files via Drag and Drop or
          <button type="button" className="browse-btn" onClick={open}>
            Browse Files
          </button>
        </span>

        <div className="scrollable-div">
          <table className="upload-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Progress</th>
              </tr>
            </thead>
            {acceptedFiles.map((file) => (
              <tr id={file.path} key={file.path}>
                <td>{file.path}</td>
                <td>
                  {file.size / 1000}
                  {' '}
                  KB
                </td>
                <td>
                  <div className="progress-bar">
                    <div className="progress" />
                  </div>
                </td>
                <td>
                  <button type="button" className="remove-file-btn" aria-label="Remove" onClick={deleteUploadedTemplate}><span aria-hidden="true">&times;</span></button>
                </td>
              </tr>
            ))}
          </table>
        </div>

        <button type="button" className="orange-btn template-upload-btn" onClick={uploadTemplates}>Upload All</button>
      </div>

    </div>
  );
}

  <Dropzone />;

Dropzone.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Dropzone;
