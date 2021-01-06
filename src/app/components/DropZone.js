/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../images/dashboard/file-upload-icon.png';
import './DropZone.css';

function Dropzone() {
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
    </div>
  );
}

  <Dropzone />;

export default Dropzone;
