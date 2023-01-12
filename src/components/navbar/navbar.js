import React, { useState } from 'react';
import classes from './navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Navbar = props => {
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
      <div
        className={classes.nav_ico_underline}
        onClick={navbarHandler}
        id="btn1"
      >
        <FontAwesomeIcon
          id="btn_recipe"
          className={`${classes.navbar__icon} ${
            btnNav === 'btn1' && classes.current_icon
          }`}
          icon={faHouse}
        ></FontAwesomeIcon>
        <p className={classes.underline}>Gerichte</p>
      </div>
      <div
        className={classes.nav_ico_underline}
        onClick={navbarHandler}
        id="btn2"
      >
        <FontAwesomeIcon
          id="btn_weekly_plan"
          className={`${classes.navbar__icon} ${
            btnNav === 'btn2' && classes.current_icon
          }`}
          icon={faObjectGroup}
        ></FontAwesomeIcon>
        <p className={classes.underline}>Wochenplan</p>
      </div>
      <div
        className={classes.nav_ico_underline}
        onClick={navbarHandler}
        id="btn3"
      >
        <FontAwesomeIcon
          id="btn_fav"
          className={`${classes.navbar__icon} ${
            btnNav === 'btn3' && classes.current_icon
          }`}
          icon={faHeart}
        ></FontAwesomeIcon>
        <p className={classes.underline}>Favoriten</p>
      </div>
      <div
        className={classes.nav_ico_underline}
        onClick={navbarHandler}
        id="btn4"
      >
        <FontAwesomeIcon
          id="btn_shoppinglist"
          className={`${classes.navbar__icon} ${
            btnNav === 'btn4' && classes.current_icon
          }`}
          icon={faListUl}
        ></FontAwesomeIcon>
        <p className={classes.underline}>Einkaufsliste</p>
      </div>
    </div>
  );
};

export default Navbar;
