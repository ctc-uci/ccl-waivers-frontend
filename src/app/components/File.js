import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isCopied: !(prevState.isCopied),
    }));
  }

  render() {
    const { name } = this.props;
    const { dateCreated } = this.props;
    const { url } = this.props;
    const { imagePreview } = this.props;
    const isLinkClicked = this.state;

    const uploadImgStyle = {
      // height: 'contain',
      // width: '154px',
      // marginTop: '42px',

      margin: 'auto',
      marginBottom: 0,
      display: 'block',
      height: '200px',
      width: '154px',
      border: '1px solid black',

    };

    const linkStyle = {
      color: 'blue',
      textDecoration: 'none',
    };

    return (
      <div>
        <img style={uploadImgStyle} src={imagePreview} alt="file preview" />
        {/* // <b>{name}</b>
        // <br />
        // <text>
        //   Created
        //   {' '}
        //   {dateCreated}
        // </text>
        // <br />
        // <CopyToClipboard text={url}>
        //   <a style={linkStyle} href="# " onClick={this.handleClick}>{isLinkClicked.isCopied
        ? '\u2713 Link Copied to Clipboard' : '\u26D3 Click Link' }</a>
        // </CopyToClipboard> */}

        <div>
          <h3 style={{ marginBottom: '2px', marginTop: '4px' }}>{name}</h3>
          <div>
            Created
            {' '}
            {dateCreated}
          </div>
          <CopyToClipboard text={url}>
            <a style={linkStyle} href="# " onClick={this.handleClick}>{isLinkClicked.isCopied ? '\u2713 Copied' : '\u26D3 Copy Link' }</a>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

File.propTypes = {
  name: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imagePreview: PropTypes.string.isRequired,
};

export default File;
