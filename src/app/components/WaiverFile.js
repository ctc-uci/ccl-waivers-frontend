import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import linkIcon from '../images/dashboard/link.png';
import './WaiverFile.css';

const WaiverFile = (props) => {
  const [isCopied, setCopied] = useState(false);

  const {
    fileName, url, date, id, setSelected, thumbnailUrl,
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
        <img className="template-thumbnail-img" src={thumbnailUrl} alt="file preview" />
      </div>
      <div>
        <span className="template-title">{fileName}</span>
        <p className="template-created">
          Created
          {' '}
          {date}
        </p>
        <CopyToClipboard text={url}>
          <a
            className="template-copy-link"
            href="# "
            onClick={handleCopied}
          >
            <img src={linkIcon} className="template-copy-icon" style={{ display: isCopied ? 'none' : 'inline' }} alt="link" />
            <span className="template-copy-text">{isCopied ? '\u2713 Copied' : 'Copy Shareable Link'}</span>
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
  thumbnailUrl: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default WaiverFile;
