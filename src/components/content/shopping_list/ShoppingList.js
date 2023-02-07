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
  let tempSumState;
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
  // // //logic for summarized ingredientList
  ////////////////// CHECK //////////////////
  const addRecipeToSummarized = (recipeList, listStateNow) => {
    tempSumState = listStateNow;
    for (const recipe in recipeList) {
      const ingredients = recipeList[recipe].ingredients;
      console.log(tempSumState);
      tempSumState = checkIngredientsOfRecipe(ingredients, tempSumState);
    }
    console.log(tempSumState);
    setIngredientsSumListState(prev => [tempSumState]);
  };
  const checkIngredientsOfRecipe = (ingredients, tempSumState) => {
    for (const key in ingredients) {
      console.log(key);
      console.log(key);
      // // // go through ingredients check nameKey in list,
      // // // if so add to ingredients array, else create new listItem and add ingredients
      const nameKey = ingredients[key].ingredientName.trim().toLowerCase();
      console.log(nameKey);
      console.log(tempSumState);
      // // // check nameKey
      if (tempSumState.some(el => el.nameKey === nameKey)) {
        console.log('list contains');
        // create and append list
        console.log(ingredients[key]);
        tempSumState = ingredientExistInSumListAdd(
          nameKey,
          tempSumState,
          ingredients,
          key
        );
        return tempSumState;
      } else {
        return createIngredientSumList(ingredients, key, nameKey);
        // createIngredientSumList(ingredients, ingredient, nameKey);
      }
    }
  };
  const ingredientExistInSumListAdd = (
    nameKey,
    tempSumState,
    ingredients,
    ingredient
  ) => {
    // if ingredientsSumList exists check if item is already on the list, if not add
    // create filtered array containing the current nameKey
    const [filteredListStateNow] = tempSumState.filter(item => {
      if (item.nameKey === nameKey) return item;
    });
    //now filter the ingredientsArray by id , if containing return and skip
    // console.log(ingredients[ingredient].id);
    // console.log(filteredListStateNow.ingredients[0].id);
    //BUG
    // console.log(filteredListStateNow.ingredients[0].id);
    // console.log(ingredients);
    // console.log(
    //   filteredListStateNow.ingredients.some(
    //     ing => ing.id === ingredients[ingredient].id
    //   )
    // );
    if (
      filteredListStateNow.ingredients.some(
        ing => ing.id === ingredients[ingredient].id
      )
    ) {
      console.log('already exists return now');
      return tempSumState;
    }
    console.log('append existing list');
    const ingSumListCreate = ingredientListUpdate(
      false,
      ingredients[ingredient].ingredientName,
      nameKey,
      ingredients[ingredient].quantity,
      ingredients[ingredient].unit,
      ingredients[ingredient].id
    );
    // append ingredients list in sumItem
    filteredListStateNow.ingredients = [
      ...filteredListStateNow.ingredients,
      ingSumListCreate,
    ];
    console.log(tempSumState);
    return tempSumState;
  };
  const createIngredientSumList = (ingredients, ingredient, nameKey) => {
    // create sumItemHolder
    const ingSumListCreate = ingredientListUpdate(
      true,
      ingredients[ingredient].ingredientName,
      nameKey,
      ingredients[ingredient].quantity,
      ingredients[ingredient].unit,
      ingredients[ingredient].id
    );
    console.log('create', ingSumListCreate);
    return (tempSumState = [...tempSumState, ingSumListCreate]);
    console.log(tempSumState);
    // setIngredientsSumListState(prev => [...prev, ingSumListCreate]);
    // // // if nameKey do not exist create it and append list
    // listStateNow = [...listStateNow, ingSumListCreate];
  };
  //++++++++++++++++++++++++++++++
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
    // console.log(dataCtx.shoppingList);
    addRecipeToSummarized(dataCtx.shoppingList, ingredientsSumListState);

    // console.log(btnId);
    // if (btnId === 'add') {
    //   state.shoppingList.editMode = true;
    //   state.headerText = 'Zur Einkaufsliste hinzufügen';
    // }
  };
  const onCheckButtonHandler = itemId => {
    // setIngredientsListState();
    // console.log(itemId);
    console.log(ingredientsSumListState);
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
