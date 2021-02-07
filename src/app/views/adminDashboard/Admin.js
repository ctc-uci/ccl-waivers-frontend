import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../../components/adminDashboard/searchbar/Searchbar';
import './Admin.css';
import config from '../../../config';
import Spinner from '../../components/loadingSpinner/spinner';

const Admin = () => {
  const [waiverList, setWaiverList] = useState([]);
  const [waiverListFiltered, setWaiverListFiltered] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filesSelected, setFilesSelected] = useState([]);

  const getWaivers = async () => {
    const res = await axios.get(`${config.apiUrl}/waivers`, { withCredentials: true });
    setWaiverList(res.data);
    setWaiverListFiltered(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getWaivers();
  }, []);

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
      setFilesSelected([files]);
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
      try {
        const res = await axios.get(`${config.apiUrl}/waivers/${id}`, { withCredentials: true });
        const link = res.data[0].temporaryDownloadLink;
        const linkElem = document.createElement('a');
        linkElem.href = link;
        document.body.appendChild(linkElem);
        linkElem.click();
      } catch (error) {
        if (error.response.status === 500) {
          return false;
        }
      }
      return null;
    };
    download(filesSelected[0]);
  };

  const deleteWaivers = () => {
    async function deleteWaiver(id) {
      try {
        await axios.delete(`${config.apiUrl}/waivers/${id}`, { withCredentials: true });
      } catch (error) {
        if (error.response.status === 500) {
          return false;
        }
      }
      return null;
    }
    for (let i = 0; i < filesSelected.length; i += 1) {
      deleteWaiver(filesSelected[i]);
    }
    setFilesSelected([]);
  };

  return (
    <div className="admin-dashboard">
      <Searchbar keyword={input} setKeyword={updateInput} />
      <div className="waiver-options">
        <span>
          {filesSelected.length === 0 ? null : <input type="checkbox" className="selected-checkbox" defaultChecked onClick={unselectAllWaivers} />}
          {filesSelected.length}
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
          {isLoading ? <Spinner className="sk-center" /> : waiverListFiltered.map((waiver) => (
            <tr id={waiver.id} key={waiver.id}>
              <td><input className="table-checkbox" name="waivers" type="checkbox" onChange={selectWaiver} /></td>
              <td>{waiver.name}</td>
              <td className="waiver-form">{waiver.fileName}</td>
              <td>{waiver.role}</td>
              <td>{getDate(waiver.createdDateTime)}</td>
              <td>{waiver.notes}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Admin;
