import React, { useState, useReducer, useContext, useEffect } from 'react';
import classes from './SettingsPage.module.css';
import Header from '../header/Header';
import Content from '../ui/Content';
import Footer from '../ui/Footer';
import ButtonBox from '../ui/ButtonBox';

const SettingsPage = props => {
  const settingsPageShow = props.settingsPageShow || false;
  //==================================================================
  const onButtonBoxHandler = item => {
    props.onArrowButtonHandler(item);
  };
  //==================================================================
  return (
    <div
      className={`${classes.settingsPage} ${
        !settingsPageShow && classes['settingPage--hide']
      }`}
    >
      <Header
        arrowBtn={'arrowBtn'}
        onMenuButton={props.onArrowButtonHandler}
        headerText={props.headerText}
        hideSearch={true}
      />
      <Content content={props.content}></Content>
      <Footer
        footerContent={
          !props.hideButtonBox && (
            <ButtonBox
              onClickHandler={onButtonBoxHandler}
              hideTrash={props.hideTrash}
              hideXBtn={props.hideXBtn}
            />
          )
        }
      ></Footer>
    </div>
  );
};

export default SettingsPage;
