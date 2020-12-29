import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Layout.css';
import logo from '../images/dashboard/ccl-logo.png';

const Layout = ({ children }) => (
  <div>
    <div className="header">
      <div className="logo-contaner">
        <img className="ccl-logo" src={logo} alt="CCL-Logo" />
      </div>
      <div className="brand-container">
        <text className="ccl-brand" id="ccl-brand">Child Creativity Lab</text>
      </div>
      <div className="navbar">
        <NavLink exact to="/" activeClassName="active" className="navbar-links">
          <p>Admin Dashboard</p>
        </NavLink>
        <NavLink exact to="/templates" activeClassName="active" className="navbar-links">
          <p>Waiver Templates</p>
        </NavLink>
      </div>
    </div>
    <div className="content">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
