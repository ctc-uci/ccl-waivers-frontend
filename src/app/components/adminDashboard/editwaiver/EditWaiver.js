import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../../config';
import Spinner from '../../loadingSpinner/spinner';
import './EditWaiver.css';

const EditWaiver = ({ id, closePopup }) => {
  const [waiver, setWaiver] = useState({});
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getWaiver = async () => {
    const res = await axios.get(`${config.apiUrl}/waivers/${id}`, { withCredentials: true });
    const w = res.data[0];
    setWaiver(w);
    if (w.name) {
      setFName(w.name.split(' ')[0]);
      setLName(w.name.split(' ')[1]);
    } else {
      setFName('');
      setLName('');
    }
    setRole(w.role || '');
    setNotes(w.notes || '');
    setIsLoading(false);
  };

  const handleClick = (e) => {
    if (e.target.matches('.blur')) {
      closePopup();
    }
  };

  useEffect(() => {
    getWaiver(id);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const saveInfo = () => {
    const updateWaiver = async () => {
      const newWaiver = waiver;
      newWaiver.fname = fName;
      newWaiver.lname = lName;
      newWaiver.role = role;
      newWaiver.notes = notes;
      // const res = await axios.patch(`${config.apiUrl}/waivers/${id}`,
      // oldWaiver, { withCredentials: true });
    };
    updateWaiver();
    closePopup();
  };

  const popup = (
    <>
      <div>
        <h2 className="popup-title">Edit Waiver</h2>
        <p className="popup-file">{waiver.fileName}</p>
      </div>
      <button type="button" className="close-popup" onClick={closePopup}>&#x2715;</button>
      <label htmlFor="fname">
        <p className="popup-info">First Name *</p>
        <input type="text" id="fname" name="fname" value={fName} onChange={(e) => setFName(e.target.value)} />
      </label>
      <label htmlFor="lname">
        <p className="popup-info">Last Name *</p>
        <input type="text" id="lname" name="lname" value={lName} onChange={(e) => setLName(e.target.value)} />
      </label>
      <div className="popup-one-col">
        <p className="popup-info">Role *</p>
        <label htmlFor="role">
          <input type="radio" id="volunteer" name="role" value="Volunteer" checked={role === 'Volunteer'} onChange={(e) => setRole(e.target.value)} />
          Volunteer
        </label>
        <label htmlFor="role">
          <input type="radio" id="participant" name="role" value="Participant" checked={role === 'Participant'} onChange={(e) => setRole(e.target.value)} />
          Participant
        </label>
      </div>
      <div className="popup-one-col">
        <label htmlFor="role">
          <p className="popup-info">Notes</p>
          <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </div>
      <div className="popup-buttons">
        <button type="button" className="orange-outline-btn popup-btn" onClick={closePopup}>Cancel</button>
        <button type="button" className="orange-btn popup-btn" onClick={saveInfo}>Save</button>
      </div>
    </>
  );

  return (
    <>
      <div className="blur" />
      <div className="popup">
        {isLoading ? <Spinner /> : popup}
      </div>
    </>
  );
};

EditWaiver.propTypes = {
  id: PropTypes.string.isRequired,
  closePopup: PropTypes.func.isRequired,
};

export default EditWaiver;
