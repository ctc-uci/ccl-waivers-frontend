import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const Layout = () => (
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
  </div>
);

export default Layout;
