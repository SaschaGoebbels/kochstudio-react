import classes from './App.module.css';
import './variables.css';
import React, { useState, useContext, useReducer } from 'react';
import DataProvider from './components/store/DataProvider';

import InfoBox from './components/ui/InfoBox';
import Login from './components/ui/Login';
import Header from './components/header/Header';
import Content from './components/ui/Content';
import ContentSwipe from './components/content/ContentSwipe';
import Footer from './components/ui/Footer';
import Navbar from './components/navbar/Navbar';
import NavbarButton from './components/navbar/NavbarButton';
import Input from './components/input/Input';
import NavbarContext from './components/store/navbar-context';
import { useSnapshot } from 'valtio';
import { state } from './components/store/state';

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
  const navbarCtx = useContext(NavbarContext);
  const snap = useSnapshot(state);
  //==================================================================
  // header
  const onMenuButtonHandler = () => {
    console.log('APP-Menu-Button');
  };

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
  // const [inputHide, setInputHide] = useState(true);
  const recipeListButtonHandler = item => {
    // setHeaderText('TEST');
    console.log(item);
    if (item === 'add') {
      state.inputPageHide = false;
      setTimeout(() => {
        state.headerText = 'Neuer Eintrag';
      }, 150);
    }
  };
  //==================================================================
  // input button
  const onButtonInputHandler = btnId => {
    if (btnId === 'check') {
      // update Recipe
    }
    if (btnId === 'x') {
      // reset currentValue
    }
    state.inputPageHide = true;
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
    dispatchMessage({ type: 'HIDEINFOBOX', btnId });
  };
  //==================================================================
  return (
    <DataProvider>
      <div className={classes.App}>
        <Login message={onSetMessage} hide={true} />
        <InfoBox clickInfoBox={onClickInfoBox} messageState={messageState} />
        <Input
          className={`${classes.app__input} ${
            snap.inputPageHide && classes.app__input_hide
          }`}
          headerText={'data.recipeName' || 'Neuer Eintrag'}
          onClickInput={onButtonInputHandler}
          // onAddNewRecipe={addNewRecipe}BUG
          setMessage={onSetMessage}
          recipeNameId={{ name: 'testname', id: 'testID 123' }}
        ></Input>
        <Header onMenuButton={onMenuButtonHandler} />
        <Content
          content={
            <ContentSwipe
              recipeListButton={recipeListButtonHandler}
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
