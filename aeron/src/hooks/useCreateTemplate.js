import { useState } from 'react';

const useCreateTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const createTemplate = async (templateName, folderId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://aeron-back.itc-hub.ru/save-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template_name: templateName,
          folder_id: folderId,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createTemplate, loading, error, response };
};

export default useCreateTemplate;
