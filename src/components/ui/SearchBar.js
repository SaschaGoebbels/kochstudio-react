import React, { useState } from 'react';
import classes from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import InputField from '../input/InputField';
import { useSnapshot } from 'valtio';
import { state } from '../store/state';

const SearchBar = props => {
  const snap = useSnapshot(state);
  const onXHandler = () => {
    state.searchBarHide = true;
  };
  return (
    <div
      className={`${classes.searchBar} ${
        snap.searchBarHide && classes['searchBar--hide']
      }`}
    >
      <div className={classes.searchBar__btnBox} onClick={onXHandler}>
        <FontAwesomeIcon
          icon={faXmark}
          className={classes.searchBar__xBtn}
        ></FontAwesomeIcon>
      </div>
      <div className={classes.searchBar__box}>
        <InputField
          label={true}
          labelText={'Gericht suchen:'}
          properties={{ htmlFor: '' }}
          className={classes.searchBar__label}
        ></InputField>
        <InputField
          input={true}
          properties={{
            type: 'text',
            id: 'recipeName',
            autoComplete: 'off',
            onChange: props.inputChangeHandler,
            value: props.searchInput || '',
          }}
        ></InputField>
      </div>
    </div>
  );
};

export default SearchBar;
