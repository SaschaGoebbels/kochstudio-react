import React from 'react';
import ButtonRound from './ButtonRound';
import classes from './ButtonBoxContent.module.css';

import { snapshot } from 'valtio';
import { state } from '../store/state';

const ButtonBoxContent = props => {
  return (
    <div>
      <div>
        <ButtonRound
          btnId="add"
          className={`${classes.buttonAddEdit} ${classes.buttonRight}`}
          buttonName={'add'}
          color={''}
          iconColor={''}
          isFav={''}
          onClickHandler={props.onRoundButtonHandler}
        />
      </div>
      <ButtonRound
        btnId="coin"
        className={classes.buttonCoincidence}
        buttonName={'coin'}
        color={''}
        iconColor={''}
        isFav={''}
        onClickHandler={props.onRoundButtonHandler}
      />
    </div>
  );
};

export default ButtonBoxContent;
