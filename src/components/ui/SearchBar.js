import React from 'react';
import classes from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <div className={classes.searchBar}>
      <div className={classes.searchBar__box}>
        <div className={classes.searchBar__btnBox}>
          <FontAwesomeIcon
            icon={faXmark}
            className={classes.serachBar__xBtn}
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
