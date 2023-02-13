import React, { useState, useReducer, useContext } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { state } from '../store/state';
import { snapshot, useSnapshot } from 'valtio';
import LocalStorage from './LocalStorage';

export const UPDATERECIPE = 'UPDATERECIPE';

export const DataContext = React.createContext(null);
const DataUpdate = React.createContext();
export function useDataUpdate() {
  return useContext(DataUpdate);
}
//==================================================================
const updateLocalStorage = data => {
  localStorage.setItem('localData', JSON.stringify(data));
};
//==================================================================
const dataReducer = (stateReducer, action) => {
  // // input new recipe
  if (action.type === 'INPUT') {
    stateReducer.recipeList = [
      ...stateReducer.recipeList,
      action.dataUpdate.recipeInput,
    ];
    sortArray(stateReducer.recipeList);
    updateLocalStorage(stateReducer);
    return stateReducer;
  }
  //==================================================================
  // // on change recipe - update existing by replacing recipe
  if (action.type === UPDATERECIPE) {
    // replace existing recipe with updated version
    if (action.dataUpdate.updateExisting) {
      onRecipeListChangeUpdatePlanAndList(
        action.dataUpdate.recipeUpdate,
        stateReducer.weeklyPlan
      );
      onRecipeListChangeUpdatePlanAndList(
        action.dataUpdate.recipeUpdate,
        stateReducer.shoppingList
      );
      const index = stateReducer.recipeList
        .map(e => e.id)
        .indexOf(action.dataUpdate.recipeUpdate.id);
      stateReducer.recipeList.splice(index, 1, action.dataUpdate.recipeUpdate);
      sortArray(stateReducer.recipeList);
      updateLocalStorage(stateReducer);
      return stateReducer;
    }
    //++++++++++++++++++++++++++++++++++++++++
    // // update recipe fav state and update recipePage
    if (action.dataUpdate.favUpdate) {
      let currentFavState;
      stateReducer.recipeList = stateReducer.recipeList.map(el => {
        if (el.id === action.dataUpdate.recipeUpdate.id) {
          el.fav = !el.fav;
          currentFavState = el.fav;
        }
        return el;
      });
      action.dataUpdate.favUpdate('fav', currentFavState);
      updateLocalStorage(stateReducer);
      return stateReducer;
    }
    //++++++++++++++++++++++++++++++++++++++++
    // // update plan onClick recipePage
    if (action.dataUpdate.planUpdate) {
      // // remove from plan
      if (action.dataUpdate.currentPlanState) {
        stateReducer.weeklyPlan = removeFromList(
          stateReducer.weeklyPlan,
          action.dataUpdate.recipeUpdate.id
        );
        action.dataUpdate.planUpdate('plan', false);
        updateLocalStorage(stateReducer);
        return stateReducer;
      }
      // // // add to plan
      if (action.dataUpdate.currentPlanState === false) {
        stateReducer.weeklyPlan = addToList(
          stateReducer.weeklyPlan,
          action.dataUpdate.recipeUpdate
        );
        action.dataUpdate.planUpdate('plan', true);
        updateLocalStorage(stateReducer);
        return stateReducer;
      }
    }
    //++++++++++++++++++++++++++++++++++++++++
    if (action.dataUpdate.listUpdate) {
      if (action.dataUpdate.currentListState) {
        stateReducer.shoppingList = removeFromList(
          stateReducer.shoppingList,
          action.dataUpdate.recipeUpdate.id
        );
        action.dataUpdate.listUpdate('list', false);
        return stateReducer;
      }
      // // // add to plan
      if (action.dataUpdate.currentListState === false) {
        stateReducer.shoppingList = addToList(
          stateReducer.shoppingList,
          action.dataUpdate.recipeUpdate
        );
        action.dataUpdate.listUpdate('list', true);
        updateLocalStorage(stateReducer);
        return stateReducer;
      }
    }
  }
  //==================================================================
  if (action.type === 'DELETE') {
    stateReducer.weeklyPlan = onRecipeDelete(
      action.dataUpdate,
      stateReducer.weeklyPlan
    );
    stateReducer.shoppingList = onRecipeDelete(
      action.dataUpdate,
      stateReducer.shoppingList
    );
    stateReducer.recipeList = onRecipeDelete(
      action.dataUpdate,
      stateReducer.recipeList
    );
    state.currentRecipe = { ...state.initialState };
    updateLocalStorage(stateReducer);
    return stateReducer;
  }
  if (action.type === 'PLAN') {
    // // add to plan => replace the plan with updated version
    if (action.dataUpdate.weeklyPlanState) {
      stateReducer.weeklyPlan = [...action.dataUpdate.weeklyPlanState];
      updateLocalStorage(stateReducer);
      return stateReducer;
    }
    // // remove from plan
    if (action.dataUpdate.itemId) {
      stateReducer.weeklyPlan = removeFromList(
        stateReducer.weeklyPlan,
        action.dataUpdate.itemId
      );
      action.dataUpdate.setPlanStateFromOutSide();
      updateLocalStorage(stateReducer);
      return stateReducer;
    }
  }
  if (action.type === 'SHOP') {
    // // add to plan => replace the plan with updated version
    if (action.dataUpdate.shoppingListState) {
      stateReducer.shoppingList = [...action.dataUpdate.shoppingListState];
      updateLocalStorage(stateReducer);
      return stateReducer;
    }
    // // remove from plan
    if (action.dataUpdate.itemId) {
      console.log(action.dataUpdate.itemId);
      stateReducer.shoppingList = removeFromList(
        stateReducer.shoppingList,
        action.dataUpdate.itemId
      );
      action.dataUpdate.setPlanStateFromOutSide();
      updateLocalStorage(stateReducer);
      return stateReducer;
    }
  }
  if (action.type === 'SHOPSUM') {
    // console.log('data', action.dataUpdate);
    stateReducer.ingredientsSumListState = [
      ...action.dataUpdate.ingredientsSumListState,
    ];
    updateLocalStorage(stateReducer);
    return stateReducer;
  }
  if (action.type === 'SETTINGS') {
    if (action.dataUpdate.avoidList) {
      stateReducer.menuState.shoppingListSettings.avoidList =
        action.dataUpdate.avoidList;
    }
    console.log('sett end', stateReducer);
    updateLocalStorage(stateReducer);
    return stateReducer;
  }
  updateLocalStorage(stateReducer);
  return stateReducer;
};
//==================================================================
// // manipulate weeklyPlan and shoppingList
const removeFromList = (currentList, idToRemove) => {
  currentList = currentList.filter(el => {
    if (el.id !== idToRemove) return el;
  });
  return currentList;
};
const addToList = (currentList, objToAdd) => {
  return [...currentList, objToAdd];
};
//==================================================================
const sortArray = array => {
  array.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
};
//==================================================================
const onRecipeListChangeUpdatePlanAndList = (recipeUpdate, array) => {
  const index = array.findIndex(recipe => recipe.id === recipeUpdate.id);
  return [...array.splice(index, 1, recipeUpdate)];
};
const onRecipeDelete = (recipe, array) => {
  return array.filter(el => {
    if (el.id !== recipe.id) return el;
  });
};
//==================================================================
const DataProvider = props => {
  const localData = JSON.parse(localStorage.getItem('localData'));
  if (localData === null) {
    localStorage.setItem('localData', JSON.stringify(dataInit));
  }
  const { isLoading, error, sendRequest } = useFetch(
    {
      url: 'https://react-app-c8bf3-default-rtdb.europe-west1.firebasedatabase.app/data.json',
    },
    data => console.log('fetch', data)
  );
  // useFetch(
  //   {
  //     url: 'https://react-app-c8bf3-default-rtdb.europe-west1.firebasedatabase.app/data.json',
  //   },
  //   data => console.log('fetch', data)
  // );
  //==================================================================
  // // // const [isLoading, setIsLoading] = useState(false);
  // // // const [error, setError] = useState(false);
  // // // const getDataHandler = useCallback(async () => {
  // // //   setIsLoading(true);
  // // //   setError(null);
  // // //   try {
  // // //     const response = await fetch(
  // // //       'https://react-app-c8bf3-default-rtdb.europe-west1.firebasedatabase.app/data.json'
  // // //     );
  // // //     const data = await response.json();
  // // //     if (!response.ok) {
  // // //       throw new Error('Der Server ist nicht erreichbar !');
  // // //     }
  // // //   } catch (error) {
  // // //     console.log('Error');
  // // //     setError(error.message);
  // // //   }
  // // //   setIsLoading(false);
  // // // }, []);
  // // // useEffect(() => {
  // // //   getDataHandler();
  // // // }, [getDataHandler]);
  //==================================================================
  const [dataState, dispatchData] = useReducer(dataReducer, localData);
  const dataUpdateFunction = (type, dataUpdate) => {
    if (
      type === 'INPUT' ||
      type === 'UPDATERECIPE' ||
      type === 'DELETE' ||
      type === 'PLAN' ||
      type === 'SHOP' ||
      type === 'SHOPSUM' ||
      type === 'SETTINGS'
    ) {
      dispatchData({ type, dataUpdate });
    }
    if (type === 'postFetch') {
      // sendData(dataUpdate);
    }
    if (type === 'getFetch') {
      sendRequest();
      // getDataHandler();
      console.log('provider');
    }
    // if (type === 'header') {
    //   setHeaderText(dataUpdate);
    // }
  };
  //==================================================================
  //==================================================================

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

const dataInit = {
  menuState: {
    userData: {
      loggedIn: false,
      userName: 'Demo_User',
      email: 'demo-email@gmail.com',
      password: '',
    },
    hide: true,
    shoppingListSettings: { avoidList: 'Salz ,Pfeffer ,Chili ' },
  },
  weeklyPlan: [],
  recipeList: [],

  shoppingList: [],
};
