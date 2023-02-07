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

class ingredientSumItem {
  constructor(name, nameKey, quantity, unit) {
    this.nameKey = nameKey;
    this.name = name;
    this.unit = unit;
    this.quantity = [quantity];
  }
  add(value) {
    this.quantity = [...this.quantity, value];
    return this.quantity;
  }
  sum() {
    return this.quantity.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
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
  let tempSumState = [];
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

  const createSumList = recipeList => {
    for (const i in recipeList) {
      for (const j in recipeList[i].ingredients) {
        const ingredientName = recipeList[i].ingredients[j].ingredientName;
        const nameKey = ingredientName.trim().toLowerCase();
        const [unit, quantity] = evaluateQuantityUnit(
          recipeList[i].ingredients[j].quantity,
          recipeList[i].ingredients[j].unit
        );
        createSumItem(ingredientName, nameKey, quantity, unit);
      }
    }
    setIngredientsSumListState(tempSumState);
  };
  const createSumItem = (ingredientName, nameKey, quantity, unit) => {
    const [sumItem] = tempSumState.filter(el => el.nameKey === nameKey);
    if (!sumItem) {
      const newSumItem = new ingredientSumItem(
        ingredientName,
        nameKey,
        +quantity,
        unit
      );
      tempSumState = [...tempSumState, newSumItem];
      return;
    }
    sumItem.add(+quantity);
  };
  const evaluateQuantityUnit = (quantityInput, inputUnit) => {
    const quantity = +quantityInput.replace(/,/g, '.');
    console.log(2, '2');
    console.log(quantity);
    if (inputUnit === 'g') {
      return ['kg', quantity / 1000];
    }
    if (inputUnit === 'kg') {
      return ['kg', quantity];
    }
    if (inputUnit === 'ml') {
      return ['l', quantity / 1000];
    }
    if (inputUnit === 'l') {
      return ['l', quantity];
    }
    if (inputUnit === 'TL-gestr.') {
      return ['Löffel', quantity * 4];
    }
    if (inputUnit === 'TL') {
      return ['Löffel', quantity * 2];
    }
    if (inputUnit === 'EL') {
      return ['Löffel', quantity];
    }
    if (inputUnit === 'Stk.') {
      return ['Stk.', quantity];
    }
    if (inputUnit === 'Priese') {
      return ['Priese', quantity];
    }
    if (inputUnit === 'Tasse') {
      return ['Tasse', quantity];
    } else {
      return ['--', quantity];
    }
  };
  //==================================================================
  const onRoundButtonHandler = btnId => {
    createSumList(dataCtx.shoppingList);

    // console.log(btnId);
    // if (btnId === 'add') {
    //   state.shoppingList.editMode = true;
    //   state.headerText = 'Zur Einkaufsliste hinzufügen';
    // }
  };
  const onCheckButtonHandler = itemId => {
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
        {ingredientsSumListState.map((item, i) => {
          //
          return (
            <li key={item.nameKey}>
              <ShoppingListItem
                name={item.name}
                quantity={item.sum()}
                unit={item.unit}
                checkButtonHandler={onCheckButtonHandler}
                id={item.nameKey}
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
