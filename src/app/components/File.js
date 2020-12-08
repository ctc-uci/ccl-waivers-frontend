import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

  const linkStyle = {
    color: 'blue',
    textDecoration: 'none',
  };

  const handleCopied = () => {
    console.log('copied', id);
    props.getId(id);
    setCopied(!isCopied);
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
          <a style={linkStyle} href="# " onClick={handleCopied}>{isCopied ? '\u2713 Copied' : '\u26D3 Copy Link' }</a>
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
