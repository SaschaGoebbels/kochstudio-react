import React from 'react';

const LocalStorage = props => {
  const localData = '';
  const updateLocalData = data => {
    console.log('Test');
  };
  return {
    localData,
    updateLocalData,
  };
};
export default LocalStorage;
