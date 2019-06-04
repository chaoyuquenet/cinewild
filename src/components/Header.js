import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="light-blue lighten-1" role="navigation">
    <div className="nav-wrapper container"><Link to="/" className="logo-container">Cinewild</Link>
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;