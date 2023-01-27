import React, { useState, useEffect } from 'react';

const useFetch = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        header: requestConfig.header ? requestConfig.header : {},
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
  };

  //==================================================================
  // const sendRequest = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   const response = await fetch(requestConfig.url, {
  //     method: requestConfig.method,
  //     header: requestConfig.header,
  //     body: JSON.stringify(requestConfig.sendData),
  //   });
  //   const dataResponse = await response.json();
  //   console.log(dataResponse);
  // };
  //==================================================================
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
