import React, { useState } from "react";
import Header from "../header/header";
import FolderTree from "../folderTree/folderTree";
import TemplateBox from "../templateBox/templateBox";
import CreateTemplateModal from "../templateModal/templateModal";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [name, setName] = useState("");

  const handleAddTemplate = (name) => {
    setTemplates([...templates, name]);
  };

  return (
    <>
      <Header onAddTemplateClick={() => setIsModalOpen(true)} />
      <FolderTree
        selectedFolder={selectedFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
        setSelectedTemplate={setSelectedTemplate}
        name={name}
      />
      <CreateTemplateModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAdd={handleAddTemplate}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        newFolderName={newFolderName}
        name={name}
        setName={setName}
      />
      {selectedTemplate && <TemplateBox template={selectedTemplate} />}
    </>
  );
};

export default MainPage;
