import React from 'react';
import { useState } from 'react';
// import appClasses from '../../App.module.css';
import indexClasses from '../../index.module.css';
import classes from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = props => {
  const [menuBtn, setMenuBtn] = useState(false);
  const onMenuBtnHandler = () => {
    setMenuBtn(current => {
      return !current;
    });
    props.onMenuButton();
  };
  return (
    <div className={classes.header}>
      <div className={classes.header__box}>
        <div className={(classes.header__textBox, indexClasses.center)}>
          <h1 className={classes.header__text}>{`${props.headerText}`}</h1>
        </div>
        <div className={classes.header__menu_btn} onClick={onMenuBtnHandler}>
          <FontAwesomeIcon
            icon={faBars}
            className={classes.header__burger_menu}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className={classes.header__contentSpacer}></div>
    </div>
  );
};

export default Header;
