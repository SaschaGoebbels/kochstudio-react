import React, { useState, useReducer, useContext } from 'react';
import { useEffect } from 'react';

export const DataContext = React.createContext(null);
const DataUpdate = React.createContext();
export function useDataUpdate() {
  return useContext(DataUpdate);
}

const dataInit = {
  addItem: recipe => {},
  removeItem: recipe => {},
  inputCurrentValue: {
    recipeName: '',
    ingredients: [],
    preparation: '',
  },
  recipeList: [
    {
      name: 'Arme Ritter',
      fav: false,
      ingredients: [
        ['Mehl', '300', 'g'],
        ['Eier', '5', 'Stk.'],
        ['Milch', '300', 'ml'],
        ['Toastbrot ', '0.5', 'Stk.'],
        ['Salz', '1', 'TL-gestr.'],
      ],
      preparation: 'Mittlere Stufe am Herd \nBeidseitig ca 3 Minuten',
      id: '759e69c2-9ab5-231b-0d59-e15339b60270',
    },
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
      id: 'e3ab4a12-bcb5-b13e-fd64-d2f156d7de3e',
    },
    {
      name: 'Bratwurst',
      fav: false,
      ingredients: [
        ['Bratwurst', ' ', ' '],
        ['Kartoffeln', ' ', ' '],
      ],
      preparation: '',
      id: '982dd7b4-7a07-c39d-b6df-92dd9b32a648',
    },
    {
      name: 'Chili con carne',
      fav: true,
      ingredients: [
        ['Hackfleisch', ' ', ' '],
        ['Bonen', ' ', ' '],
        ['Mais', ' ', ' '],
        ['gehackte Tomaten', ' ', ' '],
      ],
      preparation: '',
      id: 'b935b43f-ca47-91a7-8a89-7f1fbb6697d0',
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
      ],
      preparation: '',
      id: 'f371b8ae-97aa-8aaa-f664-17d3c0f73997',
    },
    {
      name: 'Eierpfannkuchen',
      fav: false,
      ingredients: [
        ['Eier', '4', 'Stk.'],
        ['Mehl', '400', 'g'],
        ['Milch', '350', 'ml'],
        ['Salz', '0.5', 'TL-gestr.'],
      ],
      preparation:
        'Mehl sieben,\nEier dazugeben,\nlangsam Milch dazu bis der Teig okay ist.\nMittlere Hitze \nca 2 Minuten pro Seite',
      id: '400feff4-f2b7-3225-1e11-c5e42c11b308',
    },
    {
      name: 'Frikadellen',
      fav: true,
      ingredients: [
        ['Hackfleisch', '500', 'g'],
        ['Zwiebel', '1', 'Stk.'],
        ['BrÃ¶tchen', '', 'Stk.'],
        ['Ei', '1', 'Stk.'],
        ['Salz', '1', 'TL-gestr.'],
        ['Senf ', '1', 'TL'],
        ['Majoran', '1', 'TL-gestr.'],
        ['Paprikapulver', '1', 'TL'],
        ['Pfeffer', '1.5', 'TL'],
        ['Knoblauch', '2', 'Stk.'],
        ['Maggi ', '1', 'TL'],
        ['Fetakäse', '1', 'Stk.'],
        ['Muskat', '1', 'TL-gestr.'],
      ],
      preparation:
        'Das Brötchen einweichen und ausdrÃ¼cken \nAlle Zutaten gut vermischen Frikadellen mit KÃ¤se in der Mitte Formen \nVon beiden Seiten scharf anbraten anschlieÃŸend ca 15 bis 20 Minuten auf mittlere Hitze braten',
      id: '26a31e77-ba2a-366f-ce01-94b78e656ab0',
    },
    {
      name: 'Kartoffelecken',
      fav: true,
      ingredients: [
        ['Kartoffeln', ' ', ' '],
        ['Zwiebeln', ' ', ' '],
      ],
      preparation: '',
      test: true,
      id: '43626c25-9b64-23f6-ae39-6c273f288758',
    },
    {
      name: 'Kartoffelpfannkuchen',
      fav: false,
      ingredients: [
        ['Kartoffel', '1.6', 'kg'],
        ['Karotte', '200', 'g'],
        ['Mehl', '150', 'g'],
        ['Pfeffer', '8', 'g'],
        ['Salz', '4', 'g'],
        ['Muskat ', '0.5', 'TL-gestr.'],
        ['Eier ', '4', 'Stk.'],
      ],
      preparation: '',
      id: 'e88d8b0d-5783-fdd7-3375-8c080db35be0',
    },
    {
      name: 'Kürbiscreme-Suppe',
      fav: false,
      ingredients: [],
      preparation: '',
      id: '4f8a9f4f-e666-e3a7-10d2-2546bd20c68c',
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
      preparation: 'Rrrr\nR\nR\nR\nR\nR\n\nGgg\nF\n\nF\n\n\n',
      id: '79e8b3d5-cfb4-d371-2f43-ef7c45beba04',
    },
    {
      name: 'Majoran Klöße',
      fav: true,
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
        'Kartoffel ein Tag frÃ¼her kochen. \nca 20 Minuten bis sie von der Gabel rutschen \nKartoffel stampfen \nalle Zutaten vermischen \nKlÃ¶ÃŸe formen \nin salzwasser aufkochen \nDann ca 20 bis 25 Minuten bei mittlerer Hitze ziehen lassen bis sie schwimme.',
      id: '01304d6d-11b0-9302-9d7f-de6fd1915537',
    },
    {
      name: 'Maultaschen-Suppe',
      fav: true,
      ingredients: [
        ['Maultaschen', ' ', ' '],
        ['Lauch', ' ', ' '],
        ['WÃ¼rstchen', ' ', ' '],
        ['Brokkoli', ' ', ' '],
        ['Karotten', ' ', ' '],
        ['Chilli', ' ', ' '],
        ['Ingwer', ' ', ' '],
      ],
      preparation: '',
      test: true,
      id: '0e91d717-1c73-70c6-7681-9e081003f540',
    },
    {
      name: 'Pfannkuchen Spezial',
      fav: false,
      ingredients: [
        ['Kartoffel', '1.6', 'kg'],
        ['Karotte', '200', 'g'],
        ['Mehl', '150', 'g'],
        ['Pfeffer', '8', 'g'],
        ['Salz', '4', 'g'],
        ['Muskat ', '0.5', 'TL-gestr.'],
        ['Eier ', '4', 'Stk.'],
      ],
      preparation: '',
      id: '0638cee2-4b4b-75a7-d6b5-aaa641aac1d5',
    },
    {
      name: 'Reis-Spezial',
      fav: false,
      ingredients: [['Reis', '300', 'g']],
      preparation: '',
      id: '23f25675-323f-bb0f-be96-25296f864ce3',
    },
    {
      name: 'Rennfahrersuppe',
      fav: false,
      ingredients: [
        ['Haferflocken', '4', 'EL'],
        ['Eier ', '1', 'Stk.'],
        ['Klare Fleischbrühe', '2', 'Stk.'],
        ['Wasser', '1', 'l'],
        ['HÃ¤hnchenfleisch', '400', 'g'],
      ],
      preparation: '',
      id: '93c89814-8009-8734-6b00-da6494e5fa47',
    },
    {
      name: 'Rindergulasch',
      fav: true,
      ingredients: [
        ['Rindfleisch', '1', 'kg'],
        ['Zwiebel ', '2', 'Stk.'],
        ['Paprikamark ', '4', 'EL'],
        ['Paprika', '1', 'Stk.'],
        ['Karotte', '2', 'Stk.'],
        ['Zucker ', '1', 'Priese'],
        ['Knoblauchzehen', '4', 'Stk.'],
        ['Salz Pfeffer', '1', 'Priese'],
        ['Paprikapulver', '1', 'Priese'],
        ['Ã–l ', '', '--'],
      ],
      preparation:
        'Fleisch abbrausen trocken würfeln in heißen Öl anbraten.\nSalz Knobi Pfeffer Papierpulver. \nZwiebeln wÃ¼rfeln und mit anbraten Paprikamarkt zufÃ¼gen \nAlles anschwitzen \n1,5 Liter rinderbrÃ¼he dazu\n90 Minuten kochen kleingestÃ¤nde Paprika und Karotten dazu mit 0,5 Liter RinderbrÃ¼he nochmals weiterkochen lassen zum Schluss abschmecken und etwas Zucker dazu.',
      id: '952be5dd-79f6-0924-b6bf-3920bbb436a1',
    },
    {
      name: 'Spaghetti',
      fav: false,
      ingredients: [
        ['Nudel', 300, 'g'],
        ['TomatensoÃŸe', 1, 'Stk.'],
        ['Passierte Tomaten', 1, 'Stk.'],
        ['Zwiebel', '1', 'g'],
      ],
      preparation: 'Zubereitung',
      test: true,
      id: 'f2295e8e-1e44-b79a-75bb-4e829358a7dd',
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
      id: 'a3f8b645-a6ca-c482-f9b9-953b6e6a1295',
    },
    {
      name: 'Tortellini',
      fav: true,
      ingredients: [
        ['Milch', ' ', ' '],
        ['Tortellini', ' ', ' '],
        ['Sahne ', '1', 'Stk.'],
      ],
      preparation: 'Tgggh\nTest 123\nXxx',
      id: '35b894c1-363b-b719-e317-4102195e8d3b',
    },
    {
      name: 'Wasserspatzen',
      fav: false,
      ingredients: [
        ['Mehl', '300', 'g'],
        ['Eier', '4', 'Stk.'],
        ['Salz', '1', 'TL-gestr.'],
        ['Wasser', '130', 'ml'],
      ],
      preparation: '',
      id: 'a46211e8-1b33-6ffe-09b7-b02f000ef178',
    },
    {
      name: 'Weltbester Kuchen',
      fav: false,
      ingredients: [
        ['Eier', '4', 'Stk.'],
        ['Butter', '250', 'g'],
        ['Mehl', '250', 'g'],
        ['Zucker', '250', 'g'],
        ['Backpulver', '1', 'Stk.'],
        ['Vanillezucker', '1', 'Stk.'],
        ['Zimt', '1', 'TL'],
        ['Rotwein', '125', 'ml'],
        ['Schokopuddingpulver', '1', 'Stk.'],
        ['Schoko Splitter zartbitter', '1', 'Stk.'],
        ['Kuchenglasur zartbitter', '1', 'Stk.'],
      ],
      preparation:
        'Alle Zutaten vermengen.\nKuchenform mit Butter und  Paniermehl ausstreichen.\nBackofen auf 175 Grad \nBackzeit 60 Minuten \n\nTipp: \nBackform nicht zu voll \nmaximal 2/3',
      id: 'f08bbec8-4463-a665-24ca-1ca40f51f0a9',
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
      preparation: 'Anleitung',
      id: '7fcd7c46-20ef-b983-265c-8f7f3748153e',
    },
  ],
};

const defaultInputState = {
  recipeName: '',
  ingredients: [],
  preparation: '',
};
//==================================================================
const dataReducer = (state, action) => {
  if (action.type === 'INPUT') {
    // console.log(state.recipeList);
    state.recipeList.push(action.recipeInput);
    return state;
  }
  return state;
};
//==================================================================

const DataProvider = props => {
  const [dataState, dispatchData] = useReducer(dataReducer, dataInit);
  //==================================================================
  // useEffect(() => {
  const dataUpdateFunction = dataUpdate => {
    if (dataUpdate.type === 'INPUT') {
      dispatchData(dataUpdate);
    }
    console.log('dataUpdate', dataUpdate.recipeInput);
  };
  // }, []);
  //==================================================================
  //==================================================================
  return (
    <DataContext.Provider value={dataState}>
      <DataUpdate.Provider value={dataUpdateFunction}>
        {props.children}
      </DataUpdate.Provider>
    </DataContext.Provider>
  );
};

export default DataProvider;
