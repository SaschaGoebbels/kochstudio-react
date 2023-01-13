import classes from './App.module.css';
import React, { useState } from 'react';

import Header from './components/header/header';
import Content from './components/content/content';
import Navbar from './components/navbar/navbar';
const recipe_obj = {
  recipe_list: [
    {
      name: 'Aus nix irgend was',
      fav: true,
      ingredients: [
        ['Nudel', ' ', ' '],
        ['Paprika', ' ', ' '],
        ['Eier', ' ', ' '],
        ['Würstchen', ' ', ' '],
        ['Sucuk', '200', 'g'],
      ],
      preparation: '',
    },
    {
      name: 'Bratwurst',
      fav: true,
      ingredients: [
        ['Bratwurst', ' ', ' '],
        ['Kartoffeln', ' ', ' '],
      ],
      preparation: '5zhbh',
    },
    {
      name: 'Chili con carne',
      fav: true,
      ingredients: [
        ['Hackfleisch', ' ', ' '],
        ['Bonen', ' ', ' '],
        ['Mais', ' ', ' '],
        ['gehackte Tomaten', ' ', ' '],
        ['Test', '2', 'Stk.'],
      ],
      preparation: '',
    },
    {
      name: 'Curry Banane',
      fav: false,
      ingredients: [
        ['Hähnchenfleisch', '500', 'g'],
        ['Karotten', '3', 'Stk.'],
        ['Lauch', '1', 'Stk.'],
        ['Ingwer', '2', 'EL'],
        ['Zwiebel', '1', 'Stk.'],
        ['Paprika', '2', 'Stk.'],
        ['Curry fix', '1', 'Stk.'],
        ['Knoblauchzehen', '3', 'Stk.'],
        ['Banane', '2', 'Stk.'],
        ['Milch ', '0.5', 'l'],
        ['Salz', '1', 'Priese'],
        ['Pfeffer', '1', 'Priese'],
        ['Curry', '1', 'Priese'],
        ['Chili', '2', 'Stk.'],
        ['Kartoffeln', '1', 'kg'],
      ],
      preparation: '',
    },
    {
      name: 'Curry Banane',
      fav: false,
      ingredients: [
        ['Hähnchenfleisch', '500', 'g'],
        ['Karotten', '3', 'Stk.'],
        ['Lauch', '1', 'Stk.'],
        ['Ingwer', '2', 'EL'],
        ['Zwiebel', '1', 'Stk.'],
        ['Paprika', '2', 'Stk.'],
        ['Curry fix', '1', 'Stk.'],
        ['Knoblauchzehen', '3', 'Stk.'],
        ['Banane', '2', 'Stk.'],
        ['Milch ', '0.5', 'l'],
        ['Salz', '1', 'Priese'],
        ['Pfeffer', '1', 'Priese'],
        ['Curry', '1', 'Priese'],
        ['Chili', '2', 'Stk.'],
        ['Kartoffeln', '1', 'kg'],
      ],
      preparation: '',
    },
    {
      name: 'Frikadellen',
      fav: false,
      ingredients: [
        ['Hackfleisch', ' ', ' '],
        ['Brötchen', ' ', ' '],
        ['Eier', ' ', ' '],
        ['Gewürze', ' ', ' '],
      ],
      preparation: 'Zhhh',
    },
    {
      name: 'Kartoffel-Auflauf',
      fav: false,
      ingredients: [],
      preparation: '',
    },
    {
      name: 'Kartoffelecken',
      fav: false,
      ingredients: [
        ['Kartoffeln', ' ', ' '],
        ['Zwiebeln', ' ', ' '],
      ],
      preparation: '',
      test: true,
    },
    {
      name: 'Kürbiscreme-Suppe',
      fav: false,
      ingredients: [],
      preparation: '',
    },
    {
      name: 'Lasagne',
      fav: true,
      ingredients: [
        ['Rinderhack', ' ', ' '],
        ['Lasagne Blätter', ' ', ' '],
        ['Zwiebeln', ' ', ' '],
        ['Creme Fraiche', ' ', ' '],
      ],
      preparation:
        'Rrrr\nR\nR\nR\nR\nR\n\nGgg\nF\n\nF\n\nTr\n\n\nF\n\n\n\n\nHhjj\n\nF\nD\nDffff\nT\nF\nFf\n\n',
    },
    {
      name: 'Majoran Klöße',
      fav: false,
      ingredients: [
        ['Kartoffel', '500', 'g'],
        ['Ei', '1', 'Stk.'],
        ['Eigelb ', '1', 'Stk.'],
        ['Mehl', '150', 'g'],
        ['Majoran ', '4', 'TL'],
        ['Salz', '1', 'TL'],
        ['Pfeffer', '', '--'],
      ],
      preparation:
        'Kartoffel ein Tag früher kochen. \nca 20 Minuten bis sie von der Gabel rutschen \nKartoffel stampfen \nalle Zutaten vermischen \nKlöße formen \nin salzwasser aufkochen \nDann ca 20 bis 25 Minuten bei mittlerer Hitze ziehen lassen bis sie schwimme.',
    },
    {
      name: 'Maultaschen-Suppe',
      fav: true,
      ingredients: [
        ['Maultaschen', ' ', ' '],
        ['Lauch', ' ', ' '],
        ['Würstchen', ' ', ' '],
        ['Brokkoli', ' ', ' '],
        ['Karotten', ' ', ' '],
        ['Chilli', ' ', ' '],
        ['Ingwer', ' ', ' '],
        ['Zwiebel', '1000', 'Stk.'],
      ],
      preparation: '',
      test: true,
    },
    {
      name: 'Reis-Spezial',
      fav: false,
      ingredients: [['Reis', '300', 'g']],
      preparation: '',
    },
    {
      name: 'Rennfahrersuppe',
      fav: false,
      ingredients: [
        ['Haferflocken', '4', 'EL'],
        ['Eier ', '1', 'Stk.'],
        ['Klare Fleischbrühe', '2', 'Stk.'],
        ['Wasser', '1', 'l'],
        ['Hähnchenfleisch', '400', 'g'],
      ],
      preparation: '',
    },
    {
      name: 'Rindergulasch',
      fav: true,
      ingredients: [
        ['Rindfleisch', ' ', ' '],
        ['Zwiebeln', ' ', ' '],
        ['Rinderbrühe', ' ', ' '],
        ['Gewürze', ' ', ' '],
      ],
      preparation: '',
    },
    {
      name: 'Spaghetti',
      fav: false,
      ingredients: [
        ['Nudel', 300, 'g'],
        ['Tomatensoße', 1, 'Stk.'],
        ['Passierte Tomaten', 1, 'Stk.'],
        ['Zwiebel', '1', 'g'],
      ],
      preparation: 'Zubereitung',
      test: true,
    },
    {
      name: 'ToGeNu-Pfanne',
      fav: false,
      ingredients: [
        ['Nudel', ' ', ' '],
        ['Zucchini', ' ', ' '],
        ['Kohlrabi', ' ', ' '],
        ['Zwiebel', '', 'g'],
      ],
      preparation: '',
      test: true,
    },
    {
      name: 'Tortellini',
      fav: true,
      ingredients: [
        ['Sahne', ' ', ' '],
        ['Milch', ' ', ' '],
        ['Tortellini', ' ', ' '],
      ],
      preparation: 'Tgggh',
    },
    {
      name: 'Wirsing-Gemüse',
      fav: false,
      ingredients: [
        ['Wirsing', ' ', ' '],
        ['Zwiebeln', ' ', ' '],
        ['Milch', ' ', ' '],
        ['Muskat', ' ', ' '],
      ],
      preparation: '',
    },
  ],
  shopping_list: {},
  weekly_plan: {},
};
function App() {
  const [recipeObj, setRecipeObj] = useState([]);
  const navChangeHandler = el => {
    // console.log(el);
  };
  const onMenuButtonHandler = () => {
    // console.log('APP-Menu-Button');
  };
  const navIconHandler = el => {
    // console.log('app-js', el);
  };
  const onAddRecipeHandler = () => {
    //push
  };
  let changeHeaderText = 'Gerichte';
  return (
    <div className={classes.App}>
      <Header
        headerText={changeHeaderText}
        onMenuButton={onMenuButtonHandler}
      />
      <Content
        recipe_obj={recipe_obj}
        onAddRecipe={onAddRecipeHandler}
      ></Content>
      <Navbar navIcon={navIconHandler} navChange={navChangeHandler}></Navbar>
    </div>
  );
}

export default App;
