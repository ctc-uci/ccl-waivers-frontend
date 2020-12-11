import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import linkIcon from '../images/dashboard/link.png';
import './File.css';

const File = (props) => {
  const [isCopied, setCopied] = useState(false);

  const {
    fileName, url, date, id, setSelected,
  } = props;
  const imagePreview = 'https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png';

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
        <img className="template-thumbnail-img" src={imagePreview} alt="file preview" />
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

File.propTypes = {
  id: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default File;
