import React from 'react';
import { useState } from 'react';
// import './header.css';
import classes from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = props => {
  let headerText = 'Gerichte';
  const [menuBtn, setMenuBtn] = useState(false);
  const onMenuBtnHandler = () => {
    // setMenuBtn(current => !current);
    setMenuBtn(current => {
      return !current;
    });
    props.onMenuButton();
    console.log('Menu btn', menuBtn);
  };
  return (
    <div className={classes.header}>
      <div className={classes.headline_div_h1}>
        <h1 className={classes.header__h1}>{`${headerText}`}</h1>
      </div>
      <div className={classes.menu_btn} onClick={onMenuBtnHandler}>
        <FontAwesomeIcon
          icon={faBars}
          className={classes.burger_menu}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Header;
