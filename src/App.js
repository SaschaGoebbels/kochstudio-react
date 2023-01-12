import classes from './App.module.css';
import React, { useState } from 'react';
import Header from './components/header/header';
import Content from './components/content/content';
import Navbar from './components/navbar/navbar';

function App() {
  const [recipeObj, setRecipeObj] = useState([]);
  const navChangeHandler = el => {
    // console.log(el);
  };
  const onMenuButtonHandler = () => {
    // console.log('APP-Menu-Button');
  };
  const navIconHandler = el => {
    // console.log('app-js', el);
  };
  const onAddRecipeHandler = () => {
    //push
  };
  let changeHeaderText = 'Gerichte';
  return (
    <div className={classes.App}>
      <Header
        headerText={changeHeaderText}
        onMenuButton={onMenuButtonHandler}
      />
      <Content onAddRecipe={onAddRecipeHandler}></Content>
      <Navbar navIcon={navIconHandler} navChange={navChangeHandler}></Navbar>
    </div>
  );
}

export default App;
