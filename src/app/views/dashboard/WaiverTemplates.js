import React, { Component } from 'react';
import File from '../../components/File';
import cloudUpload from '../../images/dashboard/cloud-upload.png';
/*
function WaiverTemplates() {
  function getDate(uploadDate) {
    const date = `${uploadDate.toLocaleDateString(undefined, { month: 'short' })}
    ${uploadDate.toLocaleDateString(undefined, { day: '2-digit' })},
    ${uploadDate.toLocaleDateString(undefined, { year: 'numeric' })}`;
    return date;
  }

  return (
    <div className="waiver-list">
      <div>template</div>
      <File name="fileName" url="#" imagePreview="https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png" dateCreated={getDate(new Date())} />
*/

function WaiverTemplate() {
  const templateStyle = {
    marginLeft: '40px',
    marginTop: '40px',
  };

  function getDate(uploadDate) {
    const date = `${uploadDate.toLocaleDateString(undefined, { month: 'short' })} ${uploadDate.toLocaleDateString(undefined, { day: '2-digit' })}, ${uploadDate.toLocaleDateString(undefined, { year: 'numeric' })}`;
    return date;
  }

  return (
    <div style={templateStyle}>
      <File name="fileName" url="ctc-uci.com" imagePreview="https://i.pinimg.com/originals/7f/d2/e4/7fd2e46b2da9819e667fb75caf475cf7.png" dateCreated={getDate(new Date())} />
    </div>
  );
}

class WaiverTemplates extends Component {
  componentDidMount() {

  }

  render() {
    const uploadStyle = {
      height: '200px',
      width: '154px',
      border: '1px solid black',
      marginLeft: '40px',
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
    };
    const uploadImgStyle = {
      margin: 'auto',
      marginBottom: 0,
      display: 'block',
      width: '50px',
    };

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className="waiver-list">
        <div style={uploadStyle}>
          <img style={uploadImgStyle} src={cloudUpload} alt="upload to cloud" />
          <div style={{ margin: 'auto', marginTop: '4px' }}>Upload template</div>
        </div>
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
      </div>
    );
  }
}

export default WaiverTemplates;
