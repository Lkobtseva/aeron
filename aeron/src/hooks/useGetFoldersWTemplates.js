import { useState, useEffect } from 'react';

const useGetFoldersWTemplates = (selectedFolder, name) => {
  const [foldersWithTemplates, setFoldersWithTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://aeron-back.itc-hub.ru/get-folders-with-templates');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFoldersWithTemplates(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFolder, name]); // Empty dependency array ensures this effect runs only once

  return { foldersWithTemplates, loading, error };
};

export default useGetFoldersWTemplates;
