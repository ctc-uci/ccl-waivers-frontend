import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import waivers from '../../waivers';
import Searchbar from '../../components/Searchbar';
import './Admin.css';

const Admin = () => {
  const waiverList = waivers.info;
  const [totalSelected, setTotalSelected] = useState(0);
  const [waiverListFiltered, setWaiverListFiltered] = useState(waiverList);
  const [input, setInput] = useState('');

  const onChange = (event) => {
    if (event.target.checked) setTotalSelected(totalSelected + 1);
    else setTotalSelected(totalSelected - 1);
  };

  const filterBy = (currWaiver, currSearchTerm) => {
    const searchTermLowerCase = currSearchTerm.toLowerCase();
    return (
      currWaiver.name.toLowerCase().includes(searchTermLowerCase)
      || currWaiver.waiver.toLowerCase().includes(searchTermLowerCase));
  };

  const updateInput = async (searchTerm) => {
    const filtered = waiverList.filter((waiver) => (filterBy(waiver, searchTerm)));
    setInput(searchTerm);
    setWaiverListFiltered(filtered);
  };

  return (
    <Layout>
      <div className="sidebar">
        <Sidebar route="Waivers" checked={totalSelected} />
      </div>
      <div>
        <form className="waiver-search">
          <button className="waiver-searchbtn" type="submit">
            <img src="icons/search-icon.png" alt="Search button" height="15px" />
          </button>
          <Searchbar keyword={input} setKeyword={updateInput} />
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
          {waiverListFiltered.map((waiver) => (
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
    </Layout>
  );
};

export default Admin;
