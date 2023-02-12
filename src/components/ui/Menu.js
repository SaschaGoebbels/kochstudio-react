import React, { useState, useEffect, useContext } from 'react';
import classes from './Menu.module.css';
import ButtonRound from './ButtonRound';
import MenuItem from './MenuItem';
import DataProvider, { DataContext } from '../store/DataProvider';
import { useDataUpdate } from '../store/DataProvider';
import settingsBox from './SettingsBox.module.css';

const Menu = props => {
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();
  const onMenuClickHandler = btnId => {
    if (btnId === 'list') {
      settingsPageCallAvoidList(true, avoidListState.list);
      return props.menuClick(btnId);
    }
    if (btnId === 'quest') {
      props.onSettingsShowHandler({
        show: true,
        headerText: 'About',
        content: aboutContent,
        hideXBtn: true,
      });
      return;
    }
    props.setMessage({
      title: 'Wir arbeiten daran',
      message: 'Diese Funktion steht schon bald zur Verfügung',
      value: '',
      confirm: '',
      showBtnX: false,
    });
  };
  const onLoginHandler = () => {
    // return props.menuClick('login');
    console.log('OK');
    if (props.userData.email) {
      //show user editPage
    } else {
      //show loginPage
    }
  };
  //==================================================================
  //==================================================================
  // // // settingsPage avoidList
  const [avoidListState, setAvoidListState] = useState({
    show: false,
    list: dataCtx.menuState.shoppingListSettings.avoidList,
  });
  const avoidListUpdate = el => {
    setAvoidListState({ show: true, list: el.target.value });
  };
  useEffect(() => {
    settingsPageCallAvoidList(avoidListState.show, avoidListState.list);
  }, [avoidListState]);

  const settingsPageCallAvoidList = (show, currentState) => {
    props.onSettingsShowHandler({
      show,
      headerText: 'Einstellungen',
      value: currentState,
      content: settingsPageAvoidContent,
      confirm: onConfirmAvoidList,
    });
  };
  const onConfirmAvoidList = () => {
    updateData('SETTINGS', { avoidList: avoidListState.list });
  };

  const settingsPageAvoidContent = (
    <div className={classes.settingsBox}>
      <h2 className={classes.settingsHeading}>
        Folgende Zutaten habe ich immer zuhause:
      </h2>
      <textarea
        id="avidList"
        name="avidList"
        rows="6"
        // cols="50"
        value={avoidListState.list}
        onChange={avoidListUpdate}
      ></textarea>
      <p>
        Zutaten mit Komma als Trennzeichen eintragen ! z.B Salz, Pfeffer, Chili
      </p>
    </div>
  );
  //==================================================================
  const aboutContent = (
    <div className={settingsBox.settingsBox}>
      <h2 className={settingsBox['settingsBox--h2']}>APP-Entwickler:</h2>
      <p
        className={settingsBox['settingsBox--p']}
        style={{ letterSpacing: '.1rem' }}
      >
        Sascha Göbbels
      </p>
      <p className={settingsBox['settingsBox--p']}>goebbels.sascha@gmail.com</p>
    </div>
  );

  //==================================================================
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
        <div className={classes.menuBox__UserBox} onClick={onLoginHandler}>
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
              onClickHandler={onLoginHandler}
            />
            <div>
              <p>Logged In:</p>
              <p className={classes['menuBox__UserBox--userName']}>
                {props.userData.user}
              </p>
            </div>
          </div>
          <p>{props.userData.email}</p>
        </div>
        <div className={classes.menuBox__SettingsBox}>
          <MenuItem
            text={'Einstellungen'}
            icon={'gear'}
            id={'gear'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Einkausliste'}
            icon={'list'}
            id={'list'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Exportieren'}
            icon={'exp'}
            id={'exp'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Importieren'}
            icon={'get'}
            id={'get'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'Rezept teilen'}
            icon={'share'}
            id={'share'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
          <MenuItem
            text={'About'}
            icon={'quest'}
            id={'quest'}
            onBtnClick={onMenuClickHandler}
          ></MenuItem>
        </div>
      </div>
    </div>
  );
};

export default Menu;
