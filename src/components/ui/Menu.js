import React, { useState } from 'react';
import classes from './Menu.module.css';
import ButtonRound from './ButtonRound';
import MenuItem from './MenuItem';

const Menu = props => {
  const onUserHandler = btnId => {
    console.log('OK');
  };
  const onMenuClickHandler = btnId => {
    console.log(btnId);
  };
  return (
    <div
      className={`${classes.menuBox} ${
        !props.menuState.hide && classes['menuBox--modal']
      }`}
    >
      <div
        className={`${classes.onClick} ${
          props.menuState.hide && classes['onClick--hide']
        }`}
        onClick={() => props.changeMenuState({ hide: true })}
      ></div>
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
        <div className={classes.menuBox__SettingsBox}>
          <MenuItem
            text={'Einstellungen'}
            icon={'gear'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Einkausliste'}
            icon={'list'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Exportieren'}
            icon={'exp'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Importieren'}
            icon={'get'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Rezept teilen'}
            icon={'share'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
        </div>
      </div>
    </div>
  );
};

export default Menu;
