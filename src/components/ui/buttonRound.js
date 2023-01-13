import React, { useState } from 'react';
import classes from './buttonRound.module.css';
import indexClasses from '../../index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const ButtonRound = props => {
  let buttonIconColor = props.iconColor;
  let isFav = props.isFav || false;
  const [btnFav, setBtnFav] = useState(false);
  let buttonClassName = props.className;
  let buttonName = faCheckCircle;
  switch (props.buttonName) {
    case 'add':
      buttonName = faPlus;
      break;
    case 'check':
      buttonName = faCheckCircle;
      break;
    case 'coin':
      buttonName = faHatWizard;
      break;
    case 'heart':
      buttonName = faHeart;
      if (isFav) {
        buttonIconColor = '#ffd43b';
      }
      break;
    case 'star':
      buttonName = faStar;
      break;
    case 'x':
      buttonName = faXmarkCircle;
      break;
    case 'pen':
      buttonName = faPenToSquare;
      break;
    case 'trash':
      buttonName = faTrashCan;
      break;
  }
  let buttonSize = props.buttonSize || classes.buttonRound_medium; //small medium large
  let buttonColor = props.color || '#3CB6AC';
  const btnClickHandler = id => {
    console.log('OK BTN', id.currentTarget.id);
  };
  return (
    <div
      id={props.btnId}
      style={{ backgroundColor: buttonColor }}
      className={`${classes.buttonRound}  ${buttonSize}  ${buttonClassName}`}
      onClick={btnClickHandler}
    >
      <FontAwesomeIcon
        icon={buttonName}
        id={props.id}
        className={classes.buttonRound__icon}
        color={buttonIconColor}
      />
    </div>
  );
};

export default ButtonRound;
