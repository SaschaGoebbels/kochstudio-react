import React, { useState, useEffect, useContext } from 'react';
import classes from './Menu.module.css';
import ButtonRound from './ButtonRound';
import MenuItem from './MenuItem';
import DataProvider, { DataContext } from '../store/DataProvider';
import { useDataUpdate } from '../store/DataProvider';
import settingsBox from './SettingsBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../../utils/loginLogic';
import { baseUrl } from '../../utils/env';
import { fetchExampleList } from '../../utils/fetchData';

const Menu = props => {
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();

  const isNotYetReady = () => {
    props.setMessage({
      title: 'Wir arbeiten daran',
      message: 'Diese Funktion steht schon bald zur Verfügung',
      value: '',
      confirm: '',
      showBtnX: false,
    });
  };
  //==================================================================
  const onMenuClickHandler = btnId => {
    if (btnId === 'gear') {
      props.onSettingsShowHandler({
        show: true,
        headerText: 'Einstellungen',
        content: settingsPageContent,
        hideButtonBox: true,
        // confirm: 'confirm',
      });
      return;
    }
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
    if (btnId === 'get') {
      fetchExampleList();
      return;
      //==================================================================
      // // props.onSettingsShowHandler({
      // //   show: true,
      // //   headerText: 'Importieren',
      // //   content: importListContent,
      // //   confirm: onConfirmImport,
      // //   hideXBtn: false,
      // // });
      // // return;
      //==================================================================
    }
    if (btnId === 'exp') {
      exportTxtFileToDownloads(dataCtx, 'Kochstudio');
      return;
    }
    isNotYetReady();
  };

  ////////////////// TODO //////////////////
  const onLogoutConfirmHandler = () => {
    logout(`${baseUrl()}/api/v1/users/logout`);
    updateData('LOGOUT');
    dataCtx.menuState.userData.hideLogin = false;
    props.onLoginHandler({ userData: dataCtx.menuState.userData });
  };

  const onLogoutHandler = () => {
    console.log(dataCtx.menuState);
    if (dataCtx.menuState.loggedIn) {
      props.setMessage({
        title: 'Logout',
        message: 'Wollen Sie sich ausloggen ?',
        value: '',
        confirm: onLogoutConfirmHandler,
        showBtnX: true,
      });
    }
  };

  //==================================================================
  // //  Export File
  let dateNow = new Date();
  dateNow = dateNow.toISOString().split('.')[0].replaceAll(':', '_');
  dateNow = dateNow.slice(0, dateNow.length - 3);
  const exportTxtFileToDownloads = (objInput, inputName) => {
    const filename = inputName + '_' + dateNow + '.txt';
    props.setMessage({
      title: `Rezeptliste exportieren`,
      message: `Die Datei wird unter Downloads gespeichert ! Dateiname: ${filename}`,
      showBtnX: true,
      value: { objInput, filename },
      confirm: onConfirmExportTxtFileToDownloads,
    });
  };
  const onConfirmExportTxtFileToDownloads = obj => {
    const objCleaned = [...obj.objInput.recipeList];
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify({ recipeList: objCleaned }, null, 2)], {
        type: 'text/plain',
      })
    );
    a.setAttribute('download', `${obj.filename}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  //==================================================================
  // // // settingsPage avoidList
  const [avoidListState, setAvoidListState] = useState({
    show: false,
    list: dataCtx.appData.settings.shoppingListSettings.avoidList,
  });
  const avoidListUpdate = el => {
    setAvoidListState({ show: true, list: el.target.value });
  };
  useEffect(() => {
    settingsPageCallAvoidList(avoidListState.show, avoidListState.list);
  }, [avoidListState, dataCtx.menuState]);
  //==================================================================

  const settingsPageCallAvoidList = (show, currentState) => {
    props.onSettingsShowHandler({
      show,
      headerText: 'Einkaufsliste',
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

  // import
  const onConfirmImport = () => {
    if (dataCtx.appData.recipeList.length > 0) {
      props.setMessage({
        title: `Error`,
        message:
          'Überschreiben der Liste nicht möglich ! Es ist schon eine Rezeptliste vorhanden !',
        showBtnX: false,
      });
      return;
    } else importList(exampleList);
  };
  const importList = exampleList => {
    const data = (dataCtx.appData.recipeList = exampleList);
    localStorage.setItem('localData', JSON.stringify(data));
    updateData('SETTINGS', { empty: 'skipToEndOfReducer' });
    setTimeout(() => {
      console.log('reload');
      window.location.reload();
    }, 100);
  };

  const importListContent = (
    <div className={settingsBox.settingsBox}>
      <h2 className={settingsBox['settingsBox--h2']}>
        Beispiel Rezeptliste laden:
      </h2>
      <p
        className={settingsBox['settingsBox--p']}
        style={{ letterSpacing: '.1rem' }}
      >
        Um Datenverlust zu vermeiden ist diese Funktion nur möglich, wenn die
        aktuelle Liste leer ist !
      </p>
      <div className={classes.importIconBox}>
        <FontAwesomeIcon
          icon={faFileArrowDown}
          id={'rocket'}
          className={classes.importIcon}
          color={''}
        />
      </div>
    </div>
  );
  //==================================================================
  // Einstellungen delete
  const onDeleteHandler = () => {
    props.onSettingsShowHandler({
      show: true,
      headerText: 'Löschen',
      content: settingsPageDeleteContent,
      hideButtonBox: true,
    });
  };
  const closeSettingsPage = () => {
    props.closeSettingsPage();
  };
  const deleteConfirmHandler = btnId => {
    updateData('DELETEALL', { btnId: btnId });
    closeSettingsPage();
  };
  const onDeleteData = btnId => {
    props.setMessage({
      title: `Achtung`,
      message:
        'Die Daten werden unwiderruflich gelöscht ! Trotzdem fortfahren ?',
      showBtnX: true,
      value: btnId,
      confirm: deleteConfirmHandler,
      dismiss: closeSettingsPage,
    });
  };
  const settingsPageDeleteContent = (
    <div className={settingsBox.settingsBox}>
      {/* <h2 className={settingsBox['settingsBox--h2']}>Löschen:</h2> */}
      <div>
        <MenuItem
          text={'Rezeptliste löschen'}
          icon={'trash'}
          id={'trashRecipeList'}
          iconColor={'#f54242'}
          onBtnClick={onDeleteData}
        ></MenuItem>
        <MenuItem
          text={'User-Daten löschen'}
          icon={'trash'}
          id={'trashUser'}
          iconColor={'#f54242'}
          onBtnClick={onDeleteData}
        ></MenuItem>
        <MenuItem
          text={'Alles löschen'}
          icon={'trash'}
          id={'trashAll'}
          iconColor={'#f54242'}
          onBtnClick={onDeleteData}
        ></MenuItem>
      </div>
    </div>
  );

  //==================================================================
  // Color Theme
  const colorTheme = () => {
    props.onSettingsShowHandler({
      show: true,
      headerText: 'Color-Theme',
      content: settingsPageColorContent,
      hideButtonBox: true,
    });
  };
  const settingsPageColorContent = (
    <div className={settingsBox.settingsBox}>
      <div>
        <MenuItem
          text={'Teal'}
          icon={'brush'}
          id={'brush'}
          iconColor={'#20C997'}
          onBtnClick={isNotYetReady}
        ></MenuItem>
        <MenuItem
          text={'Orange'}
          icon={'brush'}
          id={'brush'}
          iconColor={'#f5a142'}
          onBtnClick={isNotYetReady}
        ></MenuItem>
        <MenuItem
          text={'Yellow'}
          icon={'brush'}
          id={'brush'}
          iconColor={'#f2f542'}
          onBtnClick={isNotYetReady}
        ></MenuItem>
        <MenuItem
          text={'Green'}
          icon={'brush'}
          id={'brush'}
          iconColor={'#32cf47'}
          onBtnClick={isNotYetReady}
        ></MenuItem>
        <MenuItem
          text={'Blue'}
          icon={'brush'}
          id={'brush'}
          iconColor={'#3288cf'}
          onBtnClick={isNotYetReady}
        ></MenuItem>
      </div>
    </div>
  );

  //==================================================================
  // Einstellungen
  const settingsPageContent = (
    <div className={settingsBox.settingsBox}>
      {/* <h2 className={settingsBox['settingsBox--h2']}>Löschen:</h2> */}
      <div>
        <MenuItem
          text={'Color Theme'}
          icon={'brush'}
          id={'brush'}
          iconColor={'#fff'}
          onBtnClick={colorTheme}
        ></MenuItem>
        <MenuItem
          text={'Daten löschen'}
          icon={'trash'}
          id={'trash'}
          iconColor={'#fff'}
          onBtnClick={onDeleteHandler}
        ></MenuItem>
      </div>
    </div>
  );
  //==================================================================
  // about
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
      <div className={classes.aboutIconBox}>
        <FontAwesomeIcon
          icon={faRocket}
          id={'rocket'}
          className={classes.aboutIcon}
          color={''}
        />
      </div>
    </div>
  );
  //==================================================================
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
        <div className={classes.menuBox__UserBox} onClick={onLogoutHandler}>
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
              onClickHandler={onLogoutHandler}
            />
            <div>
              {/* <p>Logged In:</p> */}
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

const exampleList = [];
