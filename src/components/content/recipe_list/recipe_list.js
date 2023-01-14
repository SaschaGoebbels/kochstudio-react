import React, { useState } from 'react';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/buttonRound';
import classes from './recipe_list.module.css';

const Recipe_list = props => {
  const test_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [updateList, setUpdateList] = useState(test_arr);
  const listClickHandler = item => {
    console.log(item);
  };
  return (
    <div className={classes.contentListBox}>
      <ul className={classes.contentListBox__ul}>
        {props.recipe_obj.recipe_list.map(item => (
          <li
            key={item.id}
            className={classes.contentListBox__item}
            onClick={() => listClickHandler([item.name, item.id])}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <ButtonRound
        btnId="add"
        className={classes.buttonAddEdit}
        buttonName={'add'}
        color={''}
        iconColor={''}
        isFav={''}
      />
      <ButtonRound
        btnId="coin"
        className={classes.buttonCoincidence}
        buttonName={'coin'}
        color={''}
        iconColor={''}
        isFav={''}
      />
      {/* example buttons */}
      {/* <ButtonRound buttonName={'check'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'star'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'x'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'pen'} color={''} iconColor={''} /> */}
      {/* <ButtonRound buttonName={'trash'} color={''} iconColor={''} /> */}
    </div>
  );
};
export default Recipe_list;
