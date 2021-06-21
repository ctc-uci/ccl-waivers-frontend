import React, { useState } from 'react';
import './ConfirmationModal.css';
import PropTypes from 'prop-types';

function ConfirmationModal({ sendPDF }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-title">
        <h4 className="confirmation-modal-text">Confirm your information from the form</h4>
      </div>
      <div className="confirmation-form">
        <div className="confirmation-name">
          <div>
            <div>First Name</div>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              name="First Name"
              className="confirmation-input"
            />
          </div>
          <div>
            <div>Last Name</div>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              name="First Name"
              className="confirmation-input"
            />
          </div>
        </div>
        <div className="text-entry">
          <div>Email</div>
          <input type="email" name="Email" className="confirmation-input-email" />
        </div>
        <div className="confirmation-modal-submit-wrapper">
          <button
            type="button"
            className="orange-btn popup-btn"
            onClick={() => {
              sendPDF(`${firstName} ${lastName}`);
            }}
          >
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
}
ConfirmationModal.propTypes = {
  sendPDF: PropTypes.func.isRequired,
};

export default ConfirmationModal;
