import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import axios from 'axios';
import linkIcon from '../../../images/dashboard/link.png';
import TemplateContextMenu from '../templateContextMenu/TemplateContextMenu';
import config from '../../../../config';
import './WaiverFile.css';
import RenameModal from '../renameModal/RenameModal';

const WaiverFile = ({
  templateName, date, id, thumbnailUrl, url, parentDelete,
}) => {
  const [isCopied, setCopied] = useState(false);
  const [contextMenu, setContextMenu] = useState('');
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [fileName, setFileName] = useState(templateName);

  const download = () => {
    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const rename = async () => {
    setRenameModalOpen(true);
  };

  const deleteTemplate = async () => {
    await axios.delete(`${config.apiUrl}/templates/${id}`, { withCredentials: true });
    parentDelete();
  };

  const handleCopied = (e) => {
    e.preventDefault();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleContextMenu = (e) => {
    if (e) {
      e.preventDefault();
    }

    setContextMenu(
      <TemplateContextMenu
        onDownload={download}
        onRename={rename}
        onDelete={deleteTemplate}
        hideContextMenu={() => setContextMenu('')}
        cursorX={e.pageX}
        cursorY={e.pageY}
      />,
    );
  };

  const onCloseRenameModal = async (newName) => {
    if (newName !== fileName) {
      await axios.patch(`${config.apiUrl}/templates/${id}`, { name: newName }, { withCredentials: true });
      setFileName(newName);
    }
    setRenameModalOpen(false);
  };

  return (
    <div className="template-file">
      <div className="template-thumbnail">
        <button type="button" className="template-more-btn" onClick={handleContextMenu}>
          <img src="icons/dots.png" alt="More Icon" />
        </button>
        <img
          className="template-thumbnail-img"
          src={thumbnailUrl}
          alt="file preview"
          onContextMenu={handleContextMenu}
        />
      </div>
      <div>
        <span className="template-title">{fileName}</span>
        <p className="template-created">
          Created
          {` ${date}`}
        </p>
        <CopyToClipboard text={`${config.signingBaseUrl}/${id}`}>
          <Link to={`/${id}`} className="template-copy-link" href="# " onClick={handleCopied}>
            <img
              src={linkIcon}
              className="template-copy-icon"
              style={{ display: isCopied ? 'none' : 'inline' }}
              alt="link"
            />
            <span className="template-copy-text">
              {isCopied ? '\u2713 Copied' : 'Copy Shareable Link'}
            </span>
          </Link>
        </CopyToClipboard>
      </div>
      {contextMenu}
      {renameModalOpen ? <RenameModal originalName={fileName} closePopup={onCloseRenameModal} /> : ''}
    </div>
  );
};

WaiverFile.propTypes = {
  id: PropTypes.string.isRequired,
  templateName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  parentDelete: PropTypes.func.isRequired,
};

export default WaiverFile;
