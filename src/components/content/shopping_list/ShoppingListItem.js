import React, { Fragment } from 'react';
import classes from './ShoppingListItem.module.css';
import ButtonRound from '../../ui/ButtonRound';

const WeeklyPlanItem = props => {
  return (
    <div className={`${classes.itemBox}`}>
      <div
        className={`${classes.itemBox__ingredient} ${classes.itemBox__textBox}`}
      >
        <div
          className={`${classes.itemBox__ingredient_gridBox} ${
            props.checked && classes['itemBox__ingredient--checked']
          }`}
        >
          <p className={classes.itemBox__ingredient_name}>{props.name}</p>
          <p className={classes.itemBox__ingredient_quantity}>
            {props.quantity}{' '}
          </p>
          <p className={classes.itemBox__ingredient_unit}>{props.unit}</p>
        </div>
        <div className={classes.itemBox__ingredient__btnBox}>
          {!props.checked && (
            <ButtonRound
              btnId="check"
              className={`${classes.buttonList} ${classes.buttonRight}`}
              buttonName={'check'}
              buttonSize={'small'}
              color={'#ffffff00'}
              borderColor={'#ffffff00'}
              shadow={'none'}
              iconColor={''}
              isFav={''}
              onClickHandler={() => {
                props.checkButtonHandler(props.id);
              }}
            />
          )}
          {props.checked && (
            <ButtonRound
              btnId="x"
              className={`${classes.buttonList} ${classes.buttonRight}`}
              buttonName={'x'}
              buttonSize={'small'}
              color={'#ffffff00'}
              borderColor={'#ffffff00'}
              shadow={'none'}
              iconColor={''}
              isFav={''}
              onClickHandler={() => {
                props.checkButtonHandler(props.id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanItem;
