import React, { useState } from 'react';
import classes from './Footer.module.css';
import Navbar from '../navbar/Navbar';

const Footer = props => {
  const footerContent = props.footerContent;
  return <div className={classes.footer}>{footerContent}</div>;
};

export default Footer;
