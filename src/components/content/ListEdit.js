import React, { useState, useContext, useEffect } from 'react';
import DataProvider, { DataContext } from '../store/DataProvider';

import Header from '../header/Header';
import Content from '../ui/Content';
import RecipeListBox from './recipeList/RecipeListBox';
import Footer from '../ui/Footer';
import ButtonBox from '../ui/ButtonBox';
import classes from './ListEdit.module.css';

import { state } from '../store/state';
import { useSnapshot } from 'valtio';

const ListEdit = props => {
  const snap = useSnapshot(state);
  const dataCtx = useContext(DataContext);

  const initialState = {
    recipeList: props.list.recipeList,
    recipeEditList: props.list.recipeEditList,
  };
  const [listState, setListState] = useState({
    recipeList: props.list.recipeList,
    recipeEditList: props.list.recipeEditList,
  });

  useEffect(() => {
    setListState({
      recipeList: props.list.recipeList,
      recipeEditList: props.list.recipeEditList,
    });
  }, [snap.listEditHide]);
  // // // receive listClick from recipeListBox handle state to update list
  const listClickHandler = item => {
    setListState(prev => {
      if (prev.recipeEditList.some(el => el.id === item.id)) {
        prev.recipeEditList = [
          ...prev.recipeEditList.filter(el => {
            if (el.id !== item.id) return el;
          }),
        ];
        return { ...prev };
      }
      prev.recipeEditList = [
        ...prev.recipeEditList,
        ...prev.recipeList.filter(el => {
          if (el.id === item.id) return el;
        }),
      ];
      return { ...prev };
    });
  };

  const onButtonBoxHandler = btnId => {
    if (btnId === 'check') props.onUpdateList(listState.recipeEditList);
    setListState(initialState);
    state.listEditHide = true;
    if (btnId === 'x') props.onUpdateList('x');
  };
  return (
    <div
      className={`${classes.planEdit} ${
        snap.listEditHide && classes['planEdit--hide']
      }`}
    >
      <Content
        content={
          <div>
            <RecipeListBox
              recipeList={listState.recipeList}
              recipeEditList={listState.recipeEditList}
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

export default ListEdit;
