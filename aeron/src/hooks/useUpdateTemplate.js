// hooks/useUpdateTemplate.js
import { useState } from 'react';

const useUpdateTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTemplate = async (templateId, newTemplateValue) => {
    setLoading(true);
    try {
      const response = await fetch(`https://aeron-back.itc-hub.ru/update-template`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "template_id": templateId,
          "new_template_value": newTemplateValue
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { updateTemplate, loading, error };
};

export default useUpdateTemplate;