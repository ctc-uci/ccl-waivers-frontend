import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Layout.css';

const Layout = ({ children }) => (
  <div>
    <div className="header">
      <div>
        <h1 id="ccl-brand">Child Creativity Lab</h1>
      </div>
      <div className="navbar">
        <NavLink exact to="/" activeClassName="active" className="navbar-links"><h4>Admin Dashboard</h4></NavLink>
        <NavLink exact to="/templates" activeClassName="active" className="navbar-links"><h4>Waiver Templates</h4></NavLink>
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
