import React, { Component } from 'react';
import PropTypes from 'prop-types';

class File extends Component {
  constructor(props) {
    super(props);
    this.state = { copiedLink: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      copiedLink: !(prevState.copiedLink),
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
        <a style={linkStyle} href={url} onClick={this.handleClick}>{isLinkClicked.copiedLink ? '\u2713 Link Copied to Clipboard' : '\u26D3 Click Link' }</a>
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
