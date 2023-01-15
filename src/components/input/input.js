import React, { useState } from 'react';
import classes from './input.module.css';
import Header from '../header/header';
import Content from '../ui/content';
import InputForm from './inputForm';
import Footer from '../ui/footer';
import ButtonBox from '../ui/buttonBox';

const Input = props => {
  const changeHeaderText = 'Neuer Eintrag';
  let btnState = '';

  const onButtonBoxHandler = item => {
    if (item === 'trash') {
      console.log('trash');
      btnState = item;
    }
    props.onClickInput(item); // pass btn state upwards
  };

  return (
    <div className={classes.input}>
      <Header
        headerText={changeHeaderText}
        // onMenuButton={onMenuButtonHandler}
      />
      <Content
        // className={classes.input__content}
        content={<InputForm btnState={btnState} />}
      ></Content>
      <Footer
        footerContent={<ButtonBox onClickHandler={onButtonBoxHandler} />}
      ></Footer>
    </div>
  );
};

export default Input;
