import React, { useState } from 'react';
import classes from './Menu.module.css';
import ButtonRound from './ButtonRound';

const Menu = props => {
  const onUserHandler = btnId => {
    console.log('OK');
  };
  return (
    <div
      onClick={() => props.changeMenuState({ hide: true })}
      className={`${classes.menuBox} ${
        !props.menuState.hide && classes['menuBox--modal']
      }`}
    >
      <div
        className={`${classes.menuBox__dropInBox} ${
          props.menuState.hide && classes['menuBox__dropInBox--hide']
        }`}
      >
        <div className={classes.menuBox__UserBox}>
          <div className={classes.menuBox__UserBtnBox}>
            <ButtonRound
              btnId="user"
              className={`${classes.buttonList} ${classes.buttonRight}`}
              buttonName={'user'}
              buttonSize={'large'}
              color={'#ffffff00'}
              borderColor={'#ffffff00'}
              shadow={'none'}
              iconColor={''}
              isFav={''}
              onClickHandler={() => {
                onUserHandler(props.id);
              }}
            />
            <div>
              <p>Logged In:</p>
              <p>{props.userData.user}</p>
            </div>
          </div>
          <p>{props.userData.email}</p>
        </div>
        <div className={classes.menuBox__SettingsBox}></div>
      </div>
    </div>
  );
};

export default Menu;
