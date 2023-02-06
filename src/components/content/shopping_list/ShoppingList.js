import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';

import WeeklyPlanItem from '../weeklyPlan/WeeklyPlanItem';
import ShoppingListItem from './ShoppingListItem';
import SearchBar from '../../ui/SearchBar';
import ButtonBoxContent from '../../ui/ButtonBoxContent';
import classes from './ShoppingList.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';
//==================================================================
class ingItem {
  constructor(name, quantity, unit, id) {
    this.name = name;
    this.quantity = quantity;
    this.exportQuantity = this.quantity * this.multiplication;
    this.unit = unit;
    this.exportUnit = this.displayUnit;
    this.id = id;
    this.multiplication = 0;
  }
  displayUnit() {
    if (this.unit === 'g') {
      this.multiplication = 1000;
      this.exportUnit = 'kg';
      return 'kg';
    }
    if (this.unit === 'kg') {
      this.multiplication = 1;
      this.exportUnit = 'kg';
      return 'kg';
    }
    if (this.unit === 'ml') {
      this.multiplication = 1000;
      this.exportUnit = 'l';
      return 'l';
    }
    if (this.unit === 'l') {
      this.multiplication = 1;
      this.exportUnit = 'l';
      return 'l';
    }
    if (this.unit === 'TL-gestr.') {
      this.multiplication = 4;
      this.exportUnit = 'EL';
      return 'EL';
    }
    if (this.unit === 'TL') {
      this.multiplication = 2;
      this.exportUnit = 'EL';
      return 'EL';
    }
    if (this.unit === 'EL') {
      this.multiplication = 1;
      this.exportUnit = 'EL';
      return 'EL';
    }
    if (this.unit === 'Stk.') {
      this.multiplication = 1;
      this.exportUnit = 'Stk.';
      return 'Stk.';
    }
    if (this.unit === 'Priese') {
      this.multiplication = 1;
      this.exportUnit = 'Priese';
      return 'Priese';
    }
    if (this.unit === 'Tasse') {
      this.multiplication = 1;
      this.exportUnit = 'Tasse';
      return 'Tasse';
    }
  }
}

class ingSumList {
  constructor(nameKey, name, ingredients, unit) {
    this.nameKey = nameKey;
    this.name = name;
    this.unit = unit;
    this.ingredients = ingredients;
    this.sum = this.ingredients.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exportQuantity
    );
  }
  add(item) {
    this.ingredients = [...this.ingredients, item];
    return this.ingredients;
  }
}
//==================================================================
const ShoppingList = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();
  //==================================================================

  const [listState, setListRecipeState] = useState(dataCtx.shoppingList);
  const [ingredientsListState, setIngredientsListState] = useState([]);
  const setListStateFromOutSide = () => {
    setTimeout(() => {
      setListRecipeState(dataCtx.shoppingList);
    }, 50);
  };
  // console.log(dataCtx.shoppingList);
  useEffect(() => {
    setListRecipeState(dataCtx.weeklyPlan);
  }, [snap.weeklyPlan.editMode, snap.headerText === 'Wochenplan']);
  //==================================================================
  // SearchBar
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    setSearchInput('');
  }, [snap.searchBarHide]);
  const searchChangeHandler = value => {
    setSearchInput(value.target.value);
  };
  //==================================================================
  //logic for summarized ingredientList
  ////////////////// CHECK //////////////////
  const addRecipeToSummarized = (recipe, listStateNow) => {
    const ingredients = recipe.ingredients;
    console.log(ingredients);
    for (const ingredient in ingredients) {
      const nameKey = ingredients[ingredient].ingredientName
        .trim()
        .toLowerCase();
      // console.log(ingredients[ingredient].ingredientName);
      if (listStateNow.some(el => el.nameKey === nameKey)) {
        console.log('yes it contains');
      } else {
        // create sumItemHolder
        ingSumList();
        // setIngredientsListState(prev => {});
        console.log('add ingredient now');
        // prev;
      }
    }
    // prev.
  };
  // const if nameKey add
  // const if !nameKey add
  // const summary of ingredients g kg
  //==================================================================
  const onRoundButtonHandler = btnId => {
    addRecipeToSummarized(listState[0], ingredientsListState);
    // console.log(btnId);
    // if (btnId === 'add') {
    //   state.shoppingList.editMode = true;
    //   state.headerText = 'Zur Einkaufsliste hinzufügen';
    // }
  };
  const onCheckButtonHandler = itemId => {
    // setIngredientsListState();
    console.log(itemId);
    // updateData('PLAN', {
    //   itemId,
    //   setPlanStateFromOutSide: setListStateFromOutSide,
    // });
  };
  return (
    <div className={`${classes.contentListBox} `}>
      <SearchBar
        searchInput={searchInput}
        inputChangeHandler={searchChangeHandler}
      ></SearchBar>
      {/* <WeeklyPlanEdit searchInput={searchInput}></WeeklyPlanEdit> */}
      {/* //fallback for empty List */}
      {listState.length === 0 && (
        <div className={classes.contentListBox__emptyList}>
          <WeeklyPlanItem
            day={'Die Einkaufsliste ist aktuell leer !'}
            recipe={'auf + drücken zum hinzufügen ...'}
            checkButtonHide={true}
          ></WeeklyPlanItem>
        </div>
      )}
      <ul className={classes.contentListBox__ul}>
        {listState.map((item, i) => {
          //
          return (
            <li key={item.id}>
              <ShoppingListItem
                // day={day}
                recipe={item.name}
                checkButtonHandler={onCheckButtonHandler}
                id={item.id}
              ></ShoppingListItem>
            </li>
          );
        })}
      </ul>
      <ButtonBoxContent
        onRoundButtonHandler={onRoundButtonHandler}
        coinHide={true}
      ></ButtonBoxContent>
    </div>
  );
};
export default ShoppingList;
