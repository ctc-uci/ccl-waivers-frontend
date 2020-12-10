import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import linkIcon from '../images/dashboard/link.png';

const File = (props) => {
  const [isCopied, setCopied] = useState(false);

  // const getCopiedId = () => {
  //   const selectedId = props.tempData.id;
  //   this.handleCopied(selectedId);
  // };

  const {
    fileName, url, date, id,
  } = props;
  const imagePreview = 'https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png';

  const uploadImgStyle = {
    height: '200px',
    width: '154px',
    border: '1px solid black',
    marginRight: '50px',
    display: 'flex',

    // margin: 'auto',
    // marginBottom: 0,
    // display: 'block',
    // height: '200px',
    // width: '154px',
    // border: '1px solid black',

  };

  const handleCopied = () => {
    console.log('copied', id);
    props.getId(id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div>
      <img style={uploadImgStyle} src={imagePreview} alt="file preview" />
      <div>
        <h3 style={{ marginBottom: '2px', marginTop: '4px' }}>{fileName}</h3>
        <div>
          Created
          {' '}
          {date}
        </div>
        <CopyToClipboard text={url}>
          <a
            style={{
              color: '#00A3FF',
              textDecoration: 'none',
            }}
            href="# "
            onClick={handleCopied}
          >
            <img src={linkIcon} style={{ display: isCopied ? 'none' : 'inline', height: '16px', verticalAlign: 'middle' }} alt="link" />
            <span style={{ marginLeft: '2px', verticalAlign: 'middle' }}>{isCopied ? '\u2713 Copied' : 'Copy Link'}</span>
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
  getId: PropTypes.func.isRequired,
};

export default File;
