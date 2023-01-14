import React, { useState } from 'react';
import classes from './navbarButton.module.css';
import indexClasses from '../../index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

const NavbarButton = props => {
  let buttonIconColor = props.iconColor;
  const [btnFav, setBtnFav] = useState(false);
  let buttonClassName = props.className;
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
  let buttonSize = props.buttonSize || classes.buttonRound_medium; //small medium large
  let buttonColor = props.color || '';
  const btnClickHandler = id => {
    console.log('OK BTN', id.currentTarget.id);
  };
  return (
    <div
      id={props.btnId}
      style={{ backgroundColor: buttonColor }}
      className={`${classes.navbarButton}  ${buttonSize}  ${buttonClassName}`}
      onClick={btnClickHandler}
    >
      <FontAwesomeIcon
        icon={buttonName}
        id={props.id}
        className={classes.buttonRound__icon}
        color={buttonIconColor}
      />
      <p className={classes.underline}>{props.name}</p>
    </div>
  );
};

export default NavbarButton;
