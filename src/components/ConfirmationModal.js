import React from 'react';
import './ConfirmationModal.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function ConfirmationModal({ pdfRef }) {
  const history = useHistory();
  async function sendPDF() {
    const temp = await pdfRef();
    history.push('/WaiverSuccess', { pdfRef: temp });
  }
  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-title">
        <h3 className="confirmation-modal-text">Confirm your information from the form</h3>
      </div>
      <div className="name">
        <div className="text-entry">
          <div>First Name</div>
          <input type="text" name="First Name" className="confirmation-input" />
        </div>
        <div className="text-entry">
          <div>Last Name</div>
          <input type="text" name="First Name" className="confirmation-input" />
        </div>
      </div>
      <div className="name">
        <div className="text-entry">
          <div>Email</div>
          <input type="text" name="Email" className="confirmation-input-email" />
        </div>
      </div>
      <div className="confirmation-modal-submit-wrapper">
        <button type="button" className="confirmation-modal-submit" onClick={sendPDF}>Submit Form</button>
      </div>
    </div>
  );
}
ConfirmationModal.propTypes = {
  pdfRef: PropTypes.element.isRequired,
};

export default ConfirmationModal;
