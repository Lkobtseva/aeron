import React, { useState, useEffect } from 'react';
import { Treebeard } from 'react-treebeard';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import useGetFoldersWTemplates from '../../hooks/useGetFoldersWTemplates';
import useCreateFolder from '../../hooks/useCreateFolder';
import useFetchTemplateDetails from '../../hooks/useFetchTemplateDetails';
import { customStyles } from '../utils';

const FolderTree = ({ selectedFolder, setNewFolderName, newFolderName, setSelectedTemplate, name }) => {
  const { foldersWithTemplates, loading, error } = useGetFoldersWTemplates(selectedFolder, name);
  const { createFolder, loading: creating, error: createError } = useCreateFolder();
  const [data, setData] = useState({
    name: 'Folders',
    toggled: true,
    children: []
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const { templateDetails, loading: templateLoading, error: templateError } = useFetchTemplateDetails(selectedTemplateId);
  const [cursor, setCursor] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  useEffect(() => {
    if (foldersWithTemplates.length > 0) {
      const formattedData = formatDataForTreebeard(foldersWithTemplates);
      setData({
        name: 'Folders',
        toggled: true,
        children: formattedData
      });
    }
  }, [foldersWithTemplates]);

  useEffect(() => {
    if (templateDetails) {
      setSelectedTemplate(templateDetails); 
    }
  }, [templateDetails, setSelectedTemplate]);

  const formatDataForTreebeard = (folders) => {
    const buildTree = (parentId) => {
      const nodes = [];
      const children = folders.filter(folder => folder.parent_id === parentId);
      children.forEach(child => {
        const node = {
          id: child.folder_id,
          name: child.folder_name,
          children: [
            ...buildTree(child.folder_id),
            ...child.templates.map(template => ({
              id: template.template_id,
              name: template.template_name,
              leaf: true
            }))
          ],
          toggled: false
        };
        nodes.push(node);
      });
      return nodes;
    };

    const tree = buildTree(null);
    return tree;
  };

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));

    if (node.leaf) {
      setSelectedTemplateId(node.id);
      setCollapsed(true); 
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleAddFolder = () => {
    setIsAddingFolder(true);
  };

  const handleSaveFolder = async () => {
    if (newFolderName.trim() === '') return;

    const parentId = cursor ? cursor.id : null;

    try {
      const newFolder = await createFolder(newFolderName, parentId);

      const addFolderToNode = (node) => {
        if (node.id === parentId) {
          if (!node.children) {
            node.children = [];
          }
          node.children.push({
            id: newFolder.folder_id,
            name: newFolder.folder_name,
            children: [],
            templates: newFolder.templates
          });
          node.toggled = true;
        } else if (node.children) {
          node.children.forEach(addFolderToNode);
        }
      };

      addFolderToNode(data);
      setData(Object.assign({}, data));
      setNewFolderName('');
      setIsAddingFolder(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </div>
      <div className="sidebar-content">
        {!collapsed && (
          <>
            <Treebeard data={data} onToggle={onToggle} style={customStyles} />
            <div className="add-folder">
              {isAddingFolder ? (
                <>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="New folder name"
                  />
                  <button onClick={handleSaveFolder} disabled={creating}>
                    {creating ? 'Adding' : 'Add'}
                  </button>
                </>
              ) : (
                <FaPlus onClick={handleAddFolder} />
              )}
            </div>
            {createError && <div className="error">{createError}</div>}
            {templateLoading && <div>Loading template details...</div>}
            {templateError && <div className="error">{templateError}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default FolderTree;
