import React, { useState } from 'react';
import './navbar.css';
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
    <div className="navbar">
      <div className="nav_ico_underline" onClick={navbarHandler} id="btn1">
        <FontAwesomeIcon
          id="btn_recipe"
          className={`navbar__icon ${btnNav === 'btn1' && current_icon}`}
          icon={faHouse}
        ></FontAwesomeIcon>
        <p className="underline">Gerichte</p>
      </div>
      <div className="nav_ico_underline" onClick={navbarHandler} id="btn2">
        <FontAwesomeIcon
          id="btn_weekly_plan"
          className={`navbar__icon ${btnNav === 'btn2' && current_icon}`}
          icon={faObjectGroup}
        ></FontAwesomeIcon>
        <p className="underline">Wochenplan</p>
      </div>
      <div className="nav_ico_underline" onClick={navbarHandler} id="btn3">
        <FontAwesomeIcon
          id="btn_fav"
          className={`navbar__icon ${btnNav === 'btn3' && current_icon}`}
          icon={faHeart}
        ></FontAwesomeIcon>
        <p className="underline">Favoriten</p>
      </div>
      <div className="nav_ico_underline" onClick={navbarHandler} id="btn4">
        <FontAwesomeIcon
          id="btn_shoppinglist"
          className={`navbar__icon ${btnNav === 'btn4' && current_icon}`}
          icon={faListUl}
        ></FontAwesomeIcon>
        <p className="underline">Einkaufsliste</p>
      </div>
    </div>
  );
};

export default Navbar;
