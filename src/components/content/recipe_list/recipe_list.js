import React, { useState } from 'react';
import uuid from 'react-uuid';
import ButtonRound from '../../ui/buttonRound';
import classes from './recipe_list.module.css';

const Recipe_list = props => {
  const test_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [updateList, setUpdateList] = useState(test_arr);
  const listClickHandler = id => {
    console.log(id.target.id);
    console.log(props.recipe_obj.recipe_list);
    console.log(uuid());
  };
  return (
    <div className={classes.contentListBox}>
      {/* <!--content__menulist--> */}
      <ul className={classes.contentListBox__ul}>
        {test_arr.map(item => (
          <li
            className={classes.contentListBox__item}
            onClick={listClickHandler}
            id={item}
          >
            Test {item}
          </li>
        ))}

        {/* {props.recipe_obj.recipe_list.map(item => {
          <li className={classes.contentListBox__item} id={item.itemId}></li>;
        })} */}
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
