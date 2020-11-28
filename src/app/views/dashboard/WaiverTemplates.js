import { Component } from 'react';
import cloudUpload from '../../images/dashboard/cloud-upload.png';

function WaiverTemplate() {
  const templateStyle = {
    height: '200px',
    width: '154px',
    border: '1px solid black',
    marginLeft: '40px',
    marginTop: '40px',
  };

  return (
    <div style={templateStyle}>
      template
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
        {/* <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate />
        <WaiverTemplate /> */}
      </div>
    );
  }
}

export default WaiverTemplates;
