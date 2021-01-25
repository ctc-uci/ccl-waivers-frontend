import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProtectedRoute from '../../components/routes/ProtectedRoute';
import WaiverFile from '../../components/waiverTemplates/waiverfile/WaiverFile';
import FileUploader from '../../components/waiverTemplates/fileUploader/FileUploader';
import config from '../../../config';
import Spinner from '../../components/loadingSpinner/spinner';
import './WaiverTemplates.css';

const WaiverTemplates = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState([]);

  const { path } = props;

  const getDate = (uploadDate) => {
    const dateObj = new Date(uploadDate);
    return `${dateObj.toLocaleDateString(undefined, { month: 'short' })}
            ${dateObj.toLocaleDateString(undefined, { day: '2-digit' })},
            ${dateObj.toLocaleDateString(undefined, { year: 'numeric' })}`;
  };

  const getTemplates = async () => {
    const res = await axios.get(`${config.apiUrl}/templates`, { withCredentials: true });
    setTemplates(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getTemplates();
  });

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

  return (
    <ProtectedRoute exact path={path}>
      <div className="templates-container">
        { isLoading ? <Spinner />
          : (
            <>
              <button
                type="button"
                className="template-upload-btn"
                href="#"
                onClick={togglePopup}
              >
                Upload New Template
              </button>
              <br />
              <div className="template-list">
                {showPopup ? <FileUploader closePopup={togglePopup} /> : null}
                {templateList.length === 0 ? <h2 className="empty-list">There are currently no templates in OneDrive.</h2> : templateList}
              </div>
            </>
          )}
      </div>
    </ProtectedRoute>
  );
};

WaiverTemplates.propTypes = {
  path: PropTypes.string.isRequired,
};

export default WaiverTemplates;
