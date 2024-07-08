import { useState, useEffect } from 'react';

const useFetchFolders = (newFolderName) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('https://aeron-back.itc-hub.ru/get-all-folders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setFolders(result);
        console.log(result)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, [newFolderName]);

  return { folders, loading, error };
};

export default useFetchFolders;
