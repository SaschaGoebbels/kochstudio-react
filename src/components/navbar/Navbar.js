import React, { useState, useContext } from 'react';
import classes from './Navbar.module.css';
import NavbarButton from './NavbarButton';
import { state } from '../store/state';
import { useSnapshot } from 'valtio';

const Navbar = props => {
  // const navbarCtx = useContext(NavbarContext);
  const snap = useSnapshot(state);
  let iconColor = props.iconColor;
  const currentIcon = '#fa8719';
  const [btnNav, setBtnNav] = useState('btn1');

  const navChangeFunction = btnId => {
    if (btnId === 'btn1') {
      state.headerText = 'Rezepte';
    }
    if (btnId === 'btn2') {
      state.headerText = 'Wochenplan';
    }
    if (btnId === 'btn3') {
      state.headerText = 'Favoriten';
    }
    if (btnId === 'btn4') {
      state.headerText = 'Einkaufsliste';
    }
    state.searchBarHide = true;
    state.currentRecipe = snap.initialState;
    state.navigation = btnId;
    state.recipePageHide = true;
    setBtnNav(btnId);
  };
  return (
    <div className={classes.navbar}>
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn1"
        className={''}
        buttonName={'home'}
        color={''}
        iconColor={`${btnNav === 'btn1' ? currentIcon : iconColor}`}
        // currentIcon={`${btnNav === 'btn1' ? true : false}`}
        currentIcon={`${btnNav === 'btn1' ? 'classes.current_icon' : ''}`}
        name="Rezepte"
      />
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn2"
        className={''}
        buttonName={'plan'}
        color={''}
        iconColor={`${btnNav === 'btn2' ? currentIcon : iconColor}`}
        currentIcon={'classes.current_icon'}
        name="Wochenplan"
      />
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn3"
        className={''}
        buttonName={'fav'}
        color={''}
        iconColor={`${btnNav === 'btn3' ? currentIcon : iconColor}`}
        // currentIcon={`${btnNav === 'btn2' ? true : false}`}
        name="Favoriten"
      />
      <NavbarButton
        onClickHandler={navChangeFunction}
        btnId="btn4"
        className={''}
        buttonName={'shop'}
        color={''}
        iconColor={`${btnNav === 'btn4' ? currentIcon : iconColor}`}
        // currentIcon={`${btnNav === 'btn2' ? true : false}`}
        name="Einkaufsliste"
      />
    </div>
  );
};

export default Navbar;
