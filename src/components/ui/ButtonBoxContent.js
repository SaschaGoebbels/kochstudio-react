import React from 'react';
import ButtonRound from './ButtonRound';
import classes from './ButtonBoxContent.module.css';

import { snapshot } from 'valtio';
import { state } from '../store/state';

const ButtonBoxContent = props => {
  const gearShow = props.gearShow || false;
  return (
    <div>
      <div className={classes.buttonBox}>
        <ButtonRound
          btnId="add"
          className={`${classes.buttonAddEdit} ${classes.buttonRight}`}
          buttonName={'add'}
          color={''}
          iconColor={''}
          isFav={''}
          onClickHandler={props.onRoundButtonHandler}
        />
        {/* {gearShow && (
          <ButtonRound
            btnId="gear"
            className={`${classes.buttonRight} ${classes.buttonGear}`}
            buttonName={'gear'}
            color={'#ffffff00'}
            borderColor={'#ffffff00'}
            shadow={'none'}
            iconColor={'#b9b9b9'}
            isFav={''}
            onClickHandler={props.onRoundButtonHandler}
          />
        )} */}
      </div>
      {!props.coinHide && (
        <ButtonRound
          btnId="coin"
          className={classes.buttonCoincidence}
          buttonName={'coin'}
          color={''}
          iconColor={''}
          isFav={''}
          onClickHandler={props.onRoundButtonHandler}
        />
      )}
    </div>
  );
};

export default ButtonBoxContent;
