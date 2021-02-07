import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../../components/adminDashboard/searchbar/Searchbar';
import './Admin.css';
import config from '../../../config';
import Spinner from '../../components/loadingSpinner/spinner';
import EditWaiver from '../../components/adminDashboard/editwaiver/EditWaiver';
import SortFeature from '../../components/adminDashboard/sortfeature/SortFeature';

const Admin = () => {
  const [waiverList, setWaiverList] = useState(JSON.parse(localStorage.getItem('waivers')) || []);
  const [waiverListFiltered, setWaiverListFiltered] = useState(JSON.parse(localStorage.getItem('waivers')) || []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filesSelected, setFilesSelected] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editID, setEditID] = useState(null);

  const getWaivers = async () => {
    const res = await axios.get(`${config.apiUrl}/waivers`, { withCredentials: true });
    localStorage.setItem('waivers', JSON.stringify(res.data));
    setWaiverList(res.data);
    setWaiverListFiltered(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (waiverList === []) {
      getWaivers();
    } else {
      setIsLoading(false);
      const res = axios.get(`${config.apiUrl}/waivers`, { withCredentials: true });
      if (res.data !== waiverList) {
        getWaivers();
      }
    }
    return () => (true);
  }, [waiverList]);

  const getDate = (uploadDate) => {
    const dateObj = new Date(uploadDate);
    return `${dateObj.toLocaleDateString(undefined, { month: 'short' })}
            ${dateObj.toLocaleDateString(undefined, { day: '2-digit' })},
            ${dateObj.toLocaleDateString(undefined, { year: 'numeric' })}`;
  };

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
    if (currSearchTerm !== '') return (currWaiver.fileName.toLowerCase().includes(searchTermLowerCase));
    return (currWaiver);
  };

  const updateInput = async (searchTerm) => {
    const filtered = waiverList.filter((waiver) => (filterBy(waiver, searchTerm)));
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

  const downloadWaivers = () => {
    const download = async (id) => {
      const res = await axios.get(`${config.apiUrl}/waivers/${id}`, { withCredentials: true });
      const link = res.data[0].temporaryDownloadLink;
      const linkElem = document.createElement('a');
      linkElem.href = link;
      document.body.appendChild(linkElem);
      linkElem.click();
    };
    if (filesSelected.length !== 0) {
      download(filesSelected[0]);
    }
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

  const editWaiver = (e) => {
    setShowPopup(true);
    setEditID(e.target.parentNode.parentNode.id);
  };

  const onClose = () => {
    setShowPopup(false);
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
          <button type="button" className="orange-btn waiver-option" onClick={selectAllWaivers}>Select All</button>
        ) : (<button type="button" className="orange-btn waiver-option" onClick={unselectAllWaivers}>Deselect All</button>)}

        {filesSelected.length === 0 || waiverList.length === 0 ? (
          <button type="button" className="orange-btn waiver-option disabled-btn">
            <img src="icons/download-icon.png" alt="Trash Can Icon" height="15px" />
            Download
          </button>

        ) : (
          <button type="button" className="orange-btn waiver-option" onClick={downloadWaivers}>
            <img src="icons/download-icon.png" alt="Download Icon" height="15px" />
            Download
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
        <SortFeature />
      </div>
      <div className="scrollable-div">
        <table className="waiver-table">
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Form</th>
            <th>Role</th>
            <th>Date Signed</th>
            <th>Notes</th>
            <th>&nbsp;</th>
          </tr>
          {isLoading ? <Spinner className="sk-center" /> : waiverListFiltered.map((waiver) => (
            <tr id={waiver.id} key={waiver.id}>
              <td><input className="table-checkbox" name="waivers" type="checkbox" onChange={selectWaiver} /></td>
              <td>{waiver.name}</td>
              <td className="waiver-form">{waiver.fileName}</td>
              <td>{waiver.role}</td>
              <td>{getDate(waiver.createdDateTime)}</td>
              <td>{waiver.notes}</td>
              <td>
                <button type="button" className="waiver-edit-btn" onClick={editWaiver}>
                  <img src="icons/edit-icon.png" alt="Edit Icon" height="15px" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      {showPopup ? <EditWaiver id={editID} closePopup={onClose} /> : null}
    </div>
  );
};

export default Admin;
