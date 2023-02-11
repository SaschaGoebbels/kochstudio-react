import classes from './App.module.css';
import './variables.css';
import React, { useState, useContext, useReducer } from 'react';
import DataProvider, { DataContext } from './components/store/DataProvider';

import InfoBox from './components/ui/InfoBox';
import Login from './components/ui/Login';
import Menu from './components/ui/Menu';
import SettingsPage from './components/ui/SettingsPage';
import Header from './components/header/Header';
import Content from './components/ui/Content';
import ContentSwipe from './components/content/ContentSwipe';
import Footer from './components/ui/Footer';
import Navbar from './components/navbar/Navbar';
import NavbarButton from './components/navbar/NavbarButton';
import Input from './components/input/Input';
import { useSnapshot } from 'valtio';
import { state } from './components/store/state';
import { useEffect } from 'react';

const messageInitialState = {
  hideInfoBox: true,
  title: '',
  message: '',
  showBtnX: true,
  dismiss: '',
  confirm: '',
};
const messageReducer = (state, action) => {
  if (action.type === 'SHOWINFOBOX') {
    //show x btn if not set to false
    const xBtn =
      action.message.showBtnX === undefined || action.message.showBtnX === true
        ? true
        : false;
    return {
      title: action.message.title,
      message: action.message.message,
      showBtnX: xBtn,
      dismiss: action.message.dismiss,
      confirm: action.message.confirm,
      value: action.message.value,
    };
  }
  if (action.type === 'HIDEINFOBOX') {
    return messageInitialState;
  }
};

function App() {
  const dataCtx = useContext(DataContext);
  //==================================================================
  const [menuState, setMenuState] = useState(dataCtx.menuState);
  const changeMenuState = menuStateObj => {
    toggleMenuHide(menuStateObj);
  };
  const toggleMenuHide = menuStateObj => {
    setMenuState(prev => {
      prev.hide = !prev.hide;
      return { ...prev };
    });
  };
  const onMenuClick = btnId => {
    console.log(btnId);
  };
  // header
  const onMenuButtonHandler = btnId => {
    toggleMenuHide();
  };
  //==================================================================
  const settingsInitialValue = {
    show: false,
    headerText: 'Einstellungen',
  };
  const [settingsState, setSettingsState] = useState(settingsInitialValue);
  const onSettingsShowHandler = settings => {
    setSettingsState({ ...settings });
  };
  const onSettingsButtonHandler = btnId => {
    if (settingsState.confirm) {
      settingsState.confirm();
    }
    setSettingsState(settingsInitialValue);
  };
  //==================================================================
  const [hideInput, setHideInput] = useState(true);
  const hideInputCheckPageChangeHeaderText = (navigation, recipe) => {
    setHideInput(true);
    if (navigation === 'delete') {
      state.headerText = 'Gerichte';
      state.navigation = 'btn1';
      return;
    }
    if (recipe.name.length > 0) {
      state.headerText = recipe.name;
      return;
    }
    if (navigation === 'btn1') {
      state.headerText = 'Gerichte';
    }
    if (navigation === 'btn2') {
      state.headerText = 'Wochenplan';
    }
    if (navigation === 'btn3') {
      state.headerText = 'Favoriten';
    }
    if (navigation === 'btn4') {
      state.headerText = 'Einkaufsliste';
    }
  };
  //==================================================================
  const snap = useSnapshot(state);
  //==================================================================

  const recipeListButtonHandler = item => {
    if (item === 'add') {
      setHideInput(false);
      setTimeout(() => {
        state.headerText = 'Neuer Eintrag';
      }, 150);
    }
  };
  //==================================================================
  //infoBox
  const [messageState, dispatchMessage] = useReducer(
    messageReducer,
    messageInitialState
  );
  //==================================================================
  const onSetMessage = message => {
    dispatchMessage({ type: 'SHOWINFOBOX', message });
  };
  const onClickInfoBox = btnId => {
    dispatchMessage({ type: 'HIDEINFOBOX', btnId });
  };
  //==================================================================
  return (
    <DataProvider>
      <div className={classes.App}>
        <Login message={onSetMessage} hide={true} />
        <SettingsPage
          settingsPageShow={settingsState.show}
          headerText={settingsState.headerText}
          content={settingsState.content || ''}
          onArrowButtonHandler={onSettingsButtonHandler}
          hideTrash={true}
        ></SettingsPage>
        <Menu
          menuState={menuState}
          changeMenuState={changeMenuState}
          userData={{
            user: menuState.userData.userName,
            email: 'goebbels.sascha@gmail.com',
          }}
          setMessage={onSetMessage}
          onSettingsShowHandler={onSettingsShowHandler}
          menuClick={onMenuClick}
        ></Menu>
        <InfoBox clickInfoBox={onClickInfoBox} messageState={messageState} />
        <Input
          hideInput={hideInput}
          hideInputCheckPageChangeHeaderText={
            hideInputCheckPageChangeHeaderText
          }
          setMessage={onSetMessage}
          recipeNameId={snap.inputCurrentValue}
        ></Input>
        <Header onMenuButton={onMenuButtonHandler} />
        <Content
          content={
            <ContentSwipe
              message={onSetMessage}
              changePage={snap.navigation}
              recipeListButton={recipeListButtonHandler}
              setHideInput={setHideInput}
              onSettingsShowHandler={onSettingsShowHandler}
              avoidList={false}
            ></ContentSwipe>
          }
        ></Content>

        <Footer
          footerContent={<Navbar iconColor={'#20c997'}></Navbar>}
        ></Footer>
      </div>
    </DataProvider>
  );
}

export default App;
