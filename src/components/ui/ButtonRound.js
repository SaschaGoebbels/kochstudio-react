import React, { useState } from 'react';
import classes from './ButtonRound.module.css';
// import indexClasses from '../../index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

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
      //DELETE
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
    case 'up':
      buttonName = faArrowAltCircleUp;
      break;
    case 'down':
      buttonName = faArrowAltCircleDown;
      break;
    case 'list':
      buttonName = faListUl;
      break;
    case 'plan':
      buttonName = faObjectGroup;
      break;
    case 'user':
      buttonName = faUser;
      break;
    case 'gear':
      buttonName = faGear;
      break;
  }
  let buttonSize =
    props.buttonSize === 'small'
      ? classes.buttonRound_small
      : props.buttonSize === 'large'
      ? classes.buttonRound_large
      : classes.buttonRound_medium; //small medium large
  let buttonColor = props.color || '#20c997';
  let buttonBorderColor = props.borderColor || '#087f5b';
  let buttonShadow = props.shadow || '0px 2px 20px rgba(0, 0, 0, 0.5)';
  const btnClickHandler = id => {
    props.onClickHandler(id.currentTarget.id);
  };
  return (
    <div
      id={props.btnId}
      // var(--clr-navbar_background)
      style={{
        backgroundColor: buttonColor,
        border: `${buttonBorderColor} solid 3px`,
        boxShadow: `${buttonShadow}`,
      }}
      className={`${classes.buttonRound} ${buttonSize} ${buttonClassName} ${classes.button}`}
      //  ${
      //   buttonSize === 'small' && classes.buttonRound_small
      // }  ${
      //   buttonSize === 'large' && classes.buttonRound_large
      //   }

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
