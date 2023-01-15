import React, { useState } from 'react';
import classes from './footer.module.css';

import Navbar from '../navbar/navbar';

const Footer = props => {
  const current_icon = 'current_icon';
  const [btnNav, setBtnNav] = useState('btn1');
  const navbarHandler = item => {
    // console.log(item.currentTarget.id);
    navChangeFunction(item.currentTarget.id);
  };
  const navChangeFunction = btnId => {
    setBtnNav(btnId);
  };
  props.navChange(navChangeFunction);
  return (
    <div className={classes.footer}>
      <Navbar iconColor={'#20c997'}></Navbar>
    </div>
  );
};

export default Footer;
