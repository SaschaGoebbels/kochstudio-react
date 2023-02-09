import React from 'react';
import { useState } from 'react';
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { state } from '../store/state';
import { useSnapshot } from 'valtio';

const Header = props => {
  const snap = useSnapshot(state);
  const [menuBtn, setMenuBtn] = useState(false);
  const showSearchBtnOnRecipeList = headerText => {
    // if (snap.headerText === 'Gerichte' || snap.headerText === 'Favoriten') {
    if (
      headerText === 'Gerichte' ||
      headerText === 'Favoriten' ||
      snap.weeklyPlan.editMode === true
    ) {
      return true;
    } else return false;
  };
  const onSearchBtnHandler = () => {
    state.searchBarHide = false;
  };
  const onMenuBtnHandler = () => {
    setMenuBtn(current => {
      return !current;
    });
    props.onMenuButton();
  };
  return (
    <div className={classes.header}>
      <div className={classes.header__box}>
        {showSearchBtnOnRecipeList(snap.headerText) && (
          <div
            className={`${classes.header__btn} ${classes['header__btn--search']}`}
            onClick={onSearchBtnHandler}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className={classes.header__burger_menu}
            ></FontAwesomeIcon>
          </div>
        )}
        <div className={classes.header__textBox}>
          <h1 className={classes.header__text}>{snap.headerText}</h1>
        </div>
        <div
          className={`${classes.header__btn} ${classes['header__btn--menu']}`}
          onClick={onMenuBtnHandler}
        >
          <FontAwesomeIcon
            icon={faBars}
            className={classes.header__burger_menu}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className={classes.header__contentSpacer}></div>
    </div>
  );
};

export default Header;
