import React, { useState } from 'react';
import classes from './Content.module.css';

const Content = props => {
  const content = props.content;
  // const onClickHandler = item => {
  //   console.log('content', item);
  // };
  return <div className={classes.content}>{content}</div>;
};

export default Content;
