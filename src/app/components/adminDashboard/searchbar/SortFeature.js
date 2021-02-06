import React from 'react';
import './SortFeature.css';

const SortFeature = () => {
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
      <button type="button" className="sort-button" onClick={showDropdown}>Sort by: Newest</button>
      <div id="myDropdown" className="dropdown-content">
        <p>Newest</p>
        <p>Oldest</p>
        <p>A - Z (first name)</p>
        <p>Z - A (first name)</p>
      </div>
    </div>
  );
};

export default SortFeature;
