import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import waivers from '../../waivers';
import './Admin.css';

const Admin = () => {
  const [totalSelected, setTotalSelected] = useState(0);

  const onChange = (event) => {
    if (event.target.checked) setTotalSelected(totalSelected + 1);
    else setTotalSelected(totalSelected - 1);
  };

  return (
    <>
      <div className="sidebar">
        <Sidebar route="Waivers" checked={totalSelected} />
      </div>
      <div>
        <form className="waiver-search">
          <button className="waiver-searchbtn" type="submit">
            <img src="icons/search-icon.png" alt="Search button" height="15px" />
          </button>
          <input className="waiver-searchbar" type="text" placeholder="Search..." name="search" />
        </form>
        <table className="waiver-table">
          <tr>
            <input type="checkbox" className="table-checkbox" />
            <th>File Name</th>
            <th>Name</th>
            <th>Role</th>
            <th>Date Signed</th>
            <th>Notes</th>
          </tr>
          {waivers.info.map((waiver) => (
            <tr id={waiver.id}>
              <input className="table-checkbox" type="checkbox" onChange={onChange} />
              <td>{waiver.waiver}</td>
              <td>{waiver.name}</td>
              <td>{waiver.role}</td>
              <td>{waiver.date}</td>
              <td>{waiver.notes}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Admin;
