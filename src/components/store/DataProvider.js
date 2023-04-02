import React, { useState, useReducer, useContext } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { state } from '../store/state';
import { snapshot, useSnapshot } from 'valtio';

import { fetchAppDataPost } from '../../utils/fetchData';
import { updateSettings } from '../../utils/fetchData';
import { deleteRecipeList } from '../../utils/fetchData';
import { fetchRecipe } from '../../utils/fetchData';

export const UPDATERECIPE = 'UPDATERECIPE';

export const DataContext = React.createContext(null);
const DataUpdate = React.createContext();
export function useDataUpdate() {
  return useContext(DataUpdate);
}

//==================================================================

//==================================================================
const dataReducer = (stateReducer, action) => {
  if (action.type === 'RESPONSEUPDATE') {
    stateReducer = { ...action.dataUpdate };
    return stateReducer;
  }
  if (action.type === 'LOGIN') {
    // // Login
    stateReducer.appData = { ...action.dataUpdate.appData };
    stateReducer.menuState.userData.email = action.dataUpdate.email;
    stateReducer.menuState.userData.name = action.dataUpdate.name;
    stateReducer.menuState.loggedIn = true;
    stateReducer.menuState.hide = true;
    stateReducer.menuState.hideLogin = true;
    sortArray(stateReducer.appData.recipeList);
    return { ...stateReducer };
  }
  if (action.type === 'OPENLOGIN') {
    stateReducer.menuState.hideLogin = false;
    return { ...stateReducer };
  }
  if (action.type === 'LOGOUT') {
    stateReducer = dataInit;
    return { ...stateReducer };
  }
  if (action.type === 'FETCHEXAMPLELIST') {
    stateReducer.appData.recipeList = action.dataUpdate.exampleList;
    return { ...stateReducer };
  }
  if (action.type === 'INPUT') {
    // // input new recipe
    stateReducer.appData.recipeList = [
      ...stateReducer.appData.recipeList,
      action.dataUpdate.recipeInput,
    ];
    sortArray(stateReducer.appData.recipeList);
    return { ...stateReducer };
  }
  //==================================================================
  // // on change recipe - update existing by replacing recipe
  if (action.type === UPDATERECIPE) {
    // replace existing recipe with updated version
    if (action.dataUpdate.recipeUpdate) {
      const index = stateReducer.appData.recipeList
        .map(e => e.id)
        .indexOf(action.dataUpdate.recipeUpdate.id);
      stateReducer.appData.recipeList.splice(
        index,
        1,
        action.dataUpdate.recipeUpdate
      );
      sortArray(stateReducer.appData.recipeList);
      console.log('✅', new Date().toUTCString());
      return { ...stateReducer };
    }
  }
  //==================================================================
  if (action.type === 'DELETE') {
    stateReducer.appData.weeklyPlan = onRecipeDelete(
      action.dataUpdate,
      stateReducer.appData.weeklyPlan
    );
    stateReducer.appData.shoppingList = onRecipeDelete(
      action.dataUpdate,
      stateReducer.appData.shoppingList
    );
    stateReducer.appData.recipeList = onRecipeDelete(
      action.dataUpdate,
      stateReducer.appData.recipeList
    );
    state.currentRecipe = { ...state.initialState };
    return { ...stateReducer };
  }
  if (action.type === 'PLAN') {
    // // add to plan => replace the plan with updated version
    if (action.dataUpdate.weeklyPlanState) {
      stateReducer.appData.weeklyPlan = [...action.dataUpdate.weeklyPlanState];
      return { ...stateReducer };
    }
    // // remove from plan
    if (action.dataUpdate.itemId) {
      stateReducer.appData.weeklyPlan = removeFromList(
        stateReducer.appData.weeklyPlan,
        action.dataUpdate.itemId
      );
      action.dataUpdate.setPlanStateFromOutSide();
      return { ...stateReducer };
    }
  }
  if (action.type === 'SHOP') {
    // // add to plan => replace the plan with updated version
    if (action.dataUpdate.shoppingListState) {
      stateReducer.appData.shoppingList = [
        ...action.dataUpdate.shoppingListState,
      ];
      return { ...stateReducer };
    }
    // // remove from plan
    if (action.dataUpdate.itemId) {
      console.log(action.dataUpdate.itemId);
      stateReducer.appData.shoppingList = removeFromList(
        stateReducer.appData.shoppingList,
        action.dataUpdate.itemId
      );
      action.dataUpdate.setPlanStateFromOutSide();
      return { ...stateReducer };
    }
  }
  if (action.type === 'SHOPSUM') {
    // console.log('data', action.dataUpdate);
    stateReducer.appData.ingredientsSumListState = [
      ...action.dataUpdate.ingredientsSumListState,
    ];
    return { ...stateReducer };
  }
  if (action.type === 'SETTINGS') {
    if (action.dataUpdate.avoidList) {
      stateReducer.appData.settings.shoppingListSettings.avoidList =
        action.dataUpdate.avoidList;
      updateSettings(
        {
          ...stateReducer.appData.settings,
        },
        action.dataUpdate.message
      );
    }
    return { ...stateReducer };
  }
  if (action.type === 'DELETEALL') {
    if (action.dataUpdate.btnId === 'trashRecipeList') {
      stateReducer.appData.recipeList = [];
      stateReducer.appData.shoppingList = [];
      stateReducer.appData.weeklyPlan = [];
      console.log('✅', action);
    }
    return { ...stateReducer };
  }
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
// const onRecipeListChangeUpdatePlanAndList = (recipeUpdate, array) => {
//   const index = array.findIndex(recipe => recipe.id === recipeUpdate.id);
//   return [...array.splice(index, 1, recipeUpdate)];
// };
const onRecipeDelete = (recipe, array) => {
  return array.filter(el => {
    if (el.id !== recipe.id) return el;
  });
};
//==================================================================
//==================================================================
const DataProvider = props => {
  //==================================================================
  const [dataState, dispatchData] = useReducer(dataReducer, dataInit);
  const dataUpdateFunction = async (type, dataUpdate) => {
    ////////////////// TODO //////////////////DATA
    //recipe handling
    let res;
    if (type === 'INPUT') {
      res = await fetchRecipe(
        'POST',
        dataUpdate.recipeInput,
        dataUpdate.recipeInput.id,
        'recipeList',
        'recipe'
        // 'shoppingList'
      );
      if (res.status !== 'success') return;
    }
    if (type === 'UPDATERECIPE') {
      console.log('✅', dataUpdate.recipeUpdate);
      res = await fetchRecipe(
        'POST',
        dataUpdate.recipeUpdate,
        dataUpdate.recipeUpdate.id,
        'recipeList',
        'recipeUpdate'
      );
      if (res.status !== 'success') return;
    }
    if (type === 'DELETE') {
      console.log('✅', dataUpdate);
      res = await fetchRecipe(
        'POST',
        dataUpdate,
        dataUpdate.id,
        'recipeList',
        'recipeDelete'
      );
      if (res.status !== 'success') return;
    }
    // settings
    if (type === 'SETTINGS') {
      dataState.appData.settings.shoppingListSettings.avoidList =
        dataUpdate.avoidList;
      res = await updateSettings(
        {
          ...dataState.appData.settings,
        },
        dataUpdate.message
      );
      if (res.status === 'success')
        dispatchData({ type: 'RESPONSEUPDATE', dataUpdate: dataState });
    }
    if (type === 'FETCHEXAMPLELIST') {
      dataState.appData.recipeList = dataUpdate.exampleList;
      res = await fetchAppDataPost(dataState.appData, dataUpdate.message);
      if (res.status !== 'success') return;
    }
    if (type === 'DELETEALL') {
      res = await deleteRecipeList(dataUpdate.message);
      if (res.status === 'success') {
        dispatchData({ type, dataUpdate });
        window.location.reload();
      }
    }
    // console.log('✅✅✅ Type:', dataUpdate.recipeInput.id);
    // console.log('🚩❌🚩 dataUpdate:', dataUpdate.recipeInput);
    if (
      type === 'LOGIN' ||
      type === 'OPENLOGIN' ||
      type === 'LOGOUT' ||
      type === 'PLAN' ||
      type === 'SHOP' ||
      type === 'SHOPSUM'
    ) {
    }
    dispatchData({ type, dataUpdate });
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
      name: '',
      email: '',
    },
    loggedIn: false,
    hide: true,
    hideLogin: true,
  },
  appData: {
    weeklyPlan: [],
    recipeList: [],
    shoppingList: [],
    settings: { shoppingListSettings: { avoidList: 'Salz ,Pfeffer ,Chili ' } },
  },
};
