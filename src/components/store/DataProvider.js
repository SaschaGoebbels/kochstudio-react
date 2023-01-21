import React, { useState, useReducer, useContext } from 'react';
import { useEffect } from 'react';

export const DataContext = React.createContext(null);
const DataUpdate = React.createContext();
export function useDataUpdate() {
  return useContext(DataUpdate);
}

const dataInit = {
  addItem: recipe => {},
  removeItem: recipe => {},
  inputCurrentValue: {
    recipeName: '',
    ingredients: [],
    preparation: '',
  },
  recipeList: [
    {
      name: 'Arme Ritter',
      fav: false,
      ingredients: [
        ['Mehl', '300', 'g'],
        ['Eier', '5', 'Stk.'],
        ['Milch', '300', 'ml'],
        ['Toastbrot ', '0.5', 'Stk.'],
        ['Salz', '1', 'TL-gestr.'],
      ],
    },
  ],
};

const defaultInputState = {
  recipeName: '',
  ingredients: [],
  preparation: '',
};
//==================================================================
const dataReducer = (state, action) => {
  if (action.type === 'INPUT') {
    // console.log(state.recipeList);
    state.recipeList.push(action.recipeInput);
    return state;
  }
  return state;
};
//==================================================================

const DataProvider = props => {
  const [dataState, dispatchData] = useReducer(dataReducer, dataInit);
  //==================================================================
  // useEffect(() => {
  const dataUpdateFunction = dataUpdate => {
    if (dataUpdate.type === 'INPUT') {
      dispatchData(dataUpdate);
    }
    console.log('dataUpdate', dataUpdate);
  };
  // }, []);
  //==================================================================
  //==================================================================
  return (
    <DataContext.Provider value={dataState}>
      <DataUpdate.Provider value={dataUpdateFunction}>
        {props.children}
      </DataUpdate.Provider>
    </DataContext.Provider>
  );
};

export default DataProvider;
