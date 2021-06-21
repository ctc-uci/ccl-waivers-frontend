import React from 'react';
import './WaiverSuccess.css';
import cclImage from '../../../images/ccl-logo.png';

function WaiverSuccess() {
  return (
    <div className="waiver-success-home">
      <div className="waiver-thank-you">
        <div className="ccl_logo_img_wrapper">
          <img className="ccl_logo_img" src={cclImage} alt="" />
        </div>
        <div className="waiver-thank-you-modal-text">Thank You!</div>
        <div className="waiver-thank-you-message-group1">
          <div className="waiver-thank-you-message">
            Your submission has been received.
          </div>
        </div>
        <div className="waiver-thank-you-message-group1">
          <div className="waiver-thank-you-message">
            If you have additional questions or concerns, you can find our
            contact information at
            <div
              className="waiver-thank-you-download"
            >
              info@childcreativitylab.org
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaiverSuccess;
