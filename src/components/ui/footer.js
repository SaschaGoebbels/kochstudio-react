import React, { useState } from 'react';
import classes from './footer.module.css';

import Navbar from '../navbar/navbar';

const Footer = props => {
  const footerContent = props.footerContent;
  return <div className={classes.footer}>{footerContent}</div>;
};

export default Footer;
