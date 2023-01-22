import React, { useReducer, useContext } from 'react';
import DataContext from './data-context';

const DataUpdate = React.createContext(); //export ?

const dataReducer = (state, action) => {
  console.log(state);
  if (action.type === 'INPUT') {
    console.log('Reducer INPUT');
  }
  if (action.type === 'CLEAR') {
    console.log('Clear');
    return (action.inputCurrentValue = defaultInputState);
  }
};
const addRecipe = recipe => {};
const removeRecipe = recipe => {};
const defaultInputState = {
  recipeName: '',
  ingredients: [],
  preparation: '',
};

export function DataProvider(props) {
  //==================================================================
  const data = useContext(DataContext);
  const defaultReducerState = data;
  const [dataState, dispatchDataAction] = useReducer(
    dataReducer,
    defaultReducerState
  );
  //==================================================================
  const dataUpdateFunction = dataUpdate => {
    console.log('dataUpdate', dataUpdate);
  };
  const inputChangeHandler = input => {
    console.log(input);
    dispatchDataAction({ type: 'INPUT', input: input });
  };
  return (
    <DataContext.Provider value={data}>
      {/* <DataUpdate.Provider value={dataUpdateFunction}> */}
      {props.children}
      {/* </DataUpdate.Provider> */}
    </DataContext.Provider>
  );
}

// export default DataProvider;
