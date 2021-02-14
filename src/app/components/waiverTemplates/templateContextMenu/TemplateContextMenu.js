import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './TemplateContextMenu.css';

const TemplateContextMenu = ({
  onDownload, onRename, onDelete, cursorX, cursorY, hideContextMenu,
}) => {
  useEffect(() => {
    window.addEventListener('click', hideContextMenu);
    return () => {
      window.removeEventListener('click', hideContextMenu);
    };
  }, []);

  return (
    <div className="template-context-menu" style={{ top: `${cursorY}px`, left: `${cursorX}px` }}>
      <ul>
        <li>
          <button type="button" className="template-context-menu-button" onClick={onDownload}>
            Download
          </button>
        </li>
        <li>
          <button type="button" className="template-context-menu-button" onClick={onRename}>
            Rename
          </button>
        </li>
        <li>
          <button type="button" className="template-context-menu-button" onClick={onDelete}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

TemplateContextMenu.propTypes = {
  cursorX: PropTypes.number.isRequired,
  cursorY: PropTypes.number.isRequired,
  hideContextMenu: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TemplateContextMenu;
