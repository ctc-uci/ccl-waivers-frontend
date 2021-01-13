import React, { useState } from 'react';
import waivers from '../../waivers';
import Searchbar from '../../components/Searchbar';
import './Admin.css';

const Admin = () => {
  const waiverList = waivers.info;
  const [totalSelected, setTotalSelected] = useState(0);
  const [waiverListFiltered, setWaiverListFiltered] = useState(waiverList);
  const [input, setInput] = useState('');

  const selectWaiver = (event) => {
    const tablerow = event.target.parentNode.parentNode;
    if (event.target.checked) {
      setTotalSelected(totalSelected + 1);
      tablerow.classList.add('selected-row');
    } else {
      setTotalSelected(totalSelected - 1);
      tablerow.classList.remove('selected-row');
    }
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

  const selectAllWaivers = () => {
    const checkboxes = document.getElementsByName('waivers');
    for (let i = 0; i < checkboxes.length; i += 1) {
      checkboxes[i].checked = true;
      const tablerow = checkboxes[i].parentNode.parentNode;
      tablerow.classList.add('selected-row');
    }
    setTotalSelected(checkboxes.length);
  };

  const unselectAllWaivers = () => {
    const checkboxes = document.getElementsByName('waivers');
    for (let i = 0; i < checkboxes.length; i += 1) {
      checkboxes[i].checked = false;
      const tablerow = checkboxes[i].parentNode.parentNode;
      tablerow.classList.remove('selected-row');
    }
    setTotalSelected(0);
  };

  const downloadWaivers = () => {
    console.log('download');
  };

  const deleteWaivers = () => {
    console.log('delete');
  };

  return (
    <div className="admin-dashboard">
      <Searchbar keyword={input} setKeyword={updateInput} />
      <div className="waiver-options">
        <span>
          {totalSelected === 0 ? null : <input type="checkbox" className="selected-checkbox" defaultChecked onClick={unselectAllWaivers} />}
          {totalSelected}
          {' '}
          Selected
        </span>
        <button type="button" className="waiver-option" onClick={selectAllWaivers}>Select All</button>
        <button type="button" className="waiver-option" onClick={downloadWaivers}>Download</button>
        <button type="button" className="waiver-option" onClick={deleteWaivers}>Delete</button>
      </div>
      <div className="scrollable-div">
        <table className="waiver-table">
          <tr>
            <span />
            <th>Name</th>
            <th>Form</th>
            <th>Role</th>
            <th>Date Signed</th>
            <th>Notes</th>
          </tr>
          {waiverListFiltered.map((waiver) => (
            <tr id={waiver.id} key={waiver}>
              <td><input className="table-checkbox" name="waivers" type="checkbox" onChange={selectWaiver} /></td>
              <td>{waiver.name}</td>
              <td className="waiver-form">{waiver.waiver}</td>
              <td>{waiver.role}</td>
              <td>{waiver.date}</td>
              <td>{waiver.notes}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Admin;
