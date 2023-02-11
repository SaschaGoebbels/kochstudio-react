import React from 'react';
import classes from './Header.module.css';
import { useState } from 'react';
import { state } from '../store/state';
import { useSnapshot } from 'valtio';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Header = props => {
  const snap = useSnapshot(state);
  const menuBtnOrArrowId = props.arrowBtn || 'menuBtn';
  // const [menuBtn, setMenuBtn] = useState(false);
  const showSearchBtnOnRecipeList = headerText => {
    if (
      headerText === 'Rezepte' ||
      headerText === 'Favoriten' ||
      snap.weeklyPlan.editMode === true ||
      snap.listEditHide === false
    ) {
      return true;
    } else return false;
  };
  const onSearchBtnHandler = () => {
    state.searchBarHide = false;
  };
  const onMenuBtnHandler = () => {
    // setMenuBtn(current => {
    //   return !current;
    // });
    props.onMenuButton(menuBtnOrArrowId);
  };
  return (
    <div className={classes.header}>
      <div className={classes.header__box}>
        {showSearchBtnOnRecipeList(snap.headerText) && !props.hideSearch && (
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
          <h1 className={classes.header__text}>
            {props.headerText || snap.headerText}
          </h1>
        </div>
        <div
          className={`${classes.header__btn} ${classes['header__btn--menu']}`}
          onClick={onMenuBtnHandler}
        >
          {menuBtnOrArrowId === 'menuBtn' ? (
            <FontAwesomeIcon
              icon={faBars}
              className={classes.header__burger_menu}
            ></FontAwesomeIcon>
          ) : (
            ''
          )}
          {menuBtnOrArrowId === 'arrowBtn' ? (
            <FontAwesomeIcon
              icon={faArrowRight}
              className={classes.header__burger_menu}
            ></FontAwesomeIcon>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={classes.header__contentSpacer}></div>
    </div>
  );
};

export default Header;
