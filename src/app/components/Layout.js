import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Layout.css';

const Layout = ({ children }) => (
  <div>
    <div className="header">
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
