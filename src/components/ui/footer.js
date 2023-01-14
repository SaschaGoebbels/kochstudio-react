import React, { useState } from 'react';
import classes from './footer.module.css';
// import indexClasses from '../../index.module.css';
import NavbarButton from '../navbar/navbarButton';

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
    <div className={classes.navbar}>
      <NavbarButton
        btnId="btn_1"
        className={classes.buttonAddEdit}
        buttonName={'home'}
        color={''}
        iconColor={'#20c997'}
        name="Gerichte"
      />
      <NavbarButton
        btnId="btn_2"
        className={classes.buttonAddEdit}
        buttonName={'plan'}
        color={''}
        iconColor={'#20c997'}
        name="Wochenplan"
      />
      <NavbarButton
        btnId="btn_3"
        className={classes.buttonAddEdit}
        buttonName={'fav'}
        color={''}
        iconColor={'#20c997'}
        name="Favoriten"
      />
      <NavbarButton
        btnId="btn_4"
        className={classes.buttonAddEdit}
        buttonName={'shop'}
        color={''}
        iconColor={'#20c997'}
        name="Einkaufsliste"
      />
    </div>
  );
};

export default Footer;
