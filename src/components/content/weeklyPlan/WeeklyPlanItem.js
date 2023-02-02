import React, { Fragment } from 'react';
import classes from './WeeklyPlanItem.module.css';

const WeeklyPlanItem = props => {
  return (
    <div className={`${classes.itemBox}`}>
      <div className={`${classes.itemBox__day} ${classes.itemBox__textBox}`}>
        {props.day}
      </div>
      <div className={`${classes.itemBox__recipe} ${classes.itemBox__textBox}`}>
        {props.recipe}
      </div>
    </div>
  );
};

export default WeeklyPlanItem;
