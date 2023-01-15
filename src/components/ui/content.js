import React, { useState } from 'react';
import classes from './content.module.css';

const Content = props => {
  const content = props.content;
  return <div className={classes.content}>{content}</div>;
};

export default Content;
