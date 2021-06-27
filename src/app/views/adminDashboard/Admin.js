/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Searchbar from '../../components/adminDashboard/searchbar/Searchbar';
import config from '../../../config';
import Spinner from '../../components/loadingSpinner/spinner';
import EditWaiver from '../../components/adminDashboard/editwaiver/EditWaiver';
import SortFeature from '../../components/adminDashboard/sortfeature/SortFeature';
import './Admin.css';

const Admin = () => {
  const [waiverList, setWaiverList] = useState([]);
  const [waiverListFiltered, setWaiverListFiltered] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filesSelected, setFilesSelected] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editID, setEditID] = useState(null);
  const [selection, setSelection] = useState('');

  const getWaivers = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/waivers`, { withCredentials: true });
      setWaiverList(res.data);
      setWaiverListFiltered(res.data);
      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getWaivers();
  }, []);

  const getDate = (uploadDate) => moment(uploadDate).format('MM/DD/YY');

  const selectWaiver = (event) => {
    const tablerow = event.target.parentNode.parentNode;
    const file = tablerow.id;
    if (event.target.checked) {
      tablerow.classList.add('selected-row');
      setFilesSelected([...filesSelected, file]);
    } else {
      tablerow.classList.remove('selected-row');
      const files = filesSelected.filter((f) => f !== file);
      setFilesSelected(files);
    }
  };

  const filterBy = (currWaiver, currSearchTerm) => {
    const searchTermLowerCase = currSearchTerm.toLowerCase();
    if (currSearchTerm !== '') {
      return (
        currWaiver.fileName.toLowerCase().slice(0, searchTermLowerCase.length)
        === searchTermLowerCase
        || currWaiver.name.toLowerCase()
          .slice(0, searchTermLowerCase.length) === searchTermLowerCase
      );
    }
    return currWaiver;
  };

  const updateInput = async (searchTerm) => {
    const filtered = waiverList.filter((waiver) => filterBy(waiver, searchTerm));
    setInput(searchTerm);
    setWaiverListFiltered(filtered);
  };

  const selectAllWaivers = () => {
    const checkboxes = document.getElementsByName('waivers');
    const files = [];
    for (let i = 0; i < checkboxes.length; i += 1) {
      checkboxes[i].checked = true;
      const tablerow = checkboxes[i].parentNode.parentNode;
      const file = tablerow.id;
      files.push(file);
      tablerow.classList.add('selected-row');
    }
    setFilesSelected(files);
  };

  const unselectAllWaivers = () => {
    const checkboxes = document.getElementsByName('waivers');
    for (let i = 0; i < checkboxes.length; i += 1) {
      checkboxes[i].checked = false;
      const tablerow = checkboxes[i].parentNode.parentNode;
      tablerow.classList.remove('selected-row');
    }
    setFilesSelected([]);
  };

  const deleteWaivers = () => {
    async function deleteWaiver(id) {
      await axios.delete(`${config.apiUrl}/waivers/${id}`, { withCredentials: true });
    }
    if (filesSelected.length !== 0) {
      for (let i = 0; i < filesSelected.length; i += 1) {
        deleteWaiver(filesSelected[i]);
      }
      setIsLoading(true);
      getWaivers();
      setFilesSelected([]);
    }
  };

  const editWaiver = (waiverID) => {
    setShowPopup(true);
    setEditID(waiverID);
  };

  const onClose = () => {
    setShowPopup(false);
    getWaivers();
  };

  const sortList = (select) => {
    const temp = [...waiverListFiltered];
    if (select === 'A - Z (first name)') {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    } else if (select === 'Z - A (first name)') {
      temp.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    } else if (select === 'Newest') {
      temp.sort((a, b) => {
        const diff = Date.parse(b.createdDateTime) - Date.parse(a.createdDateTime);
        if (diff < 0) return -1;
        if (diff > 0) return 1;
        return 0;
      });
    } else if (select === 'Oldest') {
      temp.sort((a, b) => {
        const diff = Date.parse(a.createdDateTime) - Date.parse(b.createdDateTime);
        if (diff < 0) return -1;
        if (diff > 0) return 1;
        return 0;
      });
    }
    setWaiverListFiltered(temp);
  };

  useEffect(() => {
    sortList(selection);
  }, [selection]);

  const selectSort = (e) => {
    setSelection(e.target.innerHTML);
    sortList(e.target.innerHTML);
  };

  return (
    <div className="admin-dashboard">
      <Searchbar keyword={input} setKeyword={updateInput} />
      <div className="waiver-options">
        <span className="selected-text">
          {filesSelected.length}
          {' '}
          Selected
        </span>
        {filesSelected.length === 0 ? (
          <button type="button" className="orange-btn waiver-option" onClick={selectAllWaivers}>
            Select All
          </button>
        ) : (
          <button type="button" className="orange-btn waiver-option" onClick={unselectAllWaivers}>
            Deselect All
          </button>
        )}

        {filesSelected.length === 0 || waiverList.length === 0 ? (
          <button type="button" className="orange-btn waiver-option disabled-btn">
            <img src="icons/trash-can-icon.png" alt="Trash Can Icon" height="15px" />
            Delete
          </button>
        ) : (
          <button type="button" className="orange-btn waiver-option" onClick={deleteWaivers}>
            <img src="icons/trash-can-icon.png" alt="Trash Can Icon" height="15px" />
            Delete
          </button>
        )}
        <SortFeature selection={selection} selectSort={selectSort} />
      </div>
      <div className="scrollable-div">
        <table className="waiver-table">
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Name</th>
              <th>Role</th>
              <th>Date Signed</th>
              <th>Notes (100 chars)</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          {isLoading ? (
            <Spinner className="sk-center" />
          ) : (
            waiverListFiltered && waiverListFiltered.length > 0
              ? waiverListFiltered.map((waiver) => (
                <tr id={waiver.id} key={waiver.id}>
                  <td>
                    <input
                      className="table-checkbox"
                      name="waivers"
                      type="checkbox"
                      onChange={selectWaiver}
                    />
                  </td>
                  <td>
                    <a
                      className="waiver-form"
                      href={waiver.thumbnail}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {waiver.name}
                    </a>
                  </td>
                  <td>{waiver.role || 'none' }</td>
                  <td>{getDate(waiver.createdDateTime)}</td>
                  <td className="waiver-notes-display">{waiver.notes}</td>
                  <td>
                    <button type="button" className="waiver-edit-btn" onClick={() => editWaiver(waiver.id)}>
                      <img src="icons/edit-icon.png" alt="Edit Icon" height="15px" />
                    </button>
                  </td>
                </tr>
              )) : null
          )}
        </table>
      </div>
      {showPopup ? <EditWaiver id={editID} closePopup={onClose} /> : null}
    </div>
  );
};

export default Admin;
