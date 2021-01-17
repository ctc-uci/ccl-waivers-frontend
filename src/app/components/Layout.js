import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Layout.css';
import logo from '../images/dashboard/ccl-logo.png';

const Layout = ({ children }) => (
  <div>
    <div className="header">
      <div className="logo-container">
        <img className="ccl-logo" src={logo} alt="CCL-Logo" />
      </div>
      <div className="brand-container">
        <text className="ccl-brand" id="ccl-brand">Child Creativity Lab</text>
      </div>
      <div className="navbar">
        <NavLink exact to="/" activeClassName="active-link" className="navbar-links">
          <p>Admin Dashboard</p>
        </NavLink>
        <NavLink exact to="/templates" activeClassName="active-link" className="navbar-links">
          <p>Waiver Templates</p>
        </NavLink>
      </div>
      <NavLink exact to="/logout" className="logout-link">
        <p>Logout</p>
      </NavLink>
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
