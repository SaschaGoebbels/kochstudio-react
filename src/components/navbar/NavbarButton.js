import React, { useState } from 'react';
import classes from './NavbarButton.module.css';
import indexClasses from '../../index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

const NavbarButton = props => {
  let buttonIconColor = props.iconColor;
  let buttonColor = props.color || '';
  let buttonClassName = props.className;
  let buttonSize = props.buttonSize || classes.buttonRound_medium; //small medium large
  // const currentIcon = props.currentIcon === true ? classes.current_icon : '';
  const currentIcon = props.currentIcon;
  let buttonName = faHouse;
  switch (props.buttonName) {
    case 'home':
      buttonName = faHouse;
      break;
    case 'plan':
      buttonName = faObjectGroup;
      break;
    case 'fav':
      buttonName = faHeart;
      break;
    case 'shop':
      buttonName = faListUl;
      break;
  }

  const btnClickHandler = item => {
    props.onClickHandler(item.currentTarget.id);
  };
  return (
    <div
      id={props.btnId}
      style={{ backgroundColor: buttonColor }}
      className={`${classes.navbarButton}  ${buttonSize}  ${buttonClassName} `}
      onClick={btnClickHandler}
    >
      <FontAwesomeIcon
        icon={buttonName}
        id={props.id}
        className={`${classes.buttonRound__icon} ${currentIcon}`}
        color={buttonIconColor}
      />
      <p className={classes.underline}>{props.name}</p>
    </div>
  );
};

export default NavbarButton;
