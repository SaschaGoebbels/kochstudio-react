import React from 'react';
import classes from './MenuItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBrush } from '@fortawesome/free-solid-svg-icons';

const MenuItem = props => {
  const buttonColor = props.color || '#20c997';
  const buttonIconColor = props.iconColor || '#38d9a9';
  let buttonName = faGear;
  switch (props.icon) {
    case 'gear':
      buttonName = faGear;
      break;
    case 'list':
      buttonName = faListUl;
      break;
    case 'exp':
      buttonName = faFileExport;
      break;
    case 'get':
      buttonName = faFileArrowDown;
      break;
    case 'share':
      buttonName = faShareNodes;
      break;
    case 'quest':
      buttonName = faCircleQuestion;
      break;
    case 'trash':
      buttonName = faTrash;
      break;
    case 'brush':
      buttonName = faBrush;
      break;
  }
  return (
    <div
      className={classes.menuItemBox}
      onClick={() => {
        props.onBtnClick(props.id);
      }}
    >
      <div className={classes.menuItemBox__icon}>
        {' '}
        <FontAwesomeIcon
          icon={buttonName}
          id={props.id}
          className={classes.menuIcon}
          color={buttonIconColor}
        />
      </div>
      <p className={classes.menuItemBox__text}>{props.text}</p>
    </div>
  );
};

export default MenuItem;
