import React from 'react';
import PropTypes from 'prop-types';
import './SortFeature.css';

const SortFeature = ({ selection, selectSort }) => {
  const showDropdown = () => {
    document.getElementById('myDropdown').classList.toggle('show');

    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener('click', (event) => {
      if (!event.target.matches('.sort-button')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        let i;
        for (i = 0; i < dropdowns.length; i += 1) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    });
  };

  return (
    <div className="sort-dropdown">
      <button type="button" className="sort-button" onClick={showDropdown}>
        Sort by:
        {' '}
        {selection}
      </button>
      <div id="myDropdown" className="dropdown-content">
        <button type="button" className="sort-selection" onClick={selectSort}>Newest</button>
        <button type="button" className="sort-selection" onClick={selectSort}>Oldest</button>
        <button type="button" className="sort-selection" onClick={selectSort}>A - Z (first name)</button>
        <button type="button" className="sort-selection" onClick={selectSort}>Z - A (first name)</button>
      </div>
    </div>
  );
};

SortFeature.propTypes = {
  selection: PropTypes.string.isRequired,
  selectSort: PropTypes.func.isRequired,
};

export default SortFeature;
