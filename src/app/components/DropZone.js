/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import axios from 'axios';
import uploadIcon from '../images/dashboard/file-upload-icon.png';
import './DropZone.css';
import config from '../../config';

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

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {' '}
      -
      {' '}
      {file.size}
      {' '}
      bytes
      {' '}
    </li>
  ));

  const uploadTemplates = () => {
    const upload = async (file) => {
      await axios.post(`${config.apiUrl}/templates`, file, { withCredentials: true });
    };
    if (acceptedFiles.length !== 0) {
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const formData = new FormData();
        formData.append('file', acceptedFiles[i]);
        upload(formData);
      }
      onClose();
    }
  };

  return (
    <div className="container">
      <div className={dropzoneBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <img className="upload-icon" src={uploadIcon} alt="upload icon" />
        <span className="dropzone-firstLine">Drop file to upload</span>
        <span className="dropzone-secondLine">or</span>
        <br />
        <button type="button" className="fileSelector" onClick={open}>
          Select File
        </button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <button type="button" className="uploadButton" onClick={uploadTemplates}>Upload</button>
    </div>
  );
}

  <Dropzone />;

Dropzone.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Dropzone;
