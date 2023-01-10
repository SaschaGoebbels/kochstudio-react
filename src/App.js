import './App.css';
import React, { useState } from 'react';
import Header from './components/header/header';
import Content from './components/content/content';
import Navbar from './components/navbar/navbar';

function App() {
  const [recipeObj, setRecipeObj] = useState([]);
  const navChangeHandler = el => {
    // el('btn2');
    // console.log(el);
    // console.log('Change OK');
  };
  const onMenuButtonHandler = () => {
    console.log('APP-JS');
  };
  const onAppHandler = () => {
    // console.log('OK App');
  };
  const navIconHandler = el => {
    console.log('app-js', el);
  };
  const onAddRecipeHandler = () => {
    //push
  };
  return (
    <div className="App" onClick={onAppHandler}>
      <Header onMenuButton={onMenuButtonHandler} />
      <Content onAddRecipe={onAddRecipeHandler}></Content>
      <Navbar navIcon={navIconHandler} navChange={navChangeHandler}></Navbar>
    </div>
  );
}

export default App;
