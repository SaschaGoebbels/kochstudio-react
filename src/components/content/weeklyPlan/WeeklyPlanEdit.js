import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';
import Header from '../../header/Header';
import Content from '../../ui/Content';
// import SearchBar from '../../ui/SearchBar';
import RecipeListBox from '../recipeList/RecipeListBox';
import Footer from '../../ui/Footer';
import ButtonBox from '../../ui/ButtonBox';
import classes from './WeeklyPlanEdit.module.css';

import { state } from '../../store/state';
import { useSnapshot } from 'valtio';

const WeeklyPlanEdit = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();
  const [currentRecipeList, setCurrentRecipeList] = useState(
    dataCtx.recipeList
  );
  const [weeklyPlanState, setWeeklyPlanState] = useState(dataCtx.weeklyPlan);

  const listClickHandler = itemId => {
    setWeeklyPlanState(prev => {
      prev.filter(el => {
        if (el.id === itemId) {
          console.log('remove');
          return;
        }
      });
      return [
        ...prev,
        dataCtx.recipeList.filter(el => {
          if (el.id === itemId) return el;
        }),
      ];
    });
    setCurrentRecipeList(prev => {
      return prev.map(el => {
        if (el.id === itemId) {
          el.weeklyPlan = !el.weeklyPlan;
          return el;
        }
        return el;
      });
    });
  };
  const onButtonBoxHandler = btnId => {
    if (btnId === 'check') updateData('PLAN', { currentRecipeList });
    state.weeklyPlan.editMode = false;
    state.headerText = 'Wochenplan';
    state.searchBarHide = true;
  };
  return (
    <div
      className={`${classes.planEdit} ${
        !snap.weeklyPlan.editMode && classes['planEdit--hide']
      }`}
    >
      <Content
        content={
          <div>
            <RecipeListBox
              recipeList={dataCtx.recipeList}
              weeklyPlan={weeklyPlanState}
              listClickHandler={listClickHandler}
              showFavList={false}
              searchInput={props.searchInput}
              listItemDefaultStyle={{
                backgroundColor: '#93f9d7',
                border: 'var(--clr_border) solid 2px',
              }}
              listItemCheckedStyle={{
                backgroundColor: '#e8f9f4',
                border: 'var(--clr_border) solid 2px',
              }}
            ></RecipeListBox>
          </div>
        }
      ></Content>
      <Footer
        footerContent={
          <ButtonBox onClickHandler={onButtonBoxHandler} hideTrash={true} />
        }
      ></Footer>
    </div>
  );
};

export default WeeklyPlanEdit;
