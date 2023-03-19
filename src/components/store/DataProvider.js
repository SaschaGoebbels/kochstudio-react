import React, { useState, useReducer, useContext } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { state } from '../store/state';
import { snapshot, useSnapshot } from 'valtio';

export const UPDATERECIPE = 'UPDATERECIPE';

export const DataContext = React.createContext(null);
const DataUpdate = React.createContext();
export function useDataUpdate() {
  return useContext(DataUpdate);
}

//==================================================================

//==================================================================
const dataReducer = (stateReducer, action) => {
  // // Login
  if (action.type === 'LOGIN') {
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
    return stateReducer;
  }
  // // input new recipe
  if (action.type === 'INPUT') {
    stateReducer.recipeList = [
      ...stateReducer.recipeList,
      action.dataUpdate.recipeInput,
    ];
    sortArray(stateReducer.recipeList);
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
        return stateReducer;
      }
      // // // add to plan
      if (action.dataUpdate.currentPlanState === false) {
        stateReducer.weeklyPlan = addToList(
          stateReducer.weeklyPlan,
          action.dataUpdate.recipeUpdate
        );
        action.dataUpdate.planUpdate('plan', true);
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
    return stateReducer;
  }
  if (action.type === 'PLAN') {
    // // add to plan => replace the plan with updated version
    if (action.dataUpdate.weeklyPlanState) {
      stateReducer.weeklyPlan = [...action.dataUpdate.weeklyPlanState];
      return stateReducer;
    }
    // // remove from plan
    if (action.dataUpdate.itemId) {
      stateReducer.weeklyPlan = removeFromList(
        stateReducer.weeklyPlan,
        action.dataUpdate.itemId
      );
      action.dataUpdate.setPlanStateFromOutSide();
      return stateReducer;
    }
  }
  if (action.type === 'SHOP') {
    // // add to plan => replace the plan with updated version
    if (action.dataUpdate.shoppingListState) {
      stateReducer.shoppingList = [...action.dataUpdate.shoppingListState];
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
      return stateReducer;
    }
  }
  if (action.type === 'SHOPSUM') {
    // console.log('data', action.dataUpdate);
    stateReducer.ingredientsSumListState = [
      ...action.dataUpdate.ingredientsSumListState,
    ];
    return stateReducer;
  }
  if (action.type === 'SETTINGS') {
    if (action.dataUpdate.avoidList) {
      stateReducer.menuState.shoppingListSettings.avoidList =
        action.dataUpdate.avoidList;
    }
    return stateReducer;
  }
  if (action.type === 'DELETEALL') {
    let deleteAll = false;
    if (action.dataUpdate.btnId === 'trashAll') {
      deleteAll = true;
    }
    if (action.dataUpdate.btnId === 'trashRecipeList' || deleteAll) {
      stateReducer.recipeList = [];
      stateReducer.shoppingList = [];
      stateReducer.weeklyPlan = [];
    }
    if (action.dataUpdate.btnId === 'trashUser' || deleteAll) {
      stateReducer.menuState = {
        userData: {
          loggedIn: false,
          userName: '',
          email: '',
          password: '',
        },
        hide: false,
        shoppingListSettings: { avoidList: 'Salz ,Pfeffer ,Chili ' },
      };
      window.location.reload();
    }
    return stateReducer;
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
//==================================================================
const DataProvider = props => {
  ////////////////// TODO //////////////////

  // // const fetchData = async () => {
  // //   console.log('✅');
  // //   console.log();
  // //   let res;
  // //   try {
  // //     await fetch(
  // //       'https://cyan-pleasant-chicken.cyclic.app/api/v1/recipe/getExampleRecipes'
  // //     )
  // //       .then(response => response.json())
  // //       .then(data => console.log(data));
  // //     // const res =
  // //     // await fetch(
  // //     //   'https://cyan-pleasant-chicken.cyclic.app/api/v1/users/appData',
  // //     //   {
  // //     //     method: 'GET',
  // //     //     headers: { 'Content-type': 'application/json; charset=UTF-8' },
  // //     //   }
  // //     // )
  // //     //   .then(response => response.json())
  // //     //   .then(json => (res = json));
  // //   } catch (err) {
  // //     console.log('❌', err);
  // //   }
  // // };
  //==================================================================

  //==================================================================
  ////////////////// FIXME ////////////////// DATA
  const [dataState, dispatchData] = useReducer(dataReducer, dataInit);
  const dataUpdateFunction = (type, dataUpdate) => {
    if (
      type === 'LOGIN' ||
      type === 'OPENLOGIN' ||
      type === 'LOGOUT' ||
      type === 'INPUT' ||
      type === 'UPDATERECIPE' ||
      type === 'DELETE' ||
      type === 'PLAN' ||
      type === 'SHOP' ||
      type === 'SHOPSUM' ||
      type === 'SETTINGS' ||
      type === 'DELETEALL'
    ) {
      dispatchData({ type, dataUpdate });
    }
    if (type === 'postFetch') {
      // sendData(dataUpdate);
    }
    if (type === 'getFetch') {
      // sendRequest();
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
