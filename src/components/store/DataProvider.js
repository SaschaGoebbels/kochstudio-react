import React, { useReducer } from 'react';
import DataContext from './data-context';

const DataProvider = props => {
  const addRecipe = recipe => {};
  const removeRecipe = recipe => {};
  const dataContext = {
    inputCurrentValue: {},
    addItem: addRecipe,
    removeItem: removeRecipe,
    recipeList: props.recipeList,
    shoppingList: '',
    weeklyPlan: '',
  };
  // const ingredients ={}
  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
