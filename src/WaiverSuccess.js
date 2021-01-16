import React, { useEffect } from 'react';
import './WaiverSuccess.css';
import cclImage from './src_app_images_dashboard_ccl-logo.png';

function WaiverSuccess() {
  const pdf = window.history.state.state.pdfRef;
  useEffect(() => {
    document.body.style.background = ' #e8e7ec';
  }, []);
  async function downloadPDF() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdf);
    link.download = 'test.pdf';
    document.body.append(link);
    link.click();
    link.remove();
  }
  return (
    <div className="waiver-success-home">
      <div className="waiver-thank-you">
        <div className="ccl_logo_img_wrapper">
          <img className="ccl_logo_img" src={cclImage} alt="" />
        </div>
        <div className="waiver-thank-you-modal-text">Thank You!</div>
        <div className="waiver-thank-you-message-group1">
          <div className="waiver-thank-you-message">
            Your submission, The Title of the Waiver/Form, has been received.
            {' '}
          </div>
          <div className="waiver-thank-you-message">
            You can download a PDF copy of your submission
            {' '}
            <a
              type="button"
              href={downloadPDF}
              className="waiver-thank-you-download"
              onClick={downloadPDF}
            >
              here
            </a>
          </div>
        </div>
        <div className="waiver-thank-you-message-group1">
          <div className="waiver-thank-you-message">
            If you have additional questions or concerns, you can find our
            contact information at
            {' '}
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
