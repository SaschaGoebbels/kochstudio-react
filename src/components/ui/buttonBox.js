import React, { useState } from 'react';
import classes from './buttonBox.module.css';
import ButtonRound from './buttonRound';

const ButtonBox = props => {
  const onClickHandler = item => {
    props.onClickHandler(item);
    // console.log('ButtonBox', item);
  };
  return (
    <div className={classes.buttonBox}>
      <ButtonRound
        btnId="trash"
        className={classes.buttonAddEdit}
        buttonName={'trash'}
        color={'#fa5252'}
        iconColor={''}
        isFav={''}
        onClickHandler={onClickHandler}
      />
      <ButtonRound
        btnId="x"
        className={classes.buttonAddEdit}
        buttonName={'x'}
        color={'#ffa94d'}
        iconColor={''}
        isFav={''}
        onClickHandler={onClickHandler}
      />
      <ButtonRound
        btnId="check"
        className={classes.buttonAddEdit}
        buttonName={'check'}
        color={''}
        iconColor={''}
        isFav={''}
        onClickHandler={onClickHandler}
      />
    </div>
  );
};

export default ButtonBox;
