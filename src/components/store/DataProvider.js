import React, { useState, useReducer, useContext } from 'react';
import DataContext from './data-context';

const DataUpdate = React.createContext(); //export ?

const contextInitialState = {
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
const inputInitialState = { recipeName: '', preparation: '' };

const DataProvider = props => {
  // const [inputState, setInputState] = useState(inputInitialState);
  const [dataState, setDataState] = useState(contextInitialState);
  //==================================================================
  const data = useContext(DataContext);

  //==================================================================
  const dataUpdateFunction = dataUpdate => {
    console.log('dataUpdate', dataUpdate);
  };
  const inputChangeHandler = input => {
    console.log(input);
  };
  return (
    <DataContext.Provider value={{ dataState, setDataState }}>
      <DataUpdate.Provider value={dataUpdateFunction}>
        {props.children}
      </DataUpdate.Provider>
    </DataContext.Provider>
  );
};

export default DataProvider;
