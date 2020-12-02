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
      margin: 'auto',
      marginBottom: 0,
      display: 'block',
      width: '50px',
    };

    const linkStyle = {
      color: 'blue',
      textDecoration: 'none',
    };

    return (
      <div>
        <img style={uploadImgStyle} src={imagePreview} alt="file preview" />
        <h1>{name}</h1>
        <text>
          Created
          {' '}
          {dateCreated}
        </text>
        <br />
        <CopyToClipboard text={url}>
          <a style={linkStyle} href="# " onClick={this.handleClick}>{isLinkClicked.isCopied ? '\u2713 Link Copied to Clipboard' : '\u26D3 Click Link' }</a>
        </CopyToClipboard>
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
