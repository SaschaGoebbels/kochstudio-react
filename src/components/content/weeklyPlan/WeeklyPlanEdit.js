import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../../store/DataProvider';
import { useDataUpdate } from '../../store/DataProvider';
import Header from '../../header/Header';
import Content from '../../ui/Content';
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
  //==================================================================
  const weeklyPlanInitial = dataCtx.appData.recipeList.filter(el => {
    if (el.weeklyPlan === true) return el;
  });
  const [weeklyPlanState, setWeeklyPlanState] = useState(weeklyPlanInitial);

  useEffect(() => {
    setWeeklyPlanState(weeklyPlanInitial);
  }, [snap.weeklyPlan.editMode]);
  //==================================================================
  // // // //==================================================================
  // // // const [weeklyPlanState, setWeeklyPlanState] = useState(
  // // //   dataCtx.appData.weeklyPlan
  // // // );
  // // // useEffect(() => {
  // // //   setWeeklyPlanState(dataCtx.appData.weeklyPlan);
  // // // }, [snap.weeklyPlan.editMode]);
  // // // //==================================================================

  const listClickHandler = item => {
    ////////////////// TODO //////////////////
    // fetch update plan
    //==================================================================
    console.log('✅', item);
    setWeeklyPlanState(prev => {
      if (prev.some(el => el.id === item.id)) {
        return [
          ...prev.filter(el => {
            if (el.id !== item.id) return el;
          }),
        ];
      }
      return [
        ...prev,
        ...dataCtx.appData.recipeList.filter(el => {
          if (el.id === item.id) return el;
        }),
      ];
    });
    //==================================================================
    // // // //==================================================================
    // // // console.log('✅', item);
    // // // setWeeklyPlanState(prev => {
    // // //   if (prev.some(el => el.id === item.id)) {
    // // //     return [
    // // //       ...prev.filter(el => {
    // // //         if (el.id !== item.id) return el;
    // // //       }),
    // // //     ];
    // // //   }
    // // //   return [
    // // //     ...prev,
    // // //     ...dataCtx.appData.recipeList.filter(el => {
    // // //       if (el.id === item.id) return el;
    // // //     }),
    // // //   ];
    // // // });
    // // // //==================================================================
  };
  const onButtonBoxHandler = btnId => {
    if (btnId === 'check') updateData('PLAN', { weeklyPlanState });
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
              recipeList={dataCtx.appData.recipeList}
              recipeEditList={weeklyPlanState}
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
