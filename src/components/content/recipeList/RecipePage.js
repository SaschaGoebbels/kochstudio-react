import React from 'react';
import classes from './RecipePage.module.css';

import Header from '../../header/Header';
import Content from '../../ui/Content';
import Footer from '../../ui/Footer';
import Navbar from '../../navbar/Navbar';
import NavbarButton from '../../navbar/NavbarButton';
import NavbarContext from '../../store/navbar-context';

// put recipe page into content/recipeList

const RecipePage = props => {
  const onMenuButtonHandler = () => {
    console.log('menu');
  };
  return (
    <div
      className={`${classes.recipePage} ${
        props.hideRecipePage && classes['recipePage--hide']
      }`}
    >
      <Header
        headerText={props.headerText}
        onMenuButton={onMenuButtonHandler}
      />
      <Content content={'test'}></Content>

      <Footer footerContent={<Navbar iconColor={'#20c997'}></Navbar>}></Footer>
    </div>
  );
};

export default RecipePage;
