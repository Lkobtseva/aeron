import { useState, useEffect } from 'react';

const useParseRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendRequest = async (requestBody) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('https://aeron-back.itc-hub.ru/parse', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error, data };
};

export default useParseRequest;