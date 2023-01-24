import classes from './App.module.css';
import './variables.css';
import React, { useState, useContext, useReducer } from 'react';
import DataProvider from './components/store/DataProvider';

import InfoBox from './components/ui/InfoBox';
import Header from './components/header/Header';
import Content from './components/ui/Content';
import ContentSwipe from './components/content/ContentSwipe';
import Footer from './components/ui/Footer';
import Navbar from './components/navbar/Navbar';
import NavbarButton from './components/navbar/NavbarButton';
import Input from './components/input/Input';
import NavbarContext from './components/store/navbar-context';

const messageInitialState = {
  title: '',
  message: '',
  showBtnX: true,
  hideInfoBox: true,
  recipeName: '',
  recipeId: '',
  delete: false,
};
const messageReducer = (state, action) => {
  if (action.type === 'SHOWINFOBOX') {
    return {
      title: action.message.title,
      message: action.message.message,
      showBtnX: action.message.showBtnX,
      recipeName: action.message.recipeName,
      recipeId: action.message.recipeId,
      delete: action.message.delete,
    };
  }
  if (action.type === 'HIDEINFOBOX') {
    return messageInitialState;
  }
};

function App() {
  const navbarCtx = useContext(NavbarContext);
  // header
  let testData = 'testName';
  const onMenuButtonHandler = () => {
    console.log('APP-Menu-Button');
  };
  let changeHeaderText = 'Gerichte';
  //==================================================================
  // content
  // const [recipeObj, setRecipeObj] = useState(recipe_obj);
  // const addNewRecipe = newRecipe => {
  //   ////////////////// FIXME //////////////////
  //   setRecipeObj(prev => {
  //     const newArr = prev.recipe_list.push(newRecipe);
  //     return newArr;
  //   });
  // };
  const [inputHide, setInputHide] = useState(true);
  const recipeListButtonHandler = item => {
    if (item === 'add') {
      setInputHide(false);
    }
  };
  const [recipePageHide, setRecipePageHide] = useState(true);
  //==================================================================
  // input button
  const onButtonInputHandler = btnId => {
    if (btnId === 'check') {
      setInputHide(true);
    }
    if (btnId === 'x') {
      setInputHide(true);
    }
  };

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
    console.log(messageState);
    if (messageState.delete) {
      console.log(messageState.recipeName);
    }
    if (btnId === 'check') {
      console.log('Check');
    }
    if (btnId === 'x') {
      console.log('x');
    }
    dispatchMessage({ type: 'HIDEINFOBOX', btnId });
  };
  //==================================================================
  // // input data
  // const inputHandler = input => {
  //   console.log('APP', input);
  // };
  return (
    <DataProvider>
      <div className={classes.App}>
        <InfoBox
          title={messageState.title}
          message={messageState.message}
          hide={messageState.hideInfoBox}
          showXBtn={messageState.showBtnX}
          clickInfoBox={onClickInfoBox}
        />
        <Input
          className={`${classes.app__input} ${
            inputHide && classes.app__input_hide
          }`}
          headerText={'data.recipeName' || 'Neuer Eintrag'}
          onClickInput={onButtonInputHandler}
          // onAddNewRecipe={addNewRecipe}BUG
          setMessage={onSetMessage}
          recipeName={'TestName_APP'}
          // input={inputHandler}
        ></Input>
        <Header
          headerText={changeHeaderText}
          onMenuButton={onMenuButtonHandler}
        />
        <Content
          content={
            <ContentSwipe
              // recipe_obj={recipe_obj}
              recipeListButton={recipeListButtonHandler}
              // recipePageHide={onNavbarClickRecipePageHide}
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
