import React, { Fragment } from 'react';
import classes from './ShoppingListItem.module.css';
import ButtonRound from '../../ui/ButtonRound';

const WeeklyPlanItem = props => {
  return (
    <div className={`${classes.itemBox}`}>
      <div
        className={`${classes.itemBox__ingredient} ${classes.itemBox__textBox}`}
      >
        <div className={classes.itemBox__ingredient_gridBox}>
          <p className={classes.itemBox__ingredient_name}>{props.name}</p>
          <p className={classes.itemBox__ingredient_quantity}>
            {props.quantity}{' '}
          </p>
          <p className={classes.itemBox__ingredient_unit}>{props.unit}</p>
        </div>
        <div className={classes.itemBox__ingredient__btnBox}>
          {!props.checkButtonHide && (
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
          {props.trashButtonHide && (
            <ButtonRound
              btnId="trash"
              className={`${classes.buttonList} ${classes.buttonRight}`}
              buttonName={'trash'}
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
