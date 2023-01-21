import React, { useReducer } from 'react';
import DataContext from './data-context';

const dataReducer = (state, action) => {
  console.log(state);
  if (action.type === 'CLEAR') {
    console.log('Clear');
    return (action.inputCurrentValue = defaultInputState);
  }
};
// const addRecipe = recipe => {};
// const removeRecipe = recipe => {};
const defaultInputState = {
  recipeName: '',
  ingredients: [],
  preparation: '',
};

const DataProvider = props => {
  const DataCtx = useContext(DataContext);
  const [dataState, dispatchData] = useReducer(dataReducer, defaultInputState);

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
