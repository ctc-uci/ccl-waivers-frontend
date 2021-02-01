import React from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

const Searchbar = ({ keyword, setKeyword }) => (
  <form className="waiver-search" onSubmit={(e) => e.preventDefault()}>
    <img src="icons/search-icon.png" alt="Search button" height="15px" className="waiver-searchbtn" />
    <input
      className="waiver-searchbar"
      type="text"
      placeholder="Search..."
      name="search"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  </form>
);

Searchbar.propTypes = {
  keyword: PropTypes.string.isRequired,
  setKeyword: PropTypes.func.isRequired,
};

export default Searchbar;
