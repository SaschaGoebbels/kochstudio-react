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
import Input from './components/input/Input';
import { useSnapshot } from 'valtio';
import { state } from './components/store/state';
import Loading from './utils/Loading';
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

const menuStateInit = {
  userData: {
    loggedIn: false,
    hideLogin: false,
    name: '',
    email: '',
  },
  hide: true,
  shoppingListSettings: { avoidList: 'Salz ,Pfeffer ,Chili ' },
};

function App() {
  const dataCtx = useContext(DataContext);
  //==================================================================

  //==================================================================
  const [menuState, setMenuState] = useState(
    dataCtx.menuState || menuStateInit
  );
  const onLoginHandler = userData => {
    setMenuState(userData);
    toggleMenuHide();
  };
  const changeMenuState = menuStateObj => {
    toggleMenuHide(menuStateObj);
  };
  const toggleMenuHide = menuStateObj => {
    setMenuState(prev => {
      prev.hide = !prev.hide;
      return { ...prev };
    });
  };
  const onMenuElementClick = btnId => {
    // console.log(btnId);
  };
  // header
  const onMenuButtonHandler = btnId => {
    toggleMenuHide();
  };
  //Login
  const toggleLoginHide = input => {
    setMenuState(prev => {
      if (input === undefined) {
        prev.userData.hideLogin = !prev.userData.hideLogin;
        return prev;
      }
      prev.userData.hideLogin = input;
      return prev;
    });
  };
  //==================================================================
  const settingsInitialValue = {
    show: false,
    headerText: 'Einstellungen',
  };
  const [settingsState, setSettingsState] = useState(settingsInitialValue);
  const onSettingsShowHandler = settings => {
    if (!menuState.hide) toggleMenuHide();
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
      state.headerText = 'Rezepte';
      state.navigation = 'btn1';
      return;
    }
    if (recipe.name.length > 0) {
      state.headerText = recipe.name;
      return;
    }
    if (navigation === 'btn1') {
      state.headerText = 'Rezepte';
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

  const recipeListButtonHandler = btnId => {
    if (btnId === 'add') {
      setHideInput(false);
      setTimeout(() => {
        state.headerText = 'Neuer Eintrag';
      }, 150);
    }
    if (btnId === 'coin') {
      if (dataCtx.recipeList.length === 0 || dataCtx.recipeList === undefined) {
        onSetMessage({
          title: `Zufallsgenerator`,
          message:
            'Keine Daten gefunden ! \n \n Erst eine Rezeptliste anlegen !',
          showBtnX: false,
        });
        return;
      }
      const recipeList = dataCtx.recipeList;
      const favList = recipeList.filter(el => el.fav === true);
      if (snap.navigation === 'btn1')
        coincidenceRecipe(snap.currentRecipe, recipeList);
      if (snap.navigation === 'btn3')
        coincidenceRecipe(snap.currentRecipe, favList);
    }
  };
  //==================================================================
  const [flipState, setFlipState] = useState(false);
  const coincidenceRecipe = (currentRecipe, recipeList) => {
    const randomRecipe =
      recipeList[randomNumberOfArrayLength(recipeList.length)];
    state.currentRecipe = randomRecipe;
    setFlipState(true);
    setTimeout(() => {
      setFlipState(false);
    }, 700);
    // if recipe is same callback random
    if (currentRecipe.name === randomRecipe.name) {
      coincidenceRecipe(currentRecipe, recipeList);
      return;
    }
    // delay for transition
    setTimeout(() => {
      state.recipePageHide = false;
      state.headerText = randomRecipe.name;
    }, 100);
  };
  const randomNumberOfArrayLength = arrayLength => {
    return Math.trunc(Math.random() * arrayLength);
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
  //////////////////////////////////////////////////////////////////////////////////
  // // // Swipe Event = Touchmove
  //////////////////////////////////////////////////////////////////////////////////
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;
  const onTouchStart = e => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      if (snap.recipePageHide) {
        menuGoRight();
        return;
      }
      swipeRecipePage(
        dataCtx.recipeList,
        snap.navigation,
        snap.currentRecipe,
        'goRight'
      );
    }
    if (isRightSwipe) {
      if (snap.recipePageHide) {
        menuGoLeft();
        return;
      }
      swipeRecipePage(
        dataCtx.recipeList,
        snap.navigation,
        snap.currentRecipe,
        'goLeft'
      );
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  // // // Swipe switch Pages
  //////////////////////////////////////////////////////////////////////////////////
  const [bounceEffect, setBounceEffect] = useState(false);
  const [swipeMoveRecipePage, setSwipeMoveRecipePage] = useState({});

  const swipeRecipePage = (recipeList, fav, currentRecipe, direction) => {
    if (!snap.recipePageHide && !snap.recipeEdit) {
      // // // swipeMoveRecipePage goes via props to recipePage and toggles moving
      setSwipeMoveRecipePage({ currentRecipe, direction });
      const favList = recipeList.filter(el => el.fav === true);
      const list = fav === 'btn3' ? favList : recipeList;
      const index = list.findIndex(el => el.id === currentRecipe.id);
      if (index + 1 === list.length) setBounceEffect({ right: true });
      if (index === 0) setBounceEffect({ left: true });
      setTimeout(() => {
        setBounceEffect({ left: false, right: false });
        return;
      }, 400);
      if (bounceEffect.left === false && bounceEffect.right === false) {
        if (direction === 'goRight') {
          const i = index + 1 === list.length ? index : index + 1;
          changeCurrentRecipeAndHeader(list[i]);
        }
        if (direction === 'goLeft') {
          const i = index === 0 ? index : index - 1;
          changeCurrentRecipeAndHeader(list[i]);
        }
      }
    }
  };
  const changeCurrentRecipeAndHeader = recipe => {
    state.headerText = recipe.name;
    state.currentRecipe = recipe;
  };

  const menuGoRight = () => {
    if (snap.recipePageHide && !snap.recipeEdit) {
      let page;
      if (snap.navigation === 'btn1') {
        page = 'btn2';
      }
      if (snap.navigation === 'btn2') {
        page = 'btn3';
      }
      if (snap.navigation === 'btn3') {
        page = 'btn4';
      }
      if (page === undefined) {
        setBounceEffect({ right: true });
        setTimeout(() => {
          setBounceEffect({ left: false, right: false });
          return;
        }, 400);
        return;
      }
      state.navigation = page;
      changeHeaderIfSwipe(page);
    }
  };

  const menuGoLeft = () => {
    if (snap.recipePageHide && !snap.recipeEdit) {
      let page;
      if (snap.navigation === 'btn2') {
        page = 'btn1';
      }
      if (snap.navigation === 'btn3') {
        page = 'btn2';
      }
      if (snap.navigation === 'btn4') {
        page = 'btn3';
      }
      if (page === undefined) {
        setBounceEffect({ left: true });
        setTimeout(() => {
          setBounceEffect({ left: false, right: false });
          return;
        }, 400);
        return;
      }
      state.navigation = page;
      changeHeaderIfSwipe(page);
    }
  };
  const changeHeaderIfSwipe = page => {
    switch (page) {
      default:
        state.headerText = 'Rezepte';
        break;
      case 'btn1':
        state.headerText = 'Rezepte';
        break;
      case 'btn2':
        state.headerText = 'Wochenplan';
        break;
      case 'btn3':
        state.headerText = 'Favoriten';
        break;
      case 'btn4':
        state.headerText = 'Einkaufsliste';
        break;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  return (
    <DataProvider>
      <div
        className={`${classes.App} ${classes.background} `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`${flipState && classes.fadeIn} ${
            bounceEffect.right && classes.bounce
          } ${bounceEffect.left && classes.bounceLeft}`}
        >
          <Loading></Loading>
          <Login
            message={onSetMessage}
            onLoginHandler={onLoginHandler}
            hide={menuState.userData.hideLogin}
            toggleLoginHide={toggleLoginHide}
          />
          <SettingsPage
            settingsPageShow={settingsState.show}
            headerText={settingsState.headerText}
            content={settingsState.content || ''}
            onArrowButtonHandler={onSettingsButtonHandler}
            hideTrash={true}
            hideXBtn={settingsState.hideXBtn || false}
            hideButtonBox={settingsState.hideButtonBox || false}
          ></SettingsPage>
          <Menu
            menuState={menuState}
            changeMenuState={changeMenuState}
            userData={{
              user: menuState.userData.name || '',
              email: menuState.userData.email || '',
            }}
            setMessage={onSetMessage}
            onSettingsShowHandler={onSettingsShowHandler}
            closeSettingsPage={onSettingsButtonHandler}
            menuClick={onMenuElementClick}
            onLoginHandler={onLoginHandler}
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
                swipeMoveRecipePage={swipeMoveRecipePage}
              ></ContentSwipe>
            }
          ></Content>

          <Footer
            footerContent={
              <Navbar
                iconColor={'#20c997'}
                setNavigation={snap.navigation}
              ></Navbar>
            }
          ></Footer>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
