import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAngry } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MenuItem = () => {
    const buttonColor = props.color || '#20c997';
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
  return (
    <div>
      <FontAwesomeIcon
        icon={buttonName}
        id={props.id}
        className={classes.menuIcon}
        color={buttonIconColor}
      />
      <p>{props.text}</p>
    </div>
  );
};
