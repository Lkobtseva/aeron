// hooks/useFetchTemplateDetails.js
import { useState, useEffect } from 'react';

const useFetchTemplateDetails = (templateId) => {
  const [templateDetails, setTemplateDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (templateId) {
      const fetchTemplateDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://aeron-back.itc-hub.ru/get-template-details?template_id=${templateId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTemplateDetails(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTemplateDetails();
    }
  }, [templateId]);

  return { templateDetails, loading, error };
};

export default useFetchTemplateDetails;
