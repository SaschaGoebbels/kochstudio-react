import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';
import Header from '../../header/Header';
import Content from '../../ui/Content';
import SearchBar from '../../ui/SearchBar';
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
  const listClickHandler = item => {
    // console.log(item);
    updateData('PLAN', item);
  };
  const onButtonBoxHandler = btnId => {
    if (btnId === 'x') state.weeklyPlan.editMode = false;
    console.log(snap.weeklyPlan.editMode);
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
              weeklyPlan={true}
              // setCurrentRecipeList={props.setCurrentRecipeList}
              // weeklyPlan={dataCtx.weeklyPlan}
              listClickHandler={listClickHandler}
              showFavList={false}
              searchInput={''}
              // listItemColor={'#fff'}
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
