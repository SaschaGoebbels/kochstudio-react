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
    this.unit = unit;
    this.id = id;
  }
}
const setUnitMulti = inputUnit => {
  let multiplication = 1;
  if (inputUnit === 'g') {
    return { unit: 'kg', multi: 1000 };
  }
  if (inputUnit === 'kg') {
    return { unit: 'kg', multi: 1 };
  }
  if (inputUnit === 'ml') {
    return { unit: 'l', multi: 1000 };
  }
  if (inputUnit === 'l') {
    return { unit: 'l', multi: 1 };
  }
  if (inputUnit === 'TL-gestr.') {
    return { unit: 'EL', multi: 4 };
  }
  if (inputUnit === 'TL') {
    return { unit: 'EL', multi: 2 };
  }
  if (inputUnit === 'EL') {
    return { unit: 'EL', multi: 1 };
  }
  if (inputUnit === 'Stk.') {
    return { unit: 'Stk.', multi: 1 };
  }
  if (inputUnit === 'Priese') {
    return { unit: 'Priese', multi: 1 };
  }
  if (inputUnit === 'Tasse') {
    return { unit: 'Tasse', multi: 1 };
  } else {
    return { unit: '--', multi: 1 };
  }
};

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

  const [shoppingState, setShoppingState] = useState(dataCtx.shoppingList);
  const [ingredientsSumListState, setIngredientsSumListState] = useState([]);
  const setListStateFromOutSide = () => {
    setTimeout(() => {
      setShoppingState(dataCtx.shoppingList);
    }, 50);
  };
  // console.log(dataCtx.shoppingList);
  useEffect(() => {
    setShoppingState(dataCtx.weeklyPlan);
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
    // console.log(ingredients);
    for (const ingredient in ingredients) {
      // go through ingredients check nameKey in list,
      // if so add to ingredients array, else create new listItem and add ingredients
      const nameKey = ingredients[ingredient].ingredientName
        .trim()
        .toLowerCase();
      // check nameKey
      if (listStateNow.some(el => el.nameKey === nameKey)) {
        // if ingredientsSumList exists check if item is already on the list, if not add
        listStateNow.filter(el => {
          if (el.id === ingredient.id) return;
          const ingSumListCreate = ingredientListUpdate(
            false,
            ingredients[ingredient].ingredientName,
            nameKey,
            ingredients[ingredient].quantity,
            ingredients[ingredient].unit,
            ingredients[ingredient].id
          );
        });
        // ingredient.ingredients.some(el===)
        console.log('yes it contains');
      } else {
        // create sumItemHolder
        const ingSumListCreate = ingredientListUpdate(
          true,
          ingredients[ingredient].ingredientName,
          nameKey,
          ingredients[ingredient].quantity,
          ingredients[ingredient].unit,
          ingredients[ingredient].id
        );

        setIngredientsSumListState(prev => [...prev, ingSumListCreate]);
        console.log(ingSumListCreate);
      }
    }
  };
  const ingredientListUpdate = (
    sumList,
    name,
    nameKey,
    quantity,
    initialUnit,
    id
  ) => {
    const { unit, multi } = setUnitMulti(initialUnit);
    const ingItemCreate = new ingItem(name, quantity / multi, unit, id);
    if (sumList === true) {
      const ingSumListCreate = new ingSumList(
        nameKey,
        name,
        [ingItemCreate],
        unit
      );
      return ingSumListCreate;
    }
    return ingItemCreate;
  };
  //==================================================================
  const onRoundButtonHandler = btnId => {
    console.log(dataCtx.shoppingList);
    console.log(ingredientsSumListState);
    addRecipeToSummarized(dataCtx.shoppingList[0], ingredientsSumListState);
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
      {shoppingState.length === 0 && (
        <div className={classes.contentListBox__emptyList}>
          <WeeklyPlanItem
            day={'Die Einkaufsliste ist aktuell leer !'}
            recipe={'auf + drücken zum hinzufügen ...'}
            checkButtonHide={true}
          ></WeeklyPlanItem>
        </div>
      )}
      <ul className={classes.contentListBox__ul}>
        {shoppingState.map((item, i) => {
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
