import React, { Fragment } from 'react';
import classes from './WeeklyPlanItem.module.css';
import ButtonRound from '../../ui/ButtonRound';

const WeeklyPlanItem = props => {
  return (
    <div className={`${classes.itemBox}`}>
      <div className={`${classes.itemBox__day} ${classes.itemBox__textBox}`}>
        {props.day}
        <div className={classes.itemBox__day__btnBox}>
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
        </div>
      </div>
      <div className={`${classes.itemBox__recipe} ${classes.itemBox__textBox}`}>
        {props.recipe}
      </div>
    </div>
  );
};

export default WeeklyPlanItem;
