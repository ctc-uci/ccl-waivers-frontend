import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ checked }) => (
  <div className="sidebar">
    <h3>Manage Waivers</h3>
    <h4>
      {checked}
      {' '}
      Waivers Selected
    </h4>
    <a href="/" className="sidebar-link">Download</a>
    <a href="/" className="sidebar-link">Print</a>
    <a href="/" className="sidebar-link">Delete</a>
  </div>
);

Sidebar.propTypes = {
  checked: PropTypes.number.isRequired,
};

export default Sidebar;
