import React, { useSate } from 'react';
import { useState } from 'react';

const iniValInfoBox = {
  title: '',
  message: '',
  showBtnX: true,
  recipeName: '',
  recipeId: '',
  action: '',
  dismiss: '',
  confirm: '',
};

const useInfoBox = () => {
  // const [hideInfoBox, setHideInfoBox] = useSate(true);
  const [message, setMessage] = useState(iniValInfoBox);
  const hideInfoBoxHandler = el => {
    // setHideInfoBox(el);
  };
  const resetInfoBox = el => {
    setMessage(iniValInfoBox);
  };
  return {
    title: message.title,
    message: message.message,
    showBtnX: message.showBtnX,
    recipeName: message.recipeName,
    recipeId: message.recipeId,
    action: message.action,
    dismiss: message.dismiss,
    confirm: message.confirm,
  };
};

export default useInfoBox;
