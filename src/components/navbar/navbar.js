import React, { useState } from 'react';
import classes from './navbar.module.css';
import NavbarButton from './navbarButton';

const Navbar = props => {
  let iconColor = props.iconColor;
  const currentIcon = '#fa8719';
  // const current_icon = 'current_icon';
  const [btnNav, setBtnNav] = useState('btn1');
  // const navbarHandler = item => {
  //   // console.log(item.currentTarget.id);
  //   navChangeFunction(item.currentTarget.id);
  // };
  const navChangeFunction = btnId => {
    console.log(btnId);
    setBtnNav(btnId);
  };
  return (
    <div className={classes.navbar}>
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn1"
        className={''}
        buttonName={'home'}
        color={''}
        iconColor={`${btnNav === 'btn1' ? currentIcon : iconColor}`}
        // currentIcon={`${btnNav === 'btn1' ? true : false}`}
        currentIcon={`${btnNav === 'btn1' ? 'classes.current_icon' : ''}`}
        name="Gerichte"
      />
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn2"
        className={''}
        buttonName={'plan'}
        color={''}
        iconColor={`${btnNav === 'btn2' ? currentIcon : iconColor}`}
        currentIcon={'classes.current_icon'}
        name="Wochenplan"
      />
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn3"
        className={''}
        buttonName={'fav'}
        color={''}
        iconColor={`${btnNav === 'btn3' ? currentIcon : iconColor}`}
        // currentIcon={`${btnNav === 'btn2' ? true : false}`}
        name="Favoriten"
      />
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn4"
        className={''}
        buttonName={'shop'}
        color={''}
        iconColor={`${btnNav === 'btn4' ? currentIcon : iconColor}`}
        // currentIcon={`${btnNav === 'btn2' ? true : false}`}
        name="Einkaufsliste"
      />
    </div>
  );
};

export default Navbar;
