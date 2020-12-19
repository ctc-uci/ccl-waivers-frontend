import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import tempWaiverImg from '../images/dashboard/waiverImg_placeholder.png';
import linkIcon from '../images/dashboard/link.png';
import './WaiverFile.css';

const WaiverFile = (props) => {
  const [isCopied, setCopied] = useState(false);

  const {
    fileName, url, date, id, setSelected,
  } = props;

  const handleCopied = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleCheckbox = (e) => {
    setSelected(id, e.target.value === 'on');
  };

  return (
    <div className="template-file">
      <div className="template-thumbnail">
        <input className="template-checkbox" type="checkbox" onChange={handleCheckbox} />
        <img className="template-thumbnail-img" src={tempWaiverImg} alt="file preview" />
      </div>
      <div>
        <h3 className="template-title">{fileName}</h3>
        <div>
          Created
          {' '}
          {date}
        </div>
        <CopyToClipboard text={url}>
          <a
            className="template-copy-link"
            href="# "
            onClick={handleCopied}
          >
            <img src={linkIcon} className="template-copy-icon" style={{ display: isCopied ? 'none' : 'inline' }} alt="link" />
            <span className="template-copy-text">{isCopied ? '\u2713 Copied' : 'Copy Link'}</span>
          </a>
        </CopyToClipboard>
      </div>
    </div>
  );
};

WaiverFile.propTypes = {
  id: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default WaiverFile;
