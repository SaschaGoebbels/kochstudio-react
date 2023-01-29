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
  //==================================================================
  // header
  let testData = 'testName';
  const onMenuButtonHandler = () => {
    console.log('APP-Menu-Button');
  };
  const [headerText, setHeaderText] = useState('Gerichte');
  const headerChangeHandler = headerText => {
    console.log(headerText);
    setHeaderText(headerText);
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
  const [inputHide, setInputHide] = useState(true);
  const recipeListButtonHandler = item => {
    // setHeaderText('TEST');
    console.log(item);
    if (item === 'add') {
      setInputHide(false);
    }
  };
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
            inputHide && classes.app__input_hide
          }`}
          headerText={'data.recipeName' || 'Neuer Eintrag'}
          onClickInput={onButtonInputHandler}
          // onAddNewRecipe={addNewRecipe}BUG
          setMessage={onSetMessage}
          recipeNameId={{ name: 'testname', id: 'testID 123' }}
          // input={inputHandler}
        ></Input>
        <Header headerText={headerText} onMenuButton={onMenuButtonHandler} />
        {/* <Header headerText={'headerText'} onMenuButton={onMenuButtonHandler} /> */}
        <Content
          content={
            <ContentSwipe
              recipeListButton={recipeListButtonHandler}
              headerTextHandler={headerChangeHandler}
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
