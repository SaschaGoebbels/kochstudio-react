import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';
import uuid from 'react-uuid';

import WeeklyPlanItem from '../weeklyPlan/WeeklyPlanItem';
import ShoppingListItem from './ShoppingListItem';
import ListEdit from '../ListEdit';
import SearchBar from '../../ui/SearchBar';
import ButtonRound from '../../ui/ButtonRound';
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
    this.checked = false;
    this.id = uuid();
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
  // // // SearchBar
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    setSearchInput('');
  }, [snap.searchBarHide]);
  const searchChangeHandler = value => {
    setSearchInput(value.target.value);
  };
  //==================================================================
  const [shoppingListState, setShoppingListState] = useState(
    dataCtx.shoppingList
  );
  //==================================================================
  const [ingredientsSumListState, setIngredientsSumListState] = useState([]);
  const currentLocalSumList = dataCtx.ingredientsSumListState;
  ////////////////// FIXME //////////////////
  // console.log(
  //   currentLocalSumList.filter(
  //     el => el.id === '4766e5d6-9bdb-d93f-c461-4e0cc750d378'
  //   )
  // );
  // console.log(
  //   ingredientsSumListState.map(el => {
  //     console.log(el.id);
  //   })
  // );
  // useEffect(() => {
  //   setIngredientsSumListState(prev => {
  //     console.log('ok');
  //     const temp = prev.map(mapEl => {
  //       const [recipeLocal] = currentLocalSumList.filter(
  //         el => el.id === mapEl.id
  //       );
  //       console.log(recipeLocal);
  //       // if (recipeLocal.checked === true) {
  //       //   mapEl.checked = true;
  //       //   console.log('true', mapEl);
  //       // }
  //       console.log(mapEl);
  //       return mapEl;
  //     });
  //     console.log(temp);
  //     return;
  //   });
  // }, []);
  let tempSumState = [];
  const sortAlphabetically = array => {
    return array.sort((a, b) => a.nameKey.localeCompare(b.nameKey));
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
    // // // check current if checked && sum< keep it , else change to new value
    setIngredientsSumListState(prev => {
      const temp = tempSumState.map(el => {
        const [prevEl = { checked: false }] = prev.filter(
          filterEl => filterEl.nameKey === el.nameKey
        );
        if (prevEl.checked === false) return el;
        if (prevEl.checked === true) {
          el.checked = true;
          const currentSum = sumOfArray(el.quantity);
          const newSum = sumOfArray(prevEl.quantity);
          if (newSum >= currentSum) return el;
          if (newSum < currentSum) {
            el.checked = false;
            return el;
          }
        }
      });
      prev = sortAlphabetically(temp);
      return prev;
    });
  };
  const sumOfArray = array => {
    return array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };
  const createSumItem = (ingredientName, nameKey, quantity, unit) => {
    // // // check if sumItem exist if not create one
    const sumItem = tempSumState.filter(el => el.nameKey === nameKey);
    if (sumItem.length === 0) {
      tempSumState = [
        ...tempSumState,
        newSumItem(ingredientName, nameKey, quantity, unit),
      ];
      return;
    }
    // // // if sumItem exist check unit and add if it fits, else create sumItem
    const [addIfUnitIdentical] = sumItem.filter(el => el.unit === unit);
    if (addIfUnitIdentical) {
      addIfUnitIdentical.add(+quantity);
      return;
    } else {
      tempSumState = [
        ...tempSumState,
        newSumItem(ingredientName, nameKey, quantity, unit),
      ];
      return;
    }
  };
  const newSumItem = (ingredientName, nameKey, quantity, unit) => {
    return new ingredientSumItem(ingredientName, nameKey, +quantity, unit);
    tempSumState = [...tempSumState, newSumItem];
  };
  const evaluateQuantityUnit = (quantityInput, inputUnit) => {
    const quantity = +quantityInput.replace(/,/g, '.');
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
  useEffect(() => {
    setShoppingListState(dataCtx.shoppingList);
    createSumList(shoppingListState);
  }, [
    snap.headerText === 'Einkaufsliste',
    snap.listEditHide,
    dataCtx.shoppingList,
    shoppingListState,
  ]);
  //==================================================================
  const onRoundButtonHandler = btnId => {
    if (btnId === 'add') {
      state.listEditHide = false;
      if (btnId === 'add') {
        state.shoppingList.editMode = true;
        state.headerText = 'Zur Einkaufsliste hinzufügen';
      }
    }
  };
  // // // //==================================================================
  // // // // // // avoidList
  const avoidInitialState = dataCtx.menuState.shoppingListSettings.avoidList;
  const [avoidListState, setAvoidListState] = useState(avoidInitialState);
  useEffect(() => {
    setAvoidListState(avoidInitialState);
  }, [avoidListState, avoidInitialState]);

  const avoidArray = avoidListState
    .toLowerCase()
    .split(',')
    .map(el => el.trim());
  //==================================================================
  const onCheckButtonHandler = nameKey => {
    toggleIngredientCheck(nameKey);
  };
  const toggleIngredientCheck = nameKey => {
    setIngredientsSumListState(prev => {
      return [
        ...prev.map(el => {
          if (el.nameKey === nameKey) {
            el.checked = !el.checked;
          }
          return el;
        }),
      ];
    });
  };
  const updateShoppingList = listState => {
    state.headerText = 'Einkaufsliste';
    state.searchBarHide = true;
    if (listState !== 'x') updateData('SHOP', { shoppingListState: listState });
  };
  //==================================================================
  const liItemChecked = checkState => {
    return ingredientsSumListState
      .filter(el => el.checked === checkState)
      .filter(el => !avoidArray.some(ar => ar === el.nameKey))
      .map((item, i) => {
        return (
          <li key={item.id}>
            <ShoppingListItem
              name={item.name}
              quantity={item.sum()}
              unit={item.unit}
              checkButtonHandler={onCheckButtonHandler}
              id={item.nameKey}
              checked={item.checked}
            ></ShoppingListItem>
          </li>
        );
      });
  };
  //==================================================================
  const listArray = [...liItemChecked(false), ...liItemChecked(true)];
  const onTrashClickHandler = () => {
    props.message({
      title: 'Alles Löschen ?',
      message: 'Es werden alle Einträge der Einkaufsliste gelöscht !',
      showBtnX: true,
      confirm: deleteShoppingList,
    });
  };
  const deleteShoppingList = () => {
    updateShoppingList([]);
    setShoppingListState([]);
  };
  //==================================================================
  //==================================================================
  return (
    <div className={`${classes.contentListBox} `}>
      <SearchBar
        searchInput={searchInput}
        inputChangeHandler={searchChangeHandler}
      ></SearchBar>
      <ListEdit
        searchInput={searchInput}
        list={{
          recipeList: dataCtx.recipeList,
          recipeEditList: shoppingListState,
        }}
        onUpdateList={updateShoppingList}
      ></ListEdit>
      {/* //fallback for empty List */}
      {shoppingListState.length === 0 && dataCtx.recipeList.length === 0 && (
        <div className={classes.contentListBox__emptyList}>
          <WeeklyPlanItem
            day={'Die Rezeptliste ist leer !'}
            recipe={'Bitte erst Rezepte hinzufügen'}
            checkButtonHide={true}
          ></WeeklyPlanItem>
        </div>
      )}
      {shoppingListState.length === 0 && dataCtx.recipeList.length !== 0 && (
        <div
          className={classes.contentListBox__emptyList}
          onClick={() => {
            onRoundButtonHandler('add');
          }}
        >
          <WeeklyPlanItem
            day={'Die Einkaufsliste ist aktuell leer !'}
            recipe={'jetzt hinzufügen ?'}
            checkButtonHide={true}
          ></WeeklyPlanItem>
        </div>
      )}
      <ul className={classes.contentListBox__ul}>
        {listArray}
        {/* {liItemChecked(false)}
        {liItemChecked(true)} */}
        {shoppingListState.length > 0 && (
          <ButtonRound
            btnId="trash"
            key={'trashAll'}
            className={classes.buttonTrash}
            buttonName={'trash'}
            color={'#20c99740'}
            iconColor={'#97150b'}
            buttonSize={'large'}
            onClickHandler={onTrashClickHandler}
          />
        )}
      </ul>
      <ButtonBoxContent
        onRoundButtonHandler={onRoundButtonHandler}
        coinHide={true}
        gearShow={true}
      ></ButtonBoxContent>
    </div>
  );
};
export default ShoppingList;
