import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import WaiverFile from '../../components/WaiverFile';
import cloudUploadIcon from '../../images/dashboard/cloud-upload.png';
import FileUploader from '../../components/FileUploader';
import './WaiverTemplates.css';
import Layout from '../../components/Layout';
import config from '../../../config';

const WaiverTemplates = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  const getDate = (uploadDate) => {
    const dateObj = new Date(uploadDate);
    return `${dateObj.toLocaleDateString(undefined, { month: 'short' })}
            ${dateObj.toLocaleDateString(undefined, { day: '2-digit' })},
            ${dateObj.toLocaleDateString(undefined, { year: 'numeric' })}`;
  };

  useEffect(() => {
    async function getTemplates() {
      const res = await axios.get(`${config.apiUrl}/templates`, { withCredentials: true });
      setTemplates(res.data);
      setIsLoading(false);
    }
    getTemplates();
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [filesSelected, setFilesSelected] = useState(templates.map(() => false));

  const setFileSelected = (n, selected) => {
    filesSelected[n] = selected;
    setFilesSelected(filesSelected);
  };

  const templateList = useMemo(() => templates.map(
    (temp, idx) => (
      <WaiverFile
        key={temp.id}
        id={idx}
        fileName={temp.fileName}
        date={getDate(temp.createdDateTime)}
        url={temp.temporaryDownloadLink}
        thumbnailUrl={temp.thumbnailUrl}
        initCopy={false}
        setSelected={setFileSelected}
      />
    ),
  ), [templates]);

  // RENDERING TEMPLATE MANAGER PAGE
  return (
    <Layout>
      { isLoading ? <div>Loading</div>
        : (
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
            {showPopup ? <FileUploader closePopup={togglePopup} /> : null}

            {templateList}
          </div>
        )}
    </Layout>
  );
};

export default WaiverTemplates;
