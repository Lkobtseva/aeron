import React, { useState, useEffect } from "react";
import closeButton from "../../images/Close.svg";
import useFetchFolders from "../../hooks/useFetchFolders";
import useCreateTemplate from "../../hooks/useCreateTemplate";

const CreateTemplateModal = ({
  isOpen,
  onRequestClose,
  onAdd,
  selectedFolder,
  setSelectedFolder,
  newFolderName,
  name,
  setName
}) => {
  const { folders, loading, error } = useFetchFolders(newFolderName);
  console.log(folders);
  const {
    createTemplate,
    loading: createLoading,
    error: createError,
  } = useCreateTemplate();

  const handleAdd = () => {
    if (name && selectedFolder) {
      createTemplate(name, selectedFolder);
      setName("");
      setSelectedFolder("");
      onRequestClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onRequestClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Create Template</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div>
            <label htmlFor="templateName">Name:</label>
            <input
              id="templateName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="folderSelect">Select Folder:</label>
            <select
              id="folderSelect"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a folder
              </option>
              {folders.map((folder) => (
                <option key={folder.folder_id} value={folder.folder_id}>
                  {folder.folder_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
