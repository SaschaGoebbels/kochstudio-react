import React, { useContext } from 'react';
import classes from './RecipeListBox.module.css';

const RecipeListBox = props => {
  const listItemCheckedWeeklyPlan = props.weeklyPlan ? '#fff' : '';
  return (
    <div className={classes.contentListBox}>
      <ul className={classes.contentListBox__ul}>
        {props.recipeList
          .filter(el => {
            if (props.showFavList === false) return el;
            if (el.fav === true) return el;
          })
          .filter(el => {
            if (props.searchInput === '') return el;
            const name = el.name;
            if (name.toLowerCase().includes(props.searchInput)) return el;
          })
          .map(item => (
            <li
              style={{ backgroundColor: listItemCheckedWeeklyPlan }}
              key={item.id}
              className={classes.contentListBox__item}
              onClick={() => props.listClickHandler(item)}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecipeListBox;
