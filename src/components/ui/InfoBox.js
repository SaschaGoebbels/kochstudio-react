import React, { useState, useContext } from 'react';
// import DataUpdate from '../store/DataProvider';
import classes from './InfoBox.module.css';
import ButtonRound from './ButtonRound';

const InfoBox = props => {
  // const dataUpdate = useContext(DataUpdate);
  const onClickHandler = el => {
    // console.log(data.inputCurrentValue.recipeName);
    props.clickInfoBox(el);
  };
  return (
    <div
      className={`${classes.infoBox}  ${props.hide && classes.infoBox__hide}`}
    >
      <div className={classes.infoBox__card}>
        <header className={classes.infoBox__header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.infoBox__messageBox}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.infoBox__footer}>
          {props.showXBtn && (
            <ButtonRound
              btnId="x"
              className={classes.buttonAddEdit}
              buttonName={'x'}
              color={'#AD5050'}
              iconColor={''}
              isFav={''}
              onClickHandler={onClickHandler}
            />
          )}
          <ButtonRound
            btnId="check"
            className={classes.buttonAddEdit}
            buttonName={'check'}
            color={''}
            iconColor={''}
            isFav={''}
            onClickHandler={onClickHandler}
          />
        </footer>
      </div>
    </div>
  );
};

export default InfoBox;
