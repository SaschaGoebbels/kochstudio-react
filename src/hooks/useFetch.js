import React, { useState, useEffect, useCallback } from 'react';

const useFetch = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      const data = await response.json();
      applyData(data);
      if (!response.ok) {
        throw new Error('Der Server ist nicht erreichbar !');
      }
    } catch (error) {
      console.log('Error');
      setError(error.message);
    }
    setIsLoading(false);
  });

  //==================================================================

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
