import { useState } from 'react';

const useCreateFolder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFolder = async (folderName, parentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://aeron-back.itc-hub.ru/save-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          folder_name: folderName,
          parent_id: parentId
        })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create folder: Choose another parent folder`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createFolder, loading, error };
};

export default useCreateFolder;
