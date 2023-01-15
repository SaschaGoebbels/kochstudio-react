import React, { useState } from 'react';
import classes from './input.module.css';
import Header from '../header/header';
import Content from '../ui/content';
import Footer from '../ui/footer';
import ButtonBox from '../ui/button_box';

const Input = props => {
  const changeHeaderText = 'Neuer Eintrag';
  return (
    <div className={classes.input}>
      <Header
        headerText={changeHeaderText}
        // onMenuButton={onMenuButtonHandler}
      />
      <Content content={<form className="input"></form>}></Content>
      <Footer footerContent={<ButtonBox />}></Footer>
    </div>
  );
};

export default Input;
