import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import classes from './RecipeListBox.module.css';
import DataProvider, { DataContext } from '../../store/DataProvider';

const RecipeListBox = props => {
  const dataCtx = useContext(DataContext);
  const [currentRecipeList, setCurrentRecipeList] = useState(
    dataCtx.recipeList
  );
  const listClickHandler = itemId => {
    // BUG
    if (props.weeklyPlan === true) {
      setCurrentRecipeList(prev => {
        prev.map(el => {
          if (el.id === itemId) {
            console.log(el);

            // el.weeklyPlan = !el.weeklyPlan;
            return el;
          }
          return el;
        });
      });
      console.log(currentRecipeList);
      return;
    }
    props.listClickHandler(itemId);
  };

  return (
    <div
      className={classes.contentListBox}
      // setCurrentRecipeList={update => setCurrentRecipeList(update)}
    >
      <ul className={classes.contentListBox__ul}>
        {currentRecipeList
          .filter(el => {
            if (props.showFavList === false) return el;
            if (el.fav === true) return el;
          })
          .filter(el => {
            if (props.searchInput === '') return el;
            const name = el.name;
            if (name.toLowerCase().includes(props.searchInput)) return el;
          })
          .map(item => {
            if (item.weeklyPlan) {
              return (
                <li
                  style={{
                    backgroundColor: '#fff',
                  }}
                  key={item.id}
                  className={classes.contentListBox__item}
                  onClick={() => listClickHandler(item.id)}
                >
                  {item.name}
                </li>
              );
            } else {
              return (
                <li
                  style={{
                    backgroundColor: '',
                  }}
                  key={item.id}
                  className={classes.contentListBox__item}
                  onClick={() => listClickHandler(item.id)}
                >
                  {item.name}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default RecipeListBox;
