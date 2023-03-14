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
  const fetchExampleList = async () => {
    let res;
    console.log(process.env.REACT_APP_URL);
    try {
      await fetch(
        `${process.env.REACT_APP_URL}/api/v1/recipe/getExampleRecipes`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // Authentication: `Bearer ${dataCtx.menuState.token}`,
            // Authorization: `Bearer ${dataCtx.menuState.token}`,
            // Authorization:
            //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGJhNzkyMGE0Mzg2MDAyYzgxMWQ0MiIsImlhdCI6MTY3ODUxODcyOH0.4WCETMbsxYXPH6CSmQ6zmiFHfarZQ3mrnCFgl2tLf3g',
          },
        }
      )
        .then(response => response.json())
        // .then(json => (res = json));
        .then(json => {
          console.log('✅', json);
          res = json;
        });
    } catch (err) {
      console.log('❌', err);
    }
    return res;
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
      //temp
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
    }
    if (btnId === 'exp') {
      exportTxtFileToDownloads(dataCtx, 'Kochstudio');
      return;
    }
    isNotYetReady();
  };
  const onLogoutConfirmHandler = () => {
    logout('https://cyan-pleasant-chicken.cyclic.app/api/v1/users/logout');
    dataCtx.menuState.userData = {};
    dataCtx.appData = {};
    dataCtx.menuState.userData.hideLogin = false;
    props.onLoginHandler({ userData: dataCtx.menuState.userData });
  };
  const onLogoutHandler = () => {
    if (dataCtx.menuState.userData.loggedIn) {
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
    list: dataCtx.menuState.shoppingListSettings.avoidList,
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
    if (dataCtx.recipeList.length > 0) {
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
    const data = (dataCtx.recipeList = exampleList);
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

const exampleList = [
  {
    name: 'Arme Ritter',
    fav: false,
    weeklyPlan: true,
    ingredients: [
      {
        ingredientName: 'Mehl',
        quantity: '300',
        unit: 'g',
        id: 'c2b1602f-e6f7-7597-82be-600a740b6bef',
        editMode: false,
      },
      {
        ingredientName: 'Eier',
        quantity: '5',
        unit: 'Stk.',
        id: 'c643a35b-efdb-0952-6dd8-6a5b46228d5a',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '300',
        unit: 'ml',
        id: 'e261f15d-7c42-e2b8-3295-c170e6b38f04',
        editMode: false,
      },
      {
        ingredientName: 'Toastbrot ',
        quantity: '0.5',
        unit: 'Stk.',
        id: '402f316c-60d7-274e-cf27-4ea68e75e6ca',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '643a6fa8-722d-d2ca-78b1-81ecbe780ec7',
        editMode: false,
      },
      {
        ingredientName: 'Zimt',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '9bf75978-f027-239b-8961-ad88ee2877b4',
        editMode: false,
      },
      {
        ingredientName: 'Zucker',
        quantity: '1',
        unit: 'TL-gestr.',
        id: 'c1689e65-db23-ed0f-fd2d-38610f4a91bd',
        editMode: false,
      },
    ],
    preparation: 'Mittlere Stufe am Herd \nBeidseitig ca 3 Minuten anbraten.',
    id: '759e69c2-9ab5-231b-0d59-e15339b60270',
  },
  {
    name: 'Aus nix irgend was',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Nudel',
        quantity: '2',
        unit: 'Tasse',
        id: '08c31d35-54f9-9d31-7be4-412f5049973f',
        editMode: false,
      },
      {
        ingredientName: 'Paprika',
        quantity: '1',
        unit: 'Stk.',
        id: '7b73f90c-ad8d-7b1e-9699-10e68f7b03dd',
        editMode: false,
      },
      {
        ingredientName: 'Eier',
        quantity: '4',
        unit: 'Stk.',
        id: '95b2cdeb-ed2f-6297-a4e4-2531c009c843',
        editMode: false,
      },
      {
        ingredientName: 'Würstchen',
        quantity: '4',
        unit: 'Stk.',
        id: '127940b8-166a-e01c-c3a5-f6406be96471',
        editMode: false,
      },
      {
        ingredientName: 'Sucuk',
        quantity: '100',
        unit: 'g',
        id: '82fddd2d-e8fa-b064-1ae1-3b3e041e9646',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch ',
        quantity: '2',
        unit: 'EL',
        id: '054e4f69-ed77-0762-a02d-42553a1a4c30',
        editMode: false,
      },
      {
        ingredientName: 'Chili ',
        quantity: '2',
        unit: 'Stk.',
        id: 'e06cdff9-b910-cff1-6103-46408e465876',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '50',
        unit: 'ml',
        id: 'c825ad3b-6f94-3c8a-84c8-8b0ff668b7d1',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '9b768882-4595-2d9f-7626-9c33e3443a44',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'fd09ea6a-7aac-d70c-3e8f-6b0263ed5f4a',
        editMode: false,
      },
    ],
    preparation:
      'Nudeln in Salzwasser kochen aber etwas früher rausholen damit sie noch ein bisschen knackig sind !\nAlle anderen Zutaten schön klein schneiden und Stück für Stück in der Pfanne anbraten.\nGegen Ende die Nudel in die Pfanne dazugeben und alles kurz gemeinsam anbraten.\nDie Eier in einem Becher mit etwas Milch  und mit Gewürzen verquirlen.\nDie Rührei Mischung mit in die Pfanne geben und bis zur gewünschten Konsistenz alles anbraten.',
    id: 'e3ab4a12-bcb5-b13e-fd64-d2f156d7de3e',
  },
  {
    name: 'Chili con carne',
    fav: true,
    weeklyPlan: true,
    ingredients: [
      {
        ingredientName: 'Hackfleisch',
        quantity: '1',
        unit: 'Stk.',
        id: '87ef3e93-7f31-29a8-0005-673a963b8611',
        editMode: false,
      },
      {
        ingredientName: 'Bonen',
        quantity: '2',
        unit: 'Stk.',
        id: 'b2fb62d8-c2ad-265e-c735-63e2354bc520',
        editMode: false,
      },
      {
        ingredientName: 'Mais',
        quantity: '1',
        unit: 'Stk.',
        id: '5743f387-2113-62c7-2742-63b1a2c74e3b',
        editMode: false,
      },
      {
        ingredientName: 'gehackte Tomaten',
        quantity: '2',
        unit: 'Stk.',
        id: '693c0f1d-4358-5cda-7dee-d1d9d20fe1e0',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '3',
        unit: 'Stk.',
        id: '2d72e118-4936-7c94-7f6e-f195629c849c',
        editMode: false,
      },
      {
        ingredientName: 'Nudel',
        quantity: '200',
        unit: '',
        id: 'e741e311-04c6-004d-c10a-bcb216d63da6',
        editMode: false,
      },
      {
        ingredientName: 'Kartoffel',
        quantity: '200',
        unit: 'g',
        id: '4bb5dc9a-663d-d012-6724-c3a0cf18bfb2',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel',
        quantity: '1',
        unit: 'Stk.',
        id: 'ced74bc2-feac-cda6-4826-0cc4e9af26d0',
        editMode: false,
      },
      {
        ingredientName: 'Knorr Chili',
        quantity: '1',
        unit: 'Stk.',
        id: 'e9dc09c9-953a-4f1c-34f2-88e4c210bdce',
        editMode: false,
      },
      {
        ingredientName: 'Wasser',
        quantity: '400',
        unit: 'ml',
        id: 'e62a3f8f-ea4e-3dfa-17a3-ab0dbdebaafd',
        editMode: false,
      },
    ],
    preparation:
      'Das Hackfleisch mit Öl und Chili in der Pfanne anbraten zum Ende hin die Zwiebel dazugeben und mit anschwitzen.\nAlles zusammen in einen Topf geben und ca eine Stunde gut kochen lassen.\nNudel und Mais kommen erst zum Ende hin ein damit es nicht verkocht.',
    id: 'b935b43f-ca47-91a7-8a89-7f1fbb6697d0',
  },
  {
    name: 'Curry Hähnchen mit Brokkoli',
    ingredients: [
      {
        ingredientName: 'Hähnchenbrust',
        quantity: '400',
        unit: '',
        id: '168b57b4-9dd6-8eb1-bdc2-4b3ecfa08134',
        editMode: false,
      },
      {
        ingredientName: 'Brokkoli',
        quantity: '0.5',
        unit: 'Stk.',
        id: '4a548fc9-602f-bb52-97b3-64bda8b6c978',
        editMode: false,
      },
      {
        ingredientName: 'Paprika rot',
        quantity: '1',
        unit: 'Stk.',
        id: '4fd818af-ee5e-f067-fa97-7b4d3803bdb6',
        editMode: false,
      },
      {
        ingredientName: 'Frühlingszwiebel',
        quantity: '1',
        unit: 'Stk.',
        id: '69f8c36b-f192-d469-289d-f4b38a5b204c',
        editMode: false,
      },
      {
        ingredientName: 'Vollkornreis',
        quantity: '1',
        unit: 'Tasse',
        id: 'fb59c50b-7622-cb7f-21ad-d7694ad0b373',
        editMode: false,
      },
      {
        ingredientName: 'Cremefine ',
        quantity: '1',
        unit: 'Stk.',
        id: '7afa50ea-2ced-27c5-4548-88ee03ec6fe5',
        editMode: false,
      },
      {
        ingredientName: 'Sojasauce',
        quantity: '2',
        unit: 'EL',
        id: '87b87b7c-f70e-3b7c-467a-d10fee51fff3',
        editMode: false,
      },
      {
        ingredientName: 'Sesamöl',
        quantity: '1',
        unit: 'EL',
        id: '2fa460ec-790f-463f-3b10-6d298ceb4bf2',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'Priese',
        id: '8538f523-621b-51b3-9c75-8fcbfe46a74e',
        editMode: false,
      },
      {
        ingredientName: 'Currypulver',
        quantity: '1',
        unit: 'Priese',
        id: 'a1622c45-f653-41e1-3775-543ffa642d77',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühepulver',
        quantity: '1',
        unit: 'Priese',
        id: 'abcafe6c-4136-d90c-1510-d8da6eb25d2f',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '2',
        unit: 'EL',
        id: 'ce24ab20-6336-99cc-3b0c-5ba73d563d4b',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'f1d1b42c-70f9-117a-9c42-285669e0dc20',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'a9eabcf7-8830-8cb2-d5f1-66615fec541d',
        editMode: false,
      },
      {
        ingredientName: 'Honig ',
        quantity: '1',
        unit: 'TL',
        id: 'ae1431b3-202f-3e7d-2924-e235cfa46b73',
        editMode: false,
      },
    ],
    preparation:
      'Hähnchen Marinade:\nSojasauce Knoblauch Pfeffer Salz Paprikapulver Currypulver Honig Sesamöl.\n\nBrokkoli paprika und Zwiebel 2 Minuten anbraten mit Pfeffer Salz Curry und Gemüsebrühe.\n\nMariniertes hähnchenfleisch dazugeben cremefine einrühren mit Salz Pfeffer Curry abschmecken.',
    id: '66ef6880-1768-79ae-2791-997703fdb1e4',
    fav: false,
  },
  {
    name: 'Curry Spezial',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Hähnchenfleisch',
        quantity: '500',
        unit: 'g',
        id: '23a7d7fd-29c1-faca-07e6-eab59db034b3',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '3',
        unit: 'Stk.',
        id: '75de7a4c-9793-f4a2-518d-f18c94ad169f',
        editMode: false,
      },
      {
        ingredientName: 'Lauch',
        quantity: '1',
        unit: 'Stk.',
        id: '73e143b1-8e76-2549-0ce6-4e09fbf5c0f4',
        editMode: false,
      },
      {
        ingredientName: 'Ingwer',
        quantity: '2',
        unit: 'EL',
        id: '7941fd43-e97c-b3b7-c162-c972812d3979',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel',
        quantity: '1',
        unit: 'Stk.',
        id: '847c5055-a09f-9906-9ade-5c1e917d6eba',
        editMode: false,
      },
      {
        ingredientName: 'Paprika',
        quantity: '2',
        unit: 'Stk.',
        id: '4d174ecf-c0cc-a383-6548-ee0eaaf137f6',
        editMode: false,
      },
      {
        ingredientName: 'Curry fix',
        quantity: '1',
        unit: 'Stk.',
        id: '1b92e629-81a2-a9c8-e758-cad8a2ac37cf',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauchzehen',
        quantity: '3',
        unit: 'Stk.',
        id: '2f3782ff-627a-f335-c6bc-5d337186299f',
        editMode: false,
      },
      {
        ingredientName: 'Banane',
        quantity: '2',
        unit: 'Stk.',
        id: 'fa0c99e0-02ca-1e55-7c31-0361b762e065',
        editMode: false,
      },
      {
        ingredientName: 'Milch ',
        quantity: '0.5',
        unit: 'l',
        id: '52718eb3-d6c1-2edc-765f-4c905d7e9ec2',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '0c27597a-83d9-3b7b-ef94-613515c330b8',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'ab19cddc-a758-c381-d461-e1d682382095',
        editMode: false,
      },
      {
        ingredientName: 'Curry',
        quantity: '1',
        unit: 'Priese',
        id: '44e5f3cc-414d-aefb-7a83-e44496701589',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: '81139533-556c-a6a3-4d13-0faa601e5136',
        editMode: false,
      },
    ],
    preparation:
      'Hähnchenfleisch in der Pfanne mit Knoblauch und Chili anschwitzen.\nGemüse dazugeben und etwas brutzeln lassen.\nMilch dazugeben und aufkochen, Knorr fix einrühren.\nAbschmecken und nachwürzen mit Curry Pfeffer und so weiter.',
    id: 'f371b8ae-97aa-8aaa-f664-17d3c0f73997',
  },
  {
    name: 'Eierpfannkuchen',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Eier',
        quantity: '4',
        unit: 'Stk.',
        id: 'b0dcd5cc-c5a3-99f8-1342-5e4ba9347d72',
        editMode: false,
      },
      {
        ingredientName: 'Mehl',
        quantity: '400',
        unit: 'g',
        id: '7c931039-830d-f016-7b7b-d1cdf8d3ba62',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '350',
        unit: 'ml',
        id: '72c88b5e-bd86-fd00-a127-4e29db0313ac',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '0.5',
        unit: 'TL-gestr.',
        id: 'dd2cb098-c779-fc36-c09a-653903b7a7c5',
        editMode: false,
      },
    ],
    preparation:
      'Mehl sieben,\nEier dazugeben,\nlangsam Milch dazu bis der Teig okay ist.\nMittlere Hitze \nca 2 Minuten pro Seite',
    id: '400feff4-f2b7-3225-1e11-c5e42c11b308',
  },
  {
    name: 'Frikadellen',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Hackfleisch',
        quantity: '500',
        unit: 'g',
        id: '35c2a314-7878-5cd0-5479-d7dae1775de0',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel',
        quantity: '1',
        unit: 'Stk.',
        id: 'e64c50c3-4f51-3d2e-2360-97c6718568a6',
        editMode: false,
      },
      {
        ingredientName: 'Brötchen',
        quantity: '1',
        unit: 'Stk.',
        id: '8473daa0-7bbb-f007-52cc-c36d2898a790',
        editMode: false,
      },
      {
        ingredientName: 'Ei',
        quantity: '1',
        unit: 'Stk.',
        id: '3dd509a9-d47f-c6f3-9406-bb029d697270',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '68eac87a-5170-9a94-13fa-912c58be9363',
        editMode: false,
      },
      {
        ingredientName: 'Senf ',
        quantity: '1',
        unit: 'TL',
        id: 'e6a1a758-6f2a-c62c-f42a-352e65680183',
        editMode: false,
      },
      {
        ingredientName: 'Majoran',
        quantity: '1',
        unit: 'TL-gestr.',
        id: 'fd566e60-80b1-a3d1-1411-68f086dd1674',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'TL',
        id: 'fb5e72fd-7df4-7791-536d-e39fefb230c0',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1.5',
        unit: 'TL',
        id: '2351b584-f209-9090-5c0f-574ff1829735',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '2',
        unit: 'Stk.',
        id: '1726d1bd-2d04-c7e0-dde3-e14f80b761e0',
        editMode: false,
      },
      {
        ingredientName: 'Maggi ',
        quantity: '1',
        unit: 'TL',
        id: 'efc9565d-bcfb-812f-01ee-67ddc122d61f',
        editMode: false,
      },
      {
        ingredientName: 'Fetakäse',
        quantity: '1',
        unit: 'Stk.',
        id: 'd2198c6b-d055-92cf-e10b-f88256a2487d',
        editMode: false,
      },
      {
        ingredientName: 'Muskat',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '8deb3d27-133d-3825-ba0d-1810de832542',
        editMode: false,
      },
    ],
    preparation:
      'Das Brötchen einweichen und ausdrücken.\nAlle Zutaten gut vermischen Frikadellen mit Käse in der Mitte Formen \nVon beiden Seiten scharf anbraten anschließend ca 15 bis 20 Minuten auf mittlere Hitze braten.',
    id: '26a31e77-ba2a-366f-ce01-94b78e656ab0',
  },
  {
    name: 'Gnocchi Gratin',
    ingredients: [
      {
        ingredientName: 'Rinderhackfleisch',
        quantity: '400',
        unit: 'g',
        id: '82245ae9-c5c4-2890-ab53-b4cb3c13f303',
        editMode: false,
      },
      {
        ingredientName: 'Gnocchi',
        quantity: '2',
        unit: 'Stk.',
        id: '18fff506-91de-5929-e592-d73e156062e0',
        editMode: false,
      },
      {
        ingredientName: 'Paprika rot',
        quantity: '1',
        unit: 'Stk.',
        id: 'c153a9e9-3f61-064b-e22b-eef3bdd51a9c',
        editMode: false,
      },
      {
        ingredientName: 'Pilze',
        quantity: '1',
        unit: 'Stk.',
        id: '42ea2b35-f97d-3a34-0c7c-9c0cd436dc82',
        editMode: false,
      },
      {
        ingredientName: 'Butter',
        quantity: '1',
        unit: 'EL',
        id: '4f47b81b-6533-1f3d-6b6f-229839c38aee',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '3',
        unit: 'Stk.',
        id: '231d667c-ac75-c706-7a1a-c3340f01b3bd',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel',
        quantity: '1',
        unit: 'Stk.',
        id: 'c2a90436-b368-9ef8-8e90-24a4ca6db396',
        editMode: false,
      },
      {
        ingredientName: 'Mehl',
        quantity: '1',
        unit: 'EL',
        id: '43186248-f279-c10c-9e16-02188974e916',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '300',
        unit: 'ml',
        id: '6f4670c1-d1cf-42fe-0e3c-e164052854ed',
        editMode: false,
      },
      {
        ingredientName: 'Reibekäse',
        quantity: '1',
        unit: 'Stk.',
        id: '01632fcc-a661-d46f-a870-0ec92651e622',
        editMode: false,
      },
      {
        ingredientName: 'Weißwein',
        quantity: '100',
        unit: 'ml',
        id: '2c2987b2-47b2-0062-6225-70e57dc73e28',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '3e8fde16-759c-ec51-1180-f03babfd8b3b',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '2c258e07-bcd1-fec0-58cc-0a24d431c763',
        editMode: false,
      },
      {
        ingredientName: 'Petersilie',
        quantity: '1',
        unit: 'Priese',
        id: '0b54c726-b181-3ed9-39e9-e3cced2da3b3',
        editMode: false,
      },
      {
        ingredientName: 'Öl',
        quantity: '50',
        unit: 'ml',
        id: '53ca3d06-ecc3-98c2-d224-aa157dd0b8ea',
        editMode: false,
      },
    ],
    preparation:
      'Gnocchi kurz aufkochen \nButter im Topf zerlassen, Mehl unterrühren, Milch nach und nach zugeben.\nKäse weißwein Salz Pfeffer Petersilie hinzufügen. \nPaprika und Champignons schneiden kurz in Pfanne andünsten und in Schüssel geben.\nHackfleisch scharf anbraten in Öl und gut würzen Zwiebel hinzu.\nNockis und Gemüse mischen und in auflaufform geben.\nHackfleischsoße und reibekäse darüber verteilen.\n\nCa 40 Minuten \n200 Grad\n',
    id: '13888678-56f0-108d-063b-0f2752ac5e51',
    fav: false,
  },
  {
    name: 'Kartoffelbrei',
    ingredients: [
      {
        ingredientName: 'Kartoffeln',
        quantity: '2',
        unit: 'kg',
        id: '901d7e52-dc2b-2ba1-4fa4-1168c9ccf3fb',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '',
        unit: '--',
        id: '7d5a0e7c-1576-c293-7b45-c74a6032fede',
        editMode: false,
      },
      {
        ingredientName: 'Maggi ',
        quantity: '',
        unit: '--',
        id: '7af67dda-3154-e2dc-6746-49cb1d86010d',
        editMode: false,
      },
      {
        ingredientName: 'Butter',
        quantity: '',
        unit: '--',
        id: 'e5bd21de-90f5-6132-2021-88f87df60c41',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '',
        unit: '--',
        id: 'd94e5b9d-b3c2-0204-7636-19956a75b3e8',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '',
        unit: '--',
        id: '12b9d7eb-9417-55c5-6350-3bf30cd873f9',
        editMode: false,
      },
      {
        ingredientName: 'Muskat',
        quantity: '',
        unit: '--',
        id: '8546d8b6-1799-95ef-7f2e-800423343254',
        editMode: false,
      },
    ],
    preparation:
      'Kartoffeln schälen und in kleine Stücke schneiden in salzwasser 20 Minuten kochen.\nStampfen \nWürzen und abschmecken',
    id: '2504fbd2-cac2-e99b-b9db-01816f8d58f7',
    fav: false,
  },
  {
    name: 'Kartoffelecken mit Bratwurst ',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Kartoffeln',
        quantity: '1,5',
        unit: 'kg',
        id: '79c612eb-a1f2-6568-7322-90e2f7e085dc',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebeln',
        quantity: '3',
        unit: 'Stk.',
        id: 'a627cb76-2fad-6516-451e-3af5cd7152b',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '4',
        unit: 'Stk.',
        id: 'a627cb76-2fa1500-51e-3af5cd76c24b',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: 'a627cb76-2fad-6516-451e-3asddd76c24b',
        editMode: false,
      },
      {
        ingredientName: 'Rosmarin',
        quantity: '2',
        unit: 'El',
        id: 'a627cb76-2fad-6516-451e-3ssdd7824b',
        editMode: false,
      },
      {
        ingredientName: 'Öl ',
        quantity: '150',
        unit: 'ml',
        id: '9bf6cd07-60f7-0971-97c5-2fe38eef3365',
        editMode: false,
      },
      {
        ingredientName: 'Natron ',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '01996ee9-8c61-86b3-975e-87643d875f93',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '37ae2441-c816-74e7-4059-48866008aef4',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL-gestr.',
        id: 'cc336921-7b63-c9e0-d0e2-e812ec2395fc',
        editMode: false,
      },
      {
        ingredientName: 'Bratwurst ',
        quantity: '2',
        unit: 'Stk.',
        id: 'f0704ff0-f6e0-bd30-9e44-b87bc9a4a61b',
        editMode: false,
      },
    ],
    preparation:
      'Kartoffel ohne zu schälen in Stücke schneiden. \nKartoffel 10 Minuten in Salzwasser mit Natron kochen.\nBackofen auf 250 Grad vorheizen.\nWährenddessen Chili und Knoblauch in Öl anschwitzen.\nDie Zwiebel kurz dazugeben bis sie schön glasig sind.\nZwiebel und Knoblauch aus dem Öl heraus sieben.\nDie fertigen Kartoffel in der Pfanne mit dem gesiebten Öl schwenken bis sie von allen Seiten benetzt sind.\nSalz Pfeffer und Rosmarin darüber geben.\nAuf dem backblech ausbreiten und für 35-40 Minuten in den Backofen.\nNach Ablauf der Zeit zwiebel und Knoblauch über die Kartoffel geben und weitere 10 Minuten in den Backofen.',
    test: true,
    id: '43626c25-9b64-23f6-ae39-6c273f288758',
  },
  {
    name: 'Kartoffelpfan. Spezial',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Kartoffel',
        quantity: '1.6',
        unit: 'kg',
        id: '263e84a0-16ff-3454-b7d6-a2fecd341797',
        editMode: false,
      },
      {
        ingredientName: 'Karotte',
        quantity: '200',
        unit: 'g',
        id: '27c8c0eb-7e5b-c7cc-ed2c-eb9684d57fbc',
        editMode: false,
      },
      {
        ingredientName: 'Mehl',
        quantity: '150',
        unit: 'g',
        id: '19a017e0-f8d9-95a6-a9be-a639370d6203',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '8',
        unit: 'g',
        id: 'e54d655b-024e-842d-a219-2c93de2a73ba',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '4',
        unit: 'g',
        id: '6e717448-1532-40f1-9c3c-d33469dcc6fd',
        editMode: false,
      },
      {
        ingredientName: 'Muskat ',
        quantity: '0.5',
        unit: 'TL-gestr.',
        id: '3c80ee67-d93b-1b06-03fb-af13d7372407',
        editMode: false,
      },
      {
        ingredientName: 'Eier ',
        quantity: '4',
        unit: 'Stk.',
        id: '51388fa3-3a8b-d313-88ee-03fd510b0537',
        editMode: false,
      },
    ],
    preparation: '',
    id: '0638cee2-4b4b-75a7-d6b5-aaa641aac1d5',
  },
  {
    name: 'Kartoffelpfannkuchen',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Kartoffel',
        quantity: '1.6',
        unit: 'kg',
        id: 'a2fbdc7a-aed8-d30f-12ad-4b1aba937df4',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '200',
        unit: 'g',
        id: 'd76d2579-4ebc-a195-553a-77a10721a9ed',
        editMode: false,
      },
      {
        ingredientName: 'Mehl',
        quantity: '150',
        unit: 'g',
        id: 'a5bd3828-15d1-b6e3-cdf5-400fc6f3fc96',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '8',
        unit: 'g',
        id: '59a68b2a-4200-26b1-c684-1e4a5ac9af57',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '4',
        unit: 'g',
        id: 'c577d7b2-799e-47e5-3ad1-21e377e5841e',
        editMode: false,
      },
      {
        ingredientName: 'Muskat ',
        quantity: '0.5',
        unit: 'TL-gestr.',
        id: 'e2cffcb1-6eac-2b53-c076-6ae7ae3edb2f',
        editMode: false,
      },
      {
        ingredientName: 'Eier ',
        quantity: '4',
        unit: 'Stk.',
        id: '1eb1fe64-7f2f-4edb-b875-06a93f059d80',
        editMode: false,
      },
    ],
    preparation:
      'Alle Zutaten gut vermengen in der Pfanne von beiden Seiten anbraten.\n\nNach Möglichkeit festkochende Kartoffeln verwenden!',
    id: 'e88d8b0d-5783-fdd7-3375-8c080db35be0',
  },
  {
    name: 'Kartoffelsalat',
    ingredients: [
      {
        ingredientName: 'Kartoffeln',
        quantity: '600',
        unit: 'kg',
        id: '124b42fc-e1f3-d73d-663c-8dbd1922f7f3',
        editMode: false,
      },
      {
        ingredientName: 'Essig',
        quantity: '2',
        unit: 'EL',
        id: '2680b776-6ead-505a-b265-5319e6b07991',
        editMode: false,
      },
      {
        ingredientName: 'Öl',
        quantity: '2',
        unit: 'EL',
        id: 'e6d7bd46-c1e3-0003-aca1-b605d09b89c4',
        editMode: false,
      },
      {
        ingredientName: 'Speck ',
        quantity: '50',
        unit: '',
        id: '93e16883-f159-83d3-9156-d1a6625fdaba',
        editMode: false,
      },
      {
        ingredientName: 'Schicken',
        quantity: '3',
        unit: 'Stk.',
        id: 'c83aa32a-5c43-7c92-4bc3-b5d0620b5e44',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: '1e9487ab-a285-74f6-b04a-fa7b64f4f60d',
        editMode: false,
      },
      {
        ingredientName: 'Fleischbrühe',
        quantity: '250',
        unit: 'ml',
        id: '407e7335-288d-5eaa-25a4-43547a21f49b',
        editMode: false,
      },
      {
        ingredientName: 'Petersilie',
        quantity: '1',
        unit: 'Stk.',
        id: '968dd312-87e2-3410-3c47-9824c07ebc7c',
        editMode: false,
      },
      {
        ingredientName: 'Schnittlauch',
        quantity: '1',
        unit: 'Stk.',
        id: 'd248df91-81b9-a465-8759-283b2ddd5fcb',
        editMode: false,
      },
      {
        ingredientName: 'Essiggurken',
        quantity: '3',
        unit: 'Stk.',
        id: '7ab9f821-c901-20d5-0c11-28c836752e99',
        editMode: false,
      },
      {
        ingredientName: 'Miracel whip',
        quantity: '1',
        unit: 'EL',
        id: '2bfb916c-4623-24a0-058d-b344c5970db8',
        editMode: false,
      },
      {
        ingredientName: 'Eier ',
        quantity: '3',
        unit: 'Stk.',
        id: '3d921cf8-e9a5-9f4b-d91c-c53ea4522521',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '43a02f8d-af19-f62c-b2ea-4b4d43382b3a',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'ba8f35e1-204f-45c6-076d-e2d98619c563',
        editMode: false,
      },
    ],
    preparation: '',
    id: '8c8407b1-5934-70c5-b1bc-374aaaafe245',
    fav: false,
  },
  {
    name: 'Kohlrouladen',
    ingredients: [
      {
        ingredientName: 'Weißkohl',
        quantity: '1.5',
        unit: 'kg',
        id: 'dceb7603-1377-d104-e45e-c6edaaecf796',
        editMode: false,
      },
      {
        ingredientName: 'Speckwürfel',
        quantity: '100',
        unit: '',
        id: '47c156b0-20e8-9db8-dd81-c0845c63795a',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '500',
        unit: 'ml',
        id: '6792a6bf-b39e-8a24-e6eb-b0cfb3c81db4',
        editMode: false,
      },
      {
        ingredientName: 'Klare Brühe',
        quantity: '500',
        unit: 'ml',
        id: '41bcc798-1902-e9a3-e33d-902e23a6ff79',
        editMode: false,
      },
      {
        ingredientName: 'Hackfleisch',
        quantity: '400',
        unit: '',
        id: '2a0caea0-0f5d-c425-cb5a-600f01425712',
        editMode: false,
      },
      {
        ingredientName: 'Eier',
        quantity: '1',
        unit: 'Stk.',
        id: 'aaa9e095-6512-735c-010b-3606a53bb177',
        editMode: false,
      },
      {
        ingredientName: 'Sesambrösel',
        quantity: '',
        unit: '--',
        id: 'e25a04fd-8796-6554-a10d-1455e201f94a',
        editMode: false,
      },
      {
        ingredientName: 'Senf',
        quantity: '2',
        unit: 'TL',
        id: '289a9372-292f-8d7d-37f1-c548aed6f54a',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: 'dcebaef2-7136-bd22-8b7a-d0e7945e51ee',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '62430887-6c65-4cf7-45aa-8d9a892ebe32',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer ',
        quantity: '1',
        unit: 'Priese',
        id: '8ff58260-34e2-0094-8ae2-7cd49bf5d588',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'Priese',
        id: '1f5fd3b2-0ff8-b6e2-2e15-540d0b124c3b',
        editMode: false,
      },
      {
        ingredientName: 'Majoran',
        quantity: '1',
        unit: 'Priese',
        id: 'eae4a8bc-83c1-843c-ee87-e3cde1915e57',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch ',
        quantity: '2',
        unit: 'EL',
        id: '595cdb6c-c3ce-8b4f-721f-769732fccfb3',
        editMode: false,
      },
      {
        ingredientName: 'Soße zum braten',
        quantity: '1',
        unit: 'Stk.',
        id: 'f6757a18-5e92-802f-6ec9-be3da35acafb',
        editMode: false,
      },
    ],
    preparation:
      'Wir sind Blätter abmachen und blanchieren.\nSpeckwürfel pürieren.\nAlle Zutaten für die Hackfleischfüllung vermengen und verkneten.\nKohlrouladen in der Pfanne anbraten dann Brühe dazu.\nZugedeckt 30 Minuten schmoren.\nRouladen rausnehmen ein Päckchen Soße zum Braten einrühren und aufkochen lassen. \nRouladen wieder dazugeben.',
    id: '4c104b94-5532-5c89-de4b-15ea9655fe16',
    fav: false,
  },
  {
    name: 'Kräuterfrischkäse',
    ingredients: [
      {
        ingredientName: 'Kräuterfrischkäse',
        quantity: '2',
        unit: 'Stk.',
        id: 'cc5edf3d-3ae2-8c87-5466-60444526a177',
        editMode: false,
      },
      {
        ingredientName: 'Radieschen',
        quantity: '200',
        unit: '',
        id: 'e3c6f531-acc4-9931-64d2-31e078b33f71',
        editMode: false,
      },
      {
        ingredientName: 'Lauchzwiebeln',
        quantity: '100',
        unit: '',
        id: '53e3d208-9f4a-f4d0-2d04-baf9f8012267',
        editMode: false,
      },
      {
        ingredientName: 'Schnittlauch',
        quantity: '1',
        unit: 'Stk.',
        id: 'eef5c53e-39d6-a8a7-cf1d-b4a607c0194a',
        editMode: false,
      },
      {
        ingredientName: 'Salatgurke',
        quantity: '1',
        unit: 'Stk.',
        id: '99fe7983-f31f-22f9-f7b2-019ab316b030',
        editMode: false,
      },
    ],
    preparation:
      'Alles in den zerkleinerer mit frischkäse mischen.\nMit Salz und Pfeffer abschmecken.',
    id: '77b98076-887b-0636-6ff9-1da3a9bf5e1c',
    fav: false,
  },
  {
    name: 'Kürbiscreme-Suppe',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Kürbis',
        quantity: '600',
        unit: '',
        id: 'bb51c51a-1a43-f79e-81d6-da7391d9356d',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '200',
        unit: '',
        id: 'ad8c88c9-58c8-d763-a116-08b7fe695c42',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: 'e3d8c205-3383-4021-1fd9-039bb554b800',
        editMode: false,
      },
      {
        ingredientName: 'Ingwer',
        quantity: '30',
        unit: '',
        id: 'c63e92a2-634d-751f-bb22-dbfc7a3196bc',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: 'a270f48c-edc3-5920-6cdf-6ec176ba8ef7',
        editMode: false,
      },
      {
        ingredientName: 'Butter',
        quantity: '1',
        unit: 'EL',
        id: '3c5d64b4-0793-07c3-5871-7979b725bf6d',
        editMode: false,
      },
      {
        ingredientName: 'Weißwein',
        quantity: '200',
        unit: 'ml',
        id: '58947efa-5b36-5596-8e53-e4dc32a35f07',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '300',
        unit: 'ml',
        id: '5f8f5678-60a4-86f2-6f18-b03ac4d21d24',
        editMode: false,
      },
      {
        ingredientName: 'Sahne',
        quantity: '150',
        unit: 'ml',
        id: '0399facf-37e6-4357-765f-0b52d81b64bc',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '661e8289-3761-8bdb-32ad-756af58d1240',
        editMode: false,
      },
      {
        ingredientName: 'Zitronenschale',
        quantity: '1',
        unit: 'Stk.',
        id: 'a93d934c-957e-d7a3-9b89-a7d324c3d158',
        editMode: false,
      },
      {
        ingredientName: 'Zucker',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '86ec50a5-7759-1837-98dd-9316c666b361',
        editMode: false,
      },
      {
        ingredientName: 'Musst',
        quantity: '1',
        unit: 'TL-gestr.',
        id: 'dfdc661d-3087-4406-c0ef-af0265345ec9',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'TL-gestr.',
        id: 'e618e9e7-d8c0-04fb-32d5-23248173b9c7',
        editMode: false,
      },
    ],
    preparation:
      'Kürbiswürfeln\nKarotten schälen und in Scheiben schneiden\nZwiebelwürfeln\n\nZwiebel Ingwer Chili in Butter leicht anschwitzen.\nKürbis und Karotten hinzugeben.\nAblöschen mit weißwein, etwas einkochen lassen.\nSahne hinzugeben und alles mit dem Pürierstab fein pürieren.\nZucker und geriebener zitronenschale zugeben.\nMit Muskat Salz Pfeffer abschmecken.',
    id: '4f8a9f4f-e666-e3a7-10d2-2546bd20c68c',
  },
  {
    name: 'Lachs a la Provence',
    ingredients: [
      {
        ingredientName: 'Bacon schinkenwürfel',
        quantity: '1',
        unit: 'Stk.',
        id: 'a4617f4d-2148-08ed-fa7b-dedca39eb8dd',
        editMode: false,
      },
      {
        ingredientName: 'Cocktailtomaten',
        quantity: '8',
        unit: 'Stk.',
        id: '48445a01-90ff-427e-65dd-802bbac06164',
        editMode: false,
      },
      {
        ingredientName: 'Sahne',
        quantity: '150',
        unit: 'ml',
        id: '98379cd1-48ab-72bb-1fa4-999d9efef591',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '200',
        unit: 'ml',
        id: '694c7ecb-74b2-767d-469d-18fcfd00aa0a',
        editMode: false,
      },
      {
        ingredientName: 'Basilikum',
        quantity: '1',
        unit: 'Stk.',
        id: 'e606f931-4bc6-98dc-6f3a-3494abae4c5d',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'e94c27bc-c7e4-0814-a118-a01857ec1006',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '16a32f64-4050-3a0b-b758-6090407b94c3',
        editMode: false,
      },
      {
        ingredientName: 'Oregano',
        quantity: '1',
        unit: 'Priese',
        id: '627fb148-0816-eecb-179e-452f600f1339',
        editMode: false,
      },
      {
        ingredientName: 'Thymian',
        quantity: '1',
        unit: 'Priese',
        id: '5b77f040-a7a4-0476-b95d-cf2d7dfd4b14',
        editMode: false,
      },
      {
        ingredientName: 'Dill ',
        quantity: '1',
        unit: 'Priese',
        id: 'ddfc7947-03d9-e7af-1197-80f54e804599',
        editMode: false,
      },
      {
        ingredientName: 'Bärlauchbandnudeln',
        quantity: '500',
        unit: '',
        id: 'b59c65ae-b52f-b6d6-5287-8233ebe1d664',
        editMode: false,
      },
      {
        ingredientName: 'Lachs',
        quantity: '400',
        unit: '',
        id: 'ab39ad0f-da22-45c3-f902-a86e25564b9a',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch ',
        quantity: '4',
        unit: 'Stk.',
        id: '7c0338df-2577-479c-c188-bcc6f2b20098',
        editMode: false,
      },
    ],
    preparation:
      'Nudeln kochen Anschluss Öl dazugeben\nBacon mit Zwiebel und Knoblauch anbraten\nTomaten gestückelt dazugeben\nSahne und Milch dazu\nGewürze einrühren\nLachs in Öl Knoblauch Zwiebel anbraten.\nPfeffer Salz Dill drüber.',
    id: '086acf63-581f-929a-7d9d-eb606924109b',
    fav: false,
  },
  {
    name: 'Lasagne',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Rinderhack',
        quantity: '600',
        unit: 'g',
        id: '94887100-d99a-64f5-31fa-899e879f5bef',
        editMode: false,
      },
      {
        ingredientName: 'Lasagne Blätter',
        quantity: '1',
        unit: 'Stk.',
        id: '0d9c0c18-7502-4ef9-875a-f18097849533',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebeln',
        quantity: '1',
        unit: 'Stk.',
        id: 'c14f6076-04c7-13a4-78af-c2797c3ded86',
        editMode: false,
      },
      {
        ingredientName: 'Creme Fine ',
        quantity: '300',
        unit: 'g',
        id: '97413ddf-9954-3463-bf05-e81bbb5e38d1',
        editMode: false,
      },
      {
        ingredientName: 'Mozzarella',
        quantity: '2',
        unit: 'Stk.',
        id: '6ecf9ab1-0d21-3285-0c92-aadf3d06a8a7',
        editMode: false,
      },
      {
        ingredientName: 'Knorr Lasagne',
        quantity: '2',
        unit: 'Stk.',
        id: '65db37fe-6178-a948-779e-54712bb2b2e0',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '4',
        unit: 'EL',
        id: 'da750d92-9f5e-26be-3c04-1ebd58f06d2a',
        editMode: false,
      },
    ],
    preparation:
      'Hackfleisch anbraten und mit Salz Pfeffer Paprika würzen.\nZwiebel und Knoblauch hinzufügen.\n1 l Wasser einrühren und Beutel Inhalt hinzufügen aufkochen lassen.\nCremefine und Creme fraiche dazugeben.\n\nAlles in eine auflaufform geben. \nMit Soße beginnend anschließend abwechselnd Soße und Lasagne Platten.\nMit Soße abschließen und Käse drüber streuen.\n200 Grad Ober Unterhitze \n25 bis 30 min ',
    id: '79e8b3d5-cfb4-d371-2f43-ef7c45beba04',
  },
  {
    name: 'Lauch Hackfleisch Auflauf',
    ingredients: [
      {
        ingredientName: 'Rinderhack',
        quantity: '400',
        unit: '',
        id: 'ca84ebda-0219-4c93-bca1-4a174517a2ca',
        editMode: false,
      },
      {
        ingredientName: 'Nudeln',
        quantity: '400',
        unit: '',
        id: 'de0241cb-2a27-0161-7c4b-55971d780602',
        editMode: false,
      },
      {
        ingredientName: 'Lauchstangen',
        quantity: '3',
        unit: 'Stk.',
        id: '5ab57d2a-de73-0f6e-cb02-8fd75dcbf9a3',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '2',
        unit: 'Stk.',
        id: '8c954d18-e48e-6f92-0a71-6a8b31aeb192',
        editMode: false,
      },
      {
        ingredientName: 'Sellerie',
        quantity: '200',
        unit: 'g',
        id: '2effd3b6-a88b-f7da-2863-fcb6f5c1d52b',
        editMode: false,
      },
      {
        ingredientName: 'Frischkäse buko ',
        quantity: '0.5',
        unit: 'Stk.',
        id: '4a9dd9d9-c70d-374d-996c-6105c6d8a22a',
        editMode: false,
      },
      {
        ingredientName: 'Schinkenwürfel',
        quantity: '0.5',
        unit: 'Stk.',
        id: 'a852448b-ee95-b43d-2197-474d9eb50c32',
        editMode: false,
      },
      {
        ingredientName: 'Bergkäse gerieben',
        quantity: '1',
        unit: 'Stk.',
        id: '5aedc830-a998-c9d7-084e-0604bc1e1b10',
        editMode: false,
      },
      {
        ingredientName: 'Saure Sahne',
        quantity: '0.5',
        unit: 'Stk.',
        id: 'e1063dc3-1a10-7c38-ab5a-e1e76e8fc87b',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '200',
        unit: 'ml',
        id: '784fc602-b02d-250d-0c75-ca3fe40df78c',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '100',
        unit: 'ml',
        id: 'd3ba0355-64c0-b61d-348e-ded91b7ca103',
        editMode: false,
      },
      {
        ingredientName: 'Ingwer ',
        quantity: '2',
        unit: 'EL',
        id: '1d888845-13c5-50f2-833f-05d0652c43db',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: '51aa399d-7feb-decb-0eea-abc2ed707e21',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '2',
        unit: 'EL',
        id: '94ed0d7e-c677-e3a2-a4f1-85d34a663e4a',
        editMode: false,
      },
      {
        ingredientName: 'Muskat',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '5a69d07e-5e84-97ec-6cd8-7de208653705',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'cc431bd0-ac3a-0e1b-1607-3964ef09b7e3',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '53f9e48c-4e10-ca1a-373e-71552c325713',
        editMode: false,
      },
    ],
    preparation: '30 min\n200 Grad',
    id: '660a1089-f238-94c5-4a74-102dd139cb5e',
    fav: false,
  },
  {
    name: 'Majoran Klöße',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Kartoffel',
        quantity: '500',
        unit: 'g',
        id: '1b204714-facd-af21-513f-2776bf899c81',
        editMode: false,
      },
      {
        ingredientName: 'Ei',
        quantity: '1',
        unit: 'Stk.',
        id: '0ebc03ad-41a9-d00d-cad6-81d4a8e22f78',
        editMode: false,
      },
      {
        ingredientName: 'Eigelb ',
        quantity: '1',
        unit: 'Stk.',
        id: 'b9f15a93-8ef5-670f-8ccd-f22792bd2325',
        editMode: false,
      },
      {
        ingredientName: 'Mehl',
        quantity: '150',
        unit: 'g',
        id: '9ba86830-236f-6866-1907-21574f444d65',
        editMode: false,
      },
      {
        ingredientName: 'Majoran ',
        quantity: '4',
        unit: 'TL',
        id: 'f4dda866-09d2-c963-af67-09b8dda6080e',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL',
        id: '7130e917-2895-28a3-c0bb-ec922a159d9d',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'TL',
        id: '958f708c-ceeb-66fc-9e59-054b70e1ea06',
        editMode: false,
      },
    ],
    preparation:
      'Kartoffel ein Tag früher kochen. \nca 20 Minuten bis sie von der Gabel rutschen \nKartoffel stampfen \nalle Zutaten vermischen \nKlöße formen \nin salzwasser aufkochen \nDann ca 20 bis 25 Minuten bei mittlerer Hitze ziehen lassen bis sie schwimme.',
    id: '01304d6d-11b0-9302-9d7f-de6fd1915537',
  },
  {
    name: 'Maultaschen-Suppe',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Maultaschen',
        quantity: '2',
        unit: 'Stk.',
        id: '75125099-f0a8-fddc-04cd-cea58ede038f',
        editMode: false,
      },
      {
        ingredientName: 'Suppengemüse',
        quantity: '1',
        unit: 'Stk.',
        id: 'ded421c5-e237-5c54-e09a-4a2dc6f464b3',
        editMode: false,
      },
      {
        ingredientName: 'Lauch',
        quantity: '1',
        unit: 'Stk.',
        id: 'e3a9c1a5-696c-b90d-fe69-1db66aa0a06a',
        editMode: false,
      },
      {
        recipeName: 'Karotten',
        id: 'a584d583-5d90-48c5-d08a-41c3a236e25a',
        editMode: false,
      },
      {
        ingredientName: 'Würstchen',
        quantity: '4',
        unit: 'Stk.',
        id: 'ebcb987e-0a18-3696-6a17-ad7bd5ce0c1d',
        editMode: false,
      },
      {
        ingredientName: 'Brokkoli',
        quantity: '1',
        unit: 'Stk.',
        id: 'a409f42c-1dde-6cac-f645-d9bf5f7a6d0c',
        editMode: false,
      },
      {
        ingredientName: 'Chilli',
        quantity: '2',
        unit: 'Stk.',
        id: '772871fd-c860-50fb-a2cf-3d82fa4d2d40',
        editMode: false,
      },
      {
        ingredientName: 'Ingwer',
        quantity: '2',
        unit: 'EL',
        id: '51024e03-c266-8f31-f59d-dd1158a192a4',
        editMode: false,
      },
      {
        ingredientName: 'Wasser',
        quantity: '3',
        unit: 'l',
        id: '0ef77b70-93f3-f607-dcc3-93f308292788',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '6',
        unit: 'TL',
        id: '415fb373-2b02-5999-3e0b-fcc0a0954b99',
        editMode: false,
      },
      {
        recipeName: 'Klare Fleischbrühe ',
        id: 'de50ca0e-7cac-be6b-d488-fcb570c12e56',
        editMode: false,
      },
    ],
    preparation:
      '2 l Wasser aufkochen\nBrokkoli Würstchen Ingwer Chili Salz Pfeffer Gemüsebrühe und Suppengemüse in den Topf geben.\nca 25 bis 30 Minuten stark kochen lassen bis sich der Brokkoli nahezu aufgelöst hat.\nLauch Maultaschen und 1 Liter Wasser hinzugeben und noch mal aufkochen lassen.\nAuf kleiner Stufe 30 Minuten weiterziehen lassen.',
    test: true,
    id: '0e91d717-1c73-70c6-7681-9e081003f540',
  },
  {
    name: 'Mediterrane Reispfanne ',
    ingredients: [
      {
        ingredientName: 'Reis ',
        quantity: '1.25',
        unit: 'Tasse',
        id: 'af5e0ccc-e053-9bb4-c9db-cecee4d9a8ab',
        editMode: false,
      },
      {
        ingredientName: 'Paprika',
        quantity: '2',
        unit: 'Stk.',
        id: '78f893d7-4384-4c10-ba9f-5b171abd2392',
        editMode: false,
      },
      {
        ingredientName: 'Zucchini',
        quantity: '2',
        unit: 'Stk.',
        id: '710e1f32-1ef2-70ac-1e46-bc864f32d4ea',
        editMode: false,
      },
      {
        ingredientName: 'Schafskäse',
        quantity: '1',
        unit: 'Stk.',
        id: '5440a0df-a578-ff63-9296-845a48ed7961',
        editMode: false,
      },
      {
        ingredientName: 'Rinderhack',
        quantity: '500',
        unit: '',
        id: 'ff25d46f-6c7c-5f76-1619-e4076d4c44f3',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '250',
        unit: 'ml',
        id: '93a5edb3-9016-b59f-1242-e6e0e950694f',
        editMode: false,
      },
      {
        ingredientName: 'Tomatenmark',
        quantity: '1',
        unit: 'EL',
        id: '6701550f-869d-9a18-e48a-4161f1c32870',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '2',
        unit: 'EL',
        id: '2445734f-c59a-ad20-c1ac-fd709b58f060',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: 'c2e7b274-9514-2550-3b77-fa1a252fef99',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'd5f7404d-959c-88f1-cd4f-6cb09a87367d',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '545d8e08-b147-4cfe-eca1-86af679357b2',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: 'b6953328-2265-d7a8-acb9-64f5fe1c221a',
        editMode: false,
      },
      {
        ingredientName: 'Koriander',
        quantity: '1',
        unit: 'Priese',
        id: '63effec8-0b16-fa77-cbaf-79bb1cd9d8ea',
        editMode: false,
      },
      {
        ingredientName: 'Thymian',
        quantity: '1',
        unit: 'Priese',
        id: 'c8bd8f7a-431e-7620-ec39-4d1782d4b781',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'Priese',
        id: '9cc2bdb7-fb80-794b-c994-8577c9b365da',
        editMode: false,
      },
    ],
    preparation:
      'Reis kochen.\nZwiebel Paprika Zucchini Feta in Würfel schneiden.\nHackfleisch anbraten.\n\nZwiebel Knoblauch Chili Pfeffer Salz Thymian Rosmarin Koriander Papierpulver und Tomatenmark dazu.\nIn zweiter Pfanne Zucchini und Paprika anschwitzen mit Gemüsebrühe garen, mit Salz Pfeffer und Knobi würzen.\n\nHackfleisch zum Gemüse mischen und Reis anschließend unterheben.\n\nMit fetawürfel servieren.',
    id: '9774c1c3-d1f2-17c4-54c0-761e74490000',
    fav: false,
  },
  {
    name: 'Nudelauflauf',
    ingredients: [
      {
        ingredientName: 'Nudeln',
        quantity: '400',
        unit: '',
        id: 'e2a75984-4e30-5b8b-2b48-8c3f775bd14c',
        editMode: false,
      },
      {
        ingredientName: 'Schinkenwürfel',
        quantity: '150',
        unit: '',
        id: '51239f90-d299-0beb-237e-e71488d5954a',
        editMode: false,
      },
      {
        ingredientName: 'Sahne',
        quantity: '400',
        unit: 'ml',
        id: '5fa53a30-4635-38ff-be56-89310c48f173',
        editMode: false,
      },
      {
        ingredientName: 'Geriebener Käse',
        quantity: '100',
        unit: '',
        id: '62192971-691f-fdec-ef60-910d03c7ab42',
        editMode: false,
      },
      {
        ingredientName: 'Knorr Nudelauflauf ',
        quantity: '2',
        unit: 'Stk.',
        id: '236ddcea-7732-300f-d8eb-cae8bd552920',
        editMode: false,
      },
    ],
    preparation:
      'Nudeln in auflaufform geben.\nMit schinkenwürfeln bestreuen.\nBeutelinhalt in 1200 ml Wasser einrühren, Sahne dazu aufkochen lassen.\nSahne über die Nudeln geben.\n\n200 Grad ober unterhitze 30 Minuten',
    id: 'a8401655-a7d9-1fed-ec87-ee1c537977d3',
    fav: false,
  },
  {
    name: 'Nudelsalat',
    ingredients: [
      {
        ingredientName: 'Gabelspaghetti',
        quantity: '250',
        unit: 'g',
        id: '0ed590d7-f78e-832a-1686-10072eae66c9',
        editMode: false,
      },
      {
        ingredientName: 'Fleischwurst',
        quantity: '0.5',
        unit: 'Stk.',
        id: '57676e78-5a4d-5d93-717b-e3131a611775',
        editMode: false,
      },
      {
        ingredientName: 'Erbsen',
        quantity: '0.5',
        unit: 'Stk.',
        id: 'b108fdae-943a-9eff-dcda-67ec0a1af234',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '0.5',
        unit: 'Stk.',
        id: 'c0a46acb-8263-da4f-32e1-ee89289c3967',
        editMode: false,
      },
      {
        ingredientName: 'Eier ',
        quantity: '4',
        unit: 'Stk.',
        id: '5e6d3013-28a5-302c-998e-25785a177e60',
        editMode: false,
      },
      {
        ingredientName: 'Paprika rot',
        quantity: '1',
        unit: 'Stk.',
        id: 'e08df532-eb24-eae5-5323-e336e73d2547',
        editMode: false,
      },
      {
        ingredientName: 'Paprika gelb',
        quantity: '1',
        unit: 'Stk.',
        id: '83956cfb-e04e-c4bf-cdca-b3dbc80592a9',
        editMode: false,
      },
      {
        ingredientName: 'Gurkenwasser',
        quantity: '3',
        unit: 'EL',
        id: '3823511e-0e4d-db5c-a88b-15a2a190a887',
        editMode: false,
      },
    ],
    preparation: 'Alles gut vermischen. \nMit Salz und Pfeffer abschmecken.',
    id: 'e459683a-69c4-358c-6aec-b996dc05abe9',
    fav: false,
  },
  {
    name: 'Ofengemüse mit Lachs',
    ingredients: [
      {
        ingredientName: 'Zucchini',
        quantity: '2',
        unit: 'Stk.',
        id: '0a0a1be7-cb0e-2e01-cadf-42102710a5af',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '2',
        unit: 'Stk.',
        id: '19f0db85-0bb0-dcf8-faed-1353770c41ca',
        editMode: false,
      },
      {
        ingredientName: 'Champignons',
        quantity: '6',
        unit: 'Stk.',
        id: '8940d432-5230-035d-5d02-d53011c41318',
        editMode: false,
      },
      {
        ingredientName: 'Kohlrabi',
        quantity: '0.5',
        unit: 'Stk.',
        id: '63c0c388-0b3d-bfa2-825e-ecae3aee1fd4',
        editMode: false,
      },
      {
        ingredientName: 'Lachs',
        quantity: '200',
        unit: '',
        id: 'c1730399-0383-d816-bbe5-b2c285aef6c7',
        editMode: false,
      },
      {
        ingredientName: 'Kräuterquark',
        quantity: '',
        unit: '--',
        id: 'c41c14d7-e930-e9c2-6635-f4b16e7c9297',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: '62646591-8ddf-8da4-4c23-06984ae4c911',
        editMode: false,
      },
      {
        ingredientName: 'Paprika rot',
        quantity: '1',
        unit: 'Stk.',
        id: '6facfc5c-cd2e-991c-2dc0-5d3ad723a163',
        editMode: false,
      },
      {
        ingredientName: 'Mini Tomaten',
        quantity: '6',
        unit: 'Stk.',
        id: 'b15d58f4-f350-8fb9-58d9-8bd6b39f8ab4',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '65945a1b-3d8b-661b-24fa-5cada9fbc856',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'fb54fe5b-8899-e81e-7aaf-9b7d6a079451',
        editMode: false,
      },
      {
        ingredientName: 'Thymian',
        quantity: '1',
        unit: 'Priese',
        id: 'e01aab41-b5f2-55b9-9fb4-71366fadee10',
        editMode: false,
      },
      {
        ingredientName: 'Oregano',
        quantity: '1',
        unit: 'Priese',
        id: '8daa379b-991e-7815-8aae-77b7c3429af3',
        editMode: false,
      },
      {
        ingredientName: 'Rosmarin',
        quantity: '1',
        unit: 'Priese',
        id: 'eee43b33-6cec-52ce-a563-46298446c051',
        editMode: false,
      },
      {
        ingredientName: 'Muskat',
        quantity: '1',
        unit: 'Priese',
        id: '5fdafe75-6c8c-437e-2578-eaf3cfa34766',
        editMode: false,
      },
      {
        ingredientName: 'Petersilie',
        quantity: '1',
        unit: 'Priese',
        id: 'dbf7ab77-c258-4232-380a-c2c450344b8e',
        editMode: false,
      },
    ],
    preparation: '200 Grad 40 Minuten\n',
    id: 'cd27a436-bca5-7837-b2fc-83d7ca1125a3',
    fav: false,
  },
  {
    name: 'Omas Linsensuppe ',
    ingredients: [
      {
        ingredientName: 'Speckwürfel',
        quantity: '100',
        unit: '',
        id: '8ba1dece-9228-6558-a921-cb1795e0d83f',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: 'dabe3328-897d-5696-8256-e82b9cef8588',
        editMode: false,
      },
      {
        ingredientName: 'Öl ',
        quantity: '3',
        unit: 'EL',
        id: '2db78af0-9355-5278-5f6f-9ed146128ad1',
        editMode: false,
      },
      {
        ingredientName: 'Suppengrün',
        quantity: '1',
        unit: 'Stk.',
        id: '2e303b93-133a-82c5-b73b-650a01702856',
        editMode: false,
      },
      {
        ingredientName: 'Karotten ',
        quantity: '4',
        unit: 'Stk.',
        id: '00ac3bb2-8fff-6039-b4c3-9f8b80ada5e6',
        editMode: false,
      },
      {
        ingredientName: 'Tellerlinsen',
        quantity: '150',
        unit: '',
        id: 'f0965e1f-d28f-c307-1d2b-28ba646bd7bb',
        editMode: false,
      },
      {
        ingredientName: 'Kreuzkümmel',
        quantity: '1',
        unit: 'Priese',
        id: '11a0be9b-d22d-b0e3-fe46-6ebdd7314ff4',
        editMode: false,
      },
      {
        ingredientName: 'Zucker',
        quantity: '1',
        unit: 'TL',
        id: 'db233d7e-9263-5947-92ef-f6790881e7fb',
        editMode: false,
      },
      {
        ingredientName: 'Weißweinessig',
        quantity: '3',
        unit: 'TL',
        id: '212d7e18-fa3a-2f8b-4929-8f6730ae3ab3',
        editMode: false,
      },
      {
        ingredientName: 'Wiener Würstchen',
        quantity: '3',
        unit: 'Stk.',
        id: 'd1f41bcf-5d8c-13f2-b235-c43162e4fce0',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '505dcf04-f529-0a93-bcf0-f763f8be4986',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '163b15be-25e1-f7b9-5214-f9aef6000461',
        editMode: false,
      },
      {
        ingredientName: 'Selleriestücke',
        quantity: '100',
        unit: '',
        id: 'dcb9ffb3-c2e2-1733-0d51-449a410ebf2d',
        editMode: false,
      },
    ],
    preparation:
      'Speck mit Zwiebel in Öl anschwitzen.\nAlle Zutaten kleinen Würfeln und in einen Topf geben.\nMit Brühe aufgießen.\n30 Minuten kochen lassen.\nAnschließend würzen und zum Schluss die Würstchen dazu.\n',
    id: '89303071-9d72-5495-8c8d-72aa0f622467',
    fav: false,
  },
  {
    name: 'Pizzabrötchen',
    ingredients: [
      {
        ingredientName: 'Brötchen',
        quantity: '4',
        unit: 'Stk.',
        id: '600d1e4b-9ef4-5dc7-fd25-369c97d8179d',
        editMode: false,
      },
      {
        ingredientName: 'Paprika',
        quantity: '1',
        unit: 'Stk.',
        id: '3b8f4a5d-8849-2c4d-687c-0b22d9bba0de',
        editMode: false,
      },
      {
        recipeName: 'Salami',
        id: '661be35e-1aa7-af19-a18c-85970a93ec5a',
        editMode: false,
      },
      {
        ingredientName: 'Mozzarella',
        quantity: '150',
        unit: 'g',
        id: '5c92bbb6-5309-71e1-3ff7-7adfdc725a13',
        editMode: false,
      },
      {
        ingredientName: 'Tomatensoße',
        quantity: '100',
        unit: 'ml',
        id: '714a4aeb-6c95-2f47-f821-72364e6eb0a1',
        editMode: false,
      },
      {
        ingredientName: 'Oregano',
        quantity: '1',
        unit: 'Priese',
        id: 'a41c95be-797e-2c11-e4ce-323e6445f1aa',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '0ace7e49-6a36-8137-626d-cc8041c85634',
        editMode: false,
      },
      {
        recipeName: 'Pfeffer',
        id: '216168e0-2075-ea85-a52d-3f84576acf7c',
        editMode: false,
      },
      {
        ingredientName: 'Mais',
        quantity: '100',
        unit: 'g',
        id: 'ed75c1cb-3ded-c5ca-5abe-9825584b227e',
        editMode: false,
      },
    ],
    preparation: '200 Grad ober unterhitze \n25 Minuten\n\n',
    id: '4f0787bf-25c4-fa18-15e3-5602af451d84',
    fav: false,
  },
  {
    name: 'Reis Gemüse',
    ingredients: [
      {
        ingredientName: 'Reis',
        quantity: '2',
        unit: 'Tasse',
        id: 'c83dd630-94f7-60ab-0ff4-06a538e4c86c',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '2',
        unit: 'Stk.',
        id: 'de211bc8-9f74-1d81-a3fc-a32de59a698c',
        editMode: false,
      },
      {
        ingredientName: 'Paprika ',
        quantity: '1',
        unit: 'Stk.',
        id: '2dd720e5-b862-ae19-1bbe-b4d0570840b9',
        editMode: false,
      },
      {
        ingredientName: 'Mais',
        quantity: '1',
        unit: 'Stk.',
        id: 'd00265ed-e562-53ca-929b-da34d092f234',
        editMode: false,
      },
      {
        ingredientName: 'Erbsen ',
        quantity: '1',
        unit: 'Stk.',
        id: 'e3609342-28d2-7004-ba55-0bcd7542e61a',
        editMode: false,
      },
      {
        ingredientName: 'Debreziner Würstchen',
        quantity: '2',
        unit: 'Stk.',
        id: '9b804ed9-9f18-6cc2-f7f9-2f3d66c49427',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '2',
        unit: 'Stk.',
        id: '47b7a39c-1d60-80d2-1851-296a6f74c14d',
        editMode: false,
      },
      {
        ingredientName: 'Ingwer ',
        quantity: '2',
        unit: 'EL',
        id: '86f685ef-f909-13b4-70b0-60a8668b4449',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch ',
        quantity: '2',
        unit: 'EL',
        id: '253fc569-5963-3093-e222-778c189b1be4',
        editMode: false,
      },
      {
        ingredientName: 'Eier ',
        quantity: '3',
        unit: 'Stk.',
        id: 'ff03cee4-ecbb-cda2-4ba9-e21766936c8a',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '86a4ca8c-49b3-65ae-a24d-b063c2aac807',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '789d6b33-204d-14ab-9ce1-c76f9aa3f1f6',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: 'c4563682-6b62-1323-8fdf-df719fb48a15',
        editMode: false,
      },
      {
        ingredientName: 'Thymianpulver',
        quantity: '1',
        unit: 'Priese',
        id: 'af23e8b5-1269-ca87-95f6-241aabc19a7f',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'Priese',
        id: '76fba0fa-4265-f947-e557-96d5c8904db6',
        editMode: false,
      },
      {
        ingredientName: 'Zitronengraspulver',
        quantity: '1',
        unit: 'Priese',
        id: 'a47adfbf-64c2-ac0f-d107-80e99bd972b8',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '2',
        unit: 'TL',
        id: 'e8929ee0-a977-508a-5e9d-6d9eb10eb1ec',
        editMode: false,
      },
    ],
    preparation:
      'Reis dir nach Sorte ca 10 bis 15 Minuten kochen.\nAlle Zutaten schön klein schneiden.\nAlles nach und nach in der Pfanne anbraten.\nGewürze hinzugeben.\nGemüsebrühe dazugeben.\nZum Schluss gequälte Eier dazugeben und aufkochen lassen.',
    id: '4f17f03a-3133-4581-54e7-333515a3c2d5',
    fav: false,
  },
  {
    name: 'Rennfahrersuppe',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Haferflocken',
        quantity: '4',
        unit: 'EL',
        id: 'ef7e8c71-aed4-b219-28a3-81227c24086a',
        editMode: false,
      },
      {
        ingredientName: 'Eier ',
        quantity: '1',
        unit: 'Stk.',
        id: 'da2d02fe-1fbc-9012-c85f-ebd5da105130',
        editMode: false,
      },
      {
        ingredientName: 'Klare Fleischbrühe',
        quantity: '2',
        unit: 'Stk.',
        id: '6c0f41af-d44c-a110-ab3d-18a1d884b66d',
        editMode: false,
      },
      {
        ingredientName: 'Wasser',
        quantity: '1',
        unit: 'l',
        id: '5f6d6286-6b7d-5b96-d474-94a654e45c11',
        editMode: false,
      },
    ],
    preparation:
      'Haferflocken und klare fleischbrühe 15 Minuten kochen lassen zum Ende Ei dazugeben.',
    id: '93c89814-8009-8734-6b00-da6494e5fa47',
  },
  {
    name: 'Rindergulasch',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Rindfleisch',
        quantity: '1',
        unit: 'kg',
        id: '0c1a5fd1-2f5f-f3e0-7392-35e23bd6734e',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '2',
        unit: 'Stk.',
        id: 'b5c2b020-bf7a-1665-c01c-a59b52f2f1de',
        editMode: false,
      },
      {
        ingredientName: 'Paprikamark ',
        quantity: '4',
        unit: 'EL',
        id: 'aa36a9bb-0223-5bef-97e7-42d8550224e3',
        editMode: false,
      },
      {
        ingredientName: 'Paprika',
        quantity: '1',
        unit: 'Stk.',
        id: 'd128f94b-c995-bb5b-aa93-4a5d814aa522',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '2',
        unit: 'Stk.',
        id: '42c9c801-4b60-3f8e-ba0e-3f339e60dd0c',
        editMode: false,
      },
      {
        ingredientName: 'Zucker ',
        quantity: '1',
        unit: 'Priese',
        id: '998facfd-162c-8928-b70e-31589d6076dc',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauchzehen',
        quantity: '4',
        unit: 'Stk.',
        id: '3298f62d-1169-4d62-bafb-82ee7e24d551',
        editMode: false,
      },
      {
        ingredientName: 'Salz Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'aecd4e04-48ba-c14a-1e50-37dc8bcdd412',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'Priese',
        id: '566e9bcf-e32e-9765-b825-51e3c2598d6d',
        editMode: false,
      },
      {
        ingredientName: 'Öl ',
        quantity: '100',
        unit: 'ml',
        id: '2aa650db-f73c-3c0b-8fcb-beb3b85d185d',
        editMode: false,
      },
    ],
    preparation:
      'Fleisch abbrausen trocken würfeln in heißen Öl anbraten.\nSalz Knobi Pfeffer Papierpulver. \nZwiebeln würfeln und mit anbraten Paprikamarkt zufügen \nAlles anschwitzen \n1,5 Liter rinderbrühe dazu\n90 Minuten kochen kleingeschnittene Paprika und Karotten dazu mit 0,5 Liter Rinderbrühe nochmals weiterkochen lassen zum Schluss abschmecken und etwas Zucker dazu.',
    id: '952be5dd-79f6-0924-b6bf-3920bbb436a1',
  },
  {
    name: 'Rosenkohl Hackauflauf',
    ingredients: [
      {
        ingredientName: 'Rosenkohl',
        quantity: '800',
        unit: '',
        id: '1db880e1-742b-76ea-bf78-c9da733dbc09',
        editMode: false,
      },
      {
        ingredientName: 'Kartoffeln',
        quantity: '1.2',
        unit: 'kg',
        id: '1ac433b8-d1a0-33cb-8baf-fe94669b403f',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: '860de0f9-b0f4-8169-accd-e90d2ffd327c',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '2',
        unit: 'Stk.',
        id: '0877af02-0152-3cb0-19f3-8174072c57e4',
        editMode: false,
      },
      {
        ingredientName: 'Hackfleisch',
        quantity: '400',
        unit: '',
        id: '8382e9a3-ee89-b745-e627-c7e1462e6752',
        editMode: false,
      },
      {
        ingredientName: 'Zucker ',
        quantity: '1',
        unit: 'Priese',
        id: 'dfd173ef-7466-f258-3d87-400dd491ae46',
        editMode: false,
      },
      {
        ingredientName: 'Tomaten gestückelt',
        quantity: '1',
        unit: 'Stk.',
        id: 'f8d763e1-01ea-0129-dc9b-b0258cff0562',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '300',
        unit: 'ml',
        id: '6a0d354c-232d-8f16-3659-4808944ddabb',
        editMode: false,
      },
      {
        ingredientName: 'Butter ',
        quantity: '50',
        unit: '',
        id: 'e662436b-ac88-b58a-9dd1-8e6877a392e7',
        editMode: false,
      },
      {
        ingredientName: 'Öl ',
        quantity: '2',
        unit: 'EL',
        id: 'a75a6557-71d8-0bf7-60d3-6fe323e3abaa',
        editMode: false,
      },
      {
        ingredientName: 'Paprika edelsüß',
        quantity: '1',
        unit: 'Priese',
        id: '4156465f-2caf-9d6b-c5f3-e17506ed2df5',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '24daeab0-760f-1d7b-922c-c43a9134713f',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'b33c02d9-9bcb-12f3-e3c0-bf8939185a61',
        editMode: false,
      },
      {
        ingredientName: 'Muskat',
        quantity: '1',
        unit: 'Priese',
        id: 'e48f8dd8-45fa-3a25-5e32-a25c0c38cc5d',
        editMode: false,
      },
      {
        ingredientName: 'Käse gerieben ',
        quantity: '1',
        unit: 'Stk.',
        id: 'd910c03f-1dfc-849b-9d0e-5b0df007606d',
        editMode: false,
      },
    ],
    preparation:
      'Rosenkohl 12 Minuten garen.\nKartoffeln klein schneiden und 25 Minuten garen.\nZwiebeln und Karotten schälen und klein würfeln.\nHack anbraten Zwiebel und Karotten dazugeben.\nMit Salz Pfeffer Paprikapulver und Zucker abschmecken.\nMit Tomaten ablöschen zwei bis drei Minuten kochen Rosenkohl untermengen.\nMilch und Butter erhitzen.\nKartoffel stampfen.\nMilchbutter Salz Pfeffer und Muskat dazu abschmecken.\nKartoffelstampf eingefettete Form geben. Rand mit Püree bestreichen.\nHack-Rosenkohl Mischung verteilen.\nMit Käse bestreuen.\n200 Grad 20 Minuten\n',
    id: 'b3689777-c9b9-e90d-4f94-a61d459934ee',
    fav: false,
  },
  {
    name: 'Spaghetti',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Nudel',
        quantity: 300,
        unit: 'g',
        id: 'dbad8fe5-a581-761f-60b9-1a63144e45aa',
        editMode: false,
      },
      {
        ingredientName: 'Tomatensoße',
        quantity: 1,
        unit: 'Stk.',
        id: 'ed11ec02-e3c1-e3f2-b8a2-13f13bbe360b',
        editMode: false,
      },
      {
        ingredientName: 'Passierte Tomaten',
        quantity: 1,
        unit: 'Stk.',
        id: '92a2aa15-8520-ab83-3416-4cfa8def70c2',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel',
        quantity: '1',
        unit: 'g',
        id: '28106998-e305-bd1e-7b74-5decadd40dbb',
        editMode: false,
      },
    ],
    preparation: 'Zubereitung',
    test: true,
    id: 'f2295e8e-1e44-b79a-75bb-4e829358a7dd',
  },
  {
    name: 'Spundekäse',
    ingredients: [
      {
        ingredientName: 'Frischkäse',
        quantity: '600',
        unit: 'g',
        id: '12478c91-6ea3-708c-7448-641738a7d6d8',
        editMode: false,
      },
      {
        ingredientName: 'Schmand',
        quantity: '1.5',
        unit: 'Stk.',
        id: 'cead9f2c-860f-b060-7dcc-061d9851d7e0',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: '750424ce-8517-9ac4-78b4-64caaef1b873',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver mild ',
        quantity: '1',
        unit: 'EL',
        id: 'a82ba289-a158-fd2b-3ad3-47a474852563',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver scharf',
        quantity: '0.5',
        unit: 'EL',
        id: '5d3bd3c1-4159-9d4a-e6db-d1efcc738e40',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'TL',
        id: '59740d7f-1eb8-e0dd-7d91-e6625ea1b084',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'afa855a5-8755-f9e4-1f2b-f9e55652d622',
        editMode: false,
      },
    ],
    preparation: '',
    id: '8085312d-685b-a312-413c-63446809df6d',
    fav: false,
  },
  {
    name: 'ToGeNu-Pfanne',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Nudel',
        quantity: '300',
        unit: 'g',
        id: '20d5764f-923f-2f5c-0910-1adeaddf46d2',
        editMode: false,
      },
      {
        ingredientName: 'Zucchini',
        quantity: '2',
        unit: 'Stk.',
        id: 'c2792fbd-fff7-c592-b754-827034a35e2f',
        editMode: false,
      },
      {
        ingredientName: 'Kohlrabi',
        quantity: '0.5',
        unit: 'Stk.',
        id: 'b5a46dd7-esasd4-34a4-3272-044ec376d2ef',
        editMode: false,
      },
      {
        ingredientName: 'Karotten',
        quantity: '2',
        unit: 'Stk.',
        id: 'b5a46dd7-e484-3rtg4-3272-044ec376d2ef',
        editMode: false,
      },
      {
        ingredientName: 'Hänchengeschnetzeltes',
        quantity: '400',
        unit: 'g',
        id: 'b5a46dd7-e484-34a4-3hhu2-044ec376d2ef',
        editMode: false,
      },
      {
        ingredientName: 'Tomaten-Kräuter (aldi)',
        quantity: '1',
        unit: 'Stk.',
        id: 'b5a46dd7-e484-34a4-3272-044kko376d2ef',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '30',
        unit: 'ml',
        id: 'b5a46dd7-e484-34a4-3272-fgfg4ec376d2ef',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel',
        quantity: '1',
        unit: 'Stk.',
        id: '007070b6-a9d4-b089-2aec-7fe3dds8fdf6d8',
        editMode: false,
      },
      {
        ingredientName: 'Champions',
        quantity: '3',
        unit: 'Stk.',
        id: '007070b6-a9d4-b089-2aec-7fe3b8fasf6d8',
        editMode: false,
      },
      {
        ingredientName: 'Paprika gelb',
        quantity: '1',
        unit: 'Stk.',
        id: '007070b6-a9d4-b089-2aec-7fezub8fdf6d8',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: '6e377471-ac8f-c912-8811-98de12271825',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: '3ba56ed0-8046-bc47-2141-84276dcec74f',
        editMode: false,
      },
      {
        ingredientName: 'Zucker',
        quantity: '1',
        unit: 'Priese',
        id: '1fdef283-c272-0234-c8cd-a5517f7f91d2',
        editMode: false,
      },
      {
        ingredientName: 'Oregano',
        quantity: '1',
        unit: 'Priese',
        id: '720e28d2-fe67-ca86-8950-14f6c20588e1',
        editMode: false,
      },
      {
        ingredientName: 'Thymian',
        quantity: '1',
        unit: 'Priese',
        id: 'a5374dfd-4068-06a6-b1c5-31170ef00394',
        editMode: false,
      },
      {
        ingredientName: 'Aliolio ',
        quantity: '1',
        unit: 'Priese',
        id: '0082c655-840f-9ac4-2deb-4e64d412885b',
        editMode: false,
      },
      {
        ingredientName: 'Maggi ',
        quantity: '1',
        unit: 'Priese',
        id: '6aef199b-163b-311e-471c-1948c9f19150',
        editMode: false,
      },
      {
        ingredientName: 'Paprikapulver',
        quantity: '1',
        unit: 'Priese',
        id: 'c32d2397-43f4-0500-d405-8fa1fc50239c',
        editMode: false,
      },
    ],
    preparation: '',
    test: true,
    id: 'a3f8b645-a6ca-c482-f9b9-953b6e6a1295',
  },
  {
    name: 'Tortellini',
    fav: true,
    ingredients: [
      {
        ingredientName: 'Tortellini Spinat',
        quantity: '2',
        unit: 'Stk.',
        id: 'fabaf07a-a7d5-27ae-de4f-cae9e3fc6bd2',
        editMode: false,
      },
      {
        ingredientName: 'Schinken ',
        quantity: '100',
        unit: 'g',
        id: '3c564693-10ae-75a9-71c7-4fc8cdf302660',
        editMode: false,
      },
      {
        ingredientName: 'Schmelzkäse ',
        quantity: '200',
        unit: 'g',
        id: '3c564693-10ae-fdfc71c7-4fc8b9302660',
        editMode: false,
      },
      {
        ingredientName: 'Sahne ',
        quantity: '200',
        unit: 'ml',
        id: '3c564693-10ae-75a9-71c7-4fc8dfg302660',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '100',
        unit: 'ml',
        id: 'ae16a3b1-50da-35af-94a1-1955df3c4946',
        editMode: false,
      },
      {
        ingredientName: 'Knoblauch',
        quantity: '2',
        unit: 'Stk.',
        id: 'ae16a3b1-50da-35af-94a1-dds55df3c4946',
        editMode: false,
      },
      {
        ingredientName: 'Chili',
        quantity: '2',
        unit: 'Stk.',
        id: 'ae16a3b1-50da-35grfd1-1955df3c4946',
        editMode: false,
      },
      {
        ingredientName: 'Butter',
        quantity: '1',
        unit: 'EL',
        id: 'ae16a3b1-50da-35af-9tzh-1955df3c4946',
        editMode: false,
      },
      {
        ingredientName: 'Petersilie ',
        quantity: '1',
        unit: 'Stk.',
        id: '3c564693-10ae-75a9-71c7-4fc8b93aa660',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebel ',
        quantity: '1',
        unit: 'Stk.',
        id: '3c564693-10aedfg5a9-71c7-4fc8b9302660',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese',
        id: 'ae16a3b1-50da-35af-9aa1-1955df3c4946',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese',
        id: 'ae16a3b1-50da-35af-94a1-195hjkf3c4946',
        editMode: false,
      },
    ],
    preparation:
      'Tortellini in salzwasser kochen und anschließend abtropfen lassen.\nButter im Topf zerlassen \nSchinkenwürfel anbraten \nZwiebel und Gnocchi hinzugeben \nSahne hinzu und Schmelzkäse einrühren.\nMit Salz Pfeffer Chili und Petersilie abschmecken.\nMilch hinzugeben und aufkochen.',
    id: '35b894c1-363b-b719-e317-4102195e8d3b',
  },
  {
    name: 'Wasserspatzen',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Mehl',
        quantity: '300',
        unit: 'g',
        id: '93285223-b9fb-5c58-8088-da812e13d120',
        editMode: false,
      },
      {
        ingredientName: 'Eier',
        quantity: '4',
        unit: 'Stk.',
        id: '01cc9d0f-defe-ff2b-02f4-ebcd4907531c',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '597cfa6d-4360-5e27-3d7c-56da86d02658',
        editMode: false,
      },
      {
        ingredientName: 'Wasser',
        quantity: '130',
        unit: 'ml',
        id: 'f8ef7ae9-637f-6159-90c6-4f4e10855a31',
        editMode: false,
      },
      {
        ingredientName: 'Kräuter der Provence',
        quantity: '1',
        unit: 'TL',
        id: '71eff149-a2d7-2d16-f1b0-f8c313b44872',
        editMode: false,
      },
    ],
    preparation:
      'Angaben je nach personenzahl multiplizieren.\nNicht wert für zwei Personen 1200 g Teig.\nTeig anrühren und in kochendes Salz Wasser schieben.\n\nWürzen mit Kräuter der Provence von ostmann !\nSpeckwürfel passen sehr gut dazu.',
    id: 'a46211e8-1b33-6ffe-09b7-b02f000ef178',
  },
  {
    name: 'Weltbester Kuchen',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Eier',
        quantity: '4',
        unit: 'Stk.',
        id: '9930eb7d-0eba-c350-31a4-f5abb8f585ca',
        editMode: false,
      },
      {
        ingredientName: 'Butter',
        quantity: '250',
        unit: 'g',
        id: 'ffc5712c-2797-96b5-0b2c-02c88d77a564',
        editMode: false,
      },
      {
        ingredientName: 'Mehl',
        quantity: '250',
        unit: 'g',
        id: '12b28824-469b-92f8-9370-14fcda555521',
        editMode: false,
      },
      {
        ingredientName: 'Zucker',
        quantity: '250',
        unit: 'g',
        id: 'c18819db-a1bc-090e-cf3c-baf5a300ae60',
        editMode: false,
      },
      {
        ingredientName: 'Backpulver',
        quantity: '1',
        unit: 'Stk.',
        id: 'a1b95ebe-f66f-a582-c6f8-d7ff2550e282',
        editMode: false,
      },
      {
        ingredientName: 'Vanillezucker',
        quantity: '1',
        unit: 'Stk.',
        id: '49c9a234-bc04-ed5a-72b4-f2c6cc1e53b6',
        editMode: false,
      },
      {
        ingredientName: 'Zimt',
        quantity: '1',
        unit: 'TL',
        id: 'ed75c73d-07fa-f63d-a69e-0fbd0393d737',
        editMode: false,
      },
      {
        ingredientName: 'Rotwein',
        quantity: '125',
        unit: 'ml',
        id: '0f19c97f-f793-f7de-b071-d87683cc8c28',
        editMode: false,
      },
      {
        ingredientName: 'Schokopuddingpulver',
        quantity: '1',
        unit: 'Stk.',
        id: '82f30034-d6ee-c31f-7567-d8755f6c2329',
        editMode: false,
      },
      {
        ingredientName: 'Schoko Splitter zartbitter',
        quantity: '1',
        unit: 'Stk.',
        id: '0b001b7f-acdc-365f-f7f0-7074f9dcdc92',
        editMode: false,
      },
      {
        ingredientName: 'Kuchenglasur zartbitter',
        quantity: '1',
        unit: 'Stk.',
        id: 'c6b21578-66db-0418-d729-9ce3ce846a34',
        editMode: false,
      },
    ],
    preparation:
      'Alle Zutaten vermengen.\nKuchenform mit Butter und  Paniermehl ausstreichen.\nBackofen auf 175 Grad \nBackzeit 60 Minuten \n\nTipp: \nBackform nicht zu voll \nmaximal 2/3',
    id: 'f08bbec8-4463-a665-24ca-1ca40f51f0a9',
  },
  {
    name: 'Wirsing-Gemüse',
    fav: false,
    ingredients: [
      {
        ingredientName: 'Wirsing',
        quantity: '1',
        unit: 'Stk.',
        id: '7de11347-84a5-9aa8-ca1c-82c0d4f52534',
        editMode: false,
      },
      {
        ingredientName: 'Gemüsebrühe',
        quantity: '750',
        unit: 'ml',
        id: 'ab8697f4-4acf-ba50-51c5-b7b94d90c0c4',
        editMode: false,
      },
      {
        ingredientName: 'Zwiebeln',
        quantity: '1',
        unit: 'Stk.',
        id: '3537e470-a356-3866-c8ab-990c82853091',
        editMode: false,
      },
      {
        ingredientName: 'Milch',
        quantity: '30',
        unit: 'ml',
        id: 'efcafd18-7cff-9897-e55d-46ccd01a00fd',
        editMode: false,
      },
      {
        ingredientName: 'Muskat',
        quantity: '1',
        unit: 'TL-gestr.',
        id: '64b1f858-26fc-9510-e8ff-bcc44a1afa7d',
        editMode: false,
      },
      {
        ingredientName: 'Natron',
        quantity: '1',
        unit: 'Priese.',
        id: '64b1f858-26fc-9510-e8dfrf-bcc44b4afa7d',
        editMode: false,
      },
      {
        ingredientName: 'Salz',
        quantity: '1',
        unit: 'Priese.',
        id: '64b1f858-26fc-9510-e8ff-bcc4xxb4fa7d',
        editMode: false,
      },
      {
        ingredientName: 'Pfeffer',
        quantity: '1',
        unit: 'Priese.',
        id: '64b1f858-26fc-9510-e8ff-bccxsq4afa7d',
        editMode: false,
      },
    ],
    preparation:
      'Zwiebel klein schneiden und im Topf andünsten.\nGestückelten Wirsing in den Topf dazugeben.\nGemüsebrühe darüber und einkochen lassen (eine messerspitze Natron dazu).\nMilch Butter und Muskat dazugeben.\nMit Pfeffer und Salz würzen und pürieren.\n',
    id: '7fcd7c46-20ef-b983-265c-8f7f3748153e',
  },
];
