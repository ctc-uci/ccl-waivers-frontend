import React from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

const Searchbar = ({ keyword, setKeyword }) => (
  <input
    className="waiver-searchbar"
    type="text"
    placeholder="Search..."
    name="search"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
  />
);

Searchbar.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
};

export default Searchbar;
