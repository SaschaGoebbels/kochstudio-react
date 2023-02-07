import React, { useState, useReducer, useContext } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { state } from '../store/state';
import { snapshot, useSnapshot } from 'valtio';

export const UPDATERECIPE = 'UPDATERECIPE';

export const DataContext = React.createContext(null);
const DataUpdate = React.createContext();
export function useDataUpdate() {
  return useContext(DataUpdate);
}
//==================================================================
//==================================================================
//default data for test purposes
const dataInit = {
  weeklyPlan: [
    {
      name: 'Aus nix irgend was',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Nudel',
          quantity: ' ',
          unit: ' ',
          id: '08c31d35-54f9-9d31-7be4-412f5049973f',
          editMode: false,
        },
        {
          ingredientName: 'Paprika',
          quantity: ' ',
          unit: ' ',
          id: '7b73f90c-ad8d-7b1e-9699-10e68f7b03dd',
          editMode: false,
        },
        {
          ingredientName: 'Eier',
          quantity: ' ',
          unit: ' ',
          id: '95b2cdeb-ed2f-6297-a4e4-2531c009c843',
          editMode: false,
        },
        {
          ingredientName: 'Würstchen',
          quantity: ' ',
          unit: ' ',
          id: '127940b8-166a-e01c-c3a5-f6406be96471',
          editMode: false,
        },
        {
          ingredientName: 'Sucuk',
          quantity: '200',
          unit: 'g',
          id: '82fddd2d-e8fa-b064-1ae1-3b3e041e9646',
          editMode: false,
        },
      ],
      preparation: '',
      id: 'e3ab4a12-bcb5-b13e-fd64-d2f156d7de3e',
    },
    {
      name: 'Bratwurst',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Bratwurst',
          quantity: ' ',
          unit: ' ',
          id: '9144a210-3da0-3b54-f91f-fc2778586fb6',
          editMode: false,
        },
        {
          ingredientName: 'Kartoffeln',
          quantity: ' ',
          unit: ' ',
          id: 'f12976d4-caba-c1dd-1b7c-fcad0f2da8b3',
          editMode: false,
        },
      ],
      preparation: '',
      id: '982dd7b4-7a07-c39d-b6df-92dd9b32a648',
    },
  ],
  recipeList: [
    {
      name: 'Arme Ritter',
      fav: false,
      weeklyPlan: true,
      ingredients: [
        {
          ingredientName: 'Mehl',
          quantity: '300',
          unit: 'g',
          id: 'c2b1602f-e6f7-7597-82be-600a740b6bef',
          editMode: false,
        },
        {
          ingredientName: 'Eier',
          quantity: '5',
          unit: 'Stk.',
          id: 'c643a35b-efdb-0952-6dd8-6a5b46228d5a',
          editMode: false,
        },
        {
          ingredientName: 'Milch',
          quantity: '300',
          unit: 'ml',
          id: 'e261f15d-7c42-e2b8-3295-c170e6b38f04',
          editMode: false,
        },
        {
          ingredientName: 'Toastbrot ',
          quantity: '0.5',
          unit: 'Stk.',
          id: '402f316c-60d7-274e-cf27-4ea68e75e6ca',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'TL-gestr.',
          id: '643a6fa8-722d-d2ca-78b1-81ecbe780ec7',
          editMode: false,
        },
      ],
      preparation: 'Mittlere Stufe am Herd \nBeidseitig ca 3 Minuten',
      id: '759e69c2-9ab5-231b-0d59-e15339b60270',
    },
    {
      name: 'Aus nix irgend was',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Nudel',
          quantity: ' ',
          unit: ' ',
          id: '08c31d35-54f9-9d31-7be4-412f5049973f',
          editMode: false,
        },
        {
          ingredientName: 'Paprika',
          quantity: ' ',
          unit: ' ',
          id: '7b73f90c-ad8d-7b1e-9699-10e68f7b03dd',
          editMode: false,
        },
        {
          ingredientName: 'Eier',
          quantity: ' ',
          unit: ' ',
          id: '95b2cdeb-ed2f-6297-a4e4-2531c009c843',
          editMode: false,
        },
        {
          ingredientName: 'Würstchen',
          quantity: ' ',
          unit: ' ',
          id: '127940b8-166a-e01c-c3a5-f6406be96471',
          editMode: false,
        },
        {
          ingredientName: 'Sucuk',
          quantity: '200',
          unit: 'g',
          id: '82fddd2d-e8fa-b064-1ae1-3b3e041e9646',
          editMode: false,
        },
      ],
      preparation: '',
      id: 'e3ab4a12-bcb5-b13e-fd64-d2f156d7de3e',
    },
    {
      name: 'Bratwurst',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Bratwurst',
          quantity: ' ',
          unit: ' ',
          id: '9144a210-3da0-3b54-f91f-fc2778586fb6',
          editMode: false,
        },
        {
          ingredientName: 'Kartoffeln',
          quantity: ' ',
          unit: ' ',
          id: 'f12976d4-caba-c1dd-1b7c-fcad0f2da8b3',
          editMode: false,
        },
      ],
      preparation: '',
      id: '982dd7b4-7a07-c39d-b6df-92dd9b32a648',
    },
    {
      name: 'Chili con carne',
      fav: true,
      weeklyPlan: true,
      ingredients: [
        {
          ingredientName: 'Hackfleisch',
          quantity: ' ',
          unit: ' ',
          id: '87ef3e93-7f31-29a8-0005-673a963b8611',
          editMode: false,
        },
        {
          ingredientName: 'Bonen',
          quantity: ' ',
          unit: ' ',
          id: 'b2fb62d8-c2ad-265e-c735-63e2354bc520',
          editMode: false,
        },
        {
          ingredientName: 'Mais',
          quantity: ' ',
          unit: ' ',
          id: '5743f387-2113-62c7-2742-63b1a2c74e3b',
          editMode: false,
        },
        {
          ingredientName: 'gehackte Tomaten',
          quantity: ' ',
          unit: ' ',
          id: '693c0f1d-4358-5cda-7dee-d1d9d20fe1e0',
          editMode: false,
        },
      ],
      preparation: '',
      id: 'b935b43f-ca47-91a7-8a89-7f1fbb6697d0',
    },
    {
      name: 'Curry Banane',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Hähnchenfleisch',
          quantity: '500',
          unit: 'g',
          id: '23a7d7fd-29c1-faca-07e6-eab59db034b3',
          editMode: false,
        },
        {
          ingredientName: 'Karotten',
          quantity: '3',
          unit: 'Stk.',
          id: '75de7a4c-9793-f4a2-518d-f18c94ad169f',
          editMode: false,
        },
        {
          ingredientName: 'Lauch',
          quantity: '1',
          unit: 'Stk.',
          id: '73e143b1-8e76-2549-0ce6-4e09fbf5c0f4',
          editMode: false,
        },
        {
          ingredientName: 'Ingwer',
          quantity: '2',
          unit: 'EL',
          id: '7941fd43-e97c-b3b7-c162-c972812d3979',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebel',
          quantity: '1',
          unit: 'Stk.',
          id: '847c5055-a09f-9906-9ade-5c1e917d6eba',
          editMode: false,
        },
        {
          ingredientName: 'Paprika',
          quantity: '2',
          unit: 'Stk.',
          id: '4d174ecf-c0cc-a383-6548-ee0eaaf137f6',
          editMode: false,
        },
        {
          ingredientName: 'Curry fix',
          quantity: '1',
          unit: 'Stk.',
          id: '1b92e629-81a2-a9c8-e758-cad8a2ac37cf',
          editMode: false,
        },
        {
          ingredientName: 'Knoblauchzehen',
          quantity: '3',
          unit: 'Stk.',
          id: '2f3782ff-627a-f335-c6bc-5d337186299f',
          editMode: false,
        },
        {
          ingredientName: 'Banane',
          quantity: '2',
          unit: 'Stk.',
          id: 'fa0c99e0-02ca-1e55-7c31-0361b762e065',
          editMode: false,
        },
        {
          ingredientName: 'Milch ',
          quantity: '0.5',
          unit: 'l',
          id: '52718eb3-d6c1-2edc-765f-4c905d7e9ec2',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'Priese',
          id: '0c27597a-83d9-3b7b-ef94-613515c330b8',
          editMode: false,
        },
        {
          ingredientName: 'Pfeffer',
          quantity: '1',
          unit: 'Priese',
          id: 'ab19cddc-a758-c381-d461-e1d682382095',
          editMode: false,
        },
        {
          ingredientName: 'Curry',
          quantity: '1',
          unit: 'Priese',
          id: '44e5f3cc-414d-aefb-7a83-e44496701589',
          editMode: false,
        },
        {
          ingredientName: 'Chili',
          quantity: '2',
          unit: 'Stk.',
          id: '81139533-556c-a6a3-4d13-0faa601e5136',
          editMode: false,
        },
      ],
      preparation: '',
      id: 'f371b8ae-97aa-8aaa-f664-17d3c0f73997',
    },
    {
      name: 'Eierpfannkuchen',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Eier',
          quantity: '4',
          unit: 'Stk.',
          id: 'b0dcd5cc-c5a3-99f8-1342-5e4ba9347d72',
          editMode: false,
        },
        {
          ingredientName: 'Mehl',
          quantity: '400',
          unit: 'g',
          id: '7c931039-830d-f016-7b7b-d1cdf8d3ba62',
          editMode: false,
        },
        {
          ingredientName: 'Milch',
          quantity: '350',
          unit: 'ml',
          id: '72c88b5e-bd86-fd00-a127-4e29db0313ac',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '0.5',
          unit: 'TL-gestr.',
          id: 'dd2cb098-c779-fc36-c09a-653903b7a7c5',
          editMode: false,
        },
      ],
      preparation:
        'Mehl sieben,\nEier dazugeben,\nlangsam Milch dazu bis der Teig okay ist.\nMittlere Hitze \nca 2 Minuten pro Seite',
      id: '400feff4-f2b7-3225-1e11-c5e42c11b308',
    },
    {
      name: 'Frikadellen',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Hackfleisch',
          quantity: '500',
          unit: 'g',
          id: '35c2a314-7878-5cd0-5479-d7dae1775de0',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebel',
          quantity: '1',
          unit: 'Stk.',
          id: 'e64c50c3-4f51-3d2e-2360-97c6718568a6',
          editMode: false,
        },
        {
          ingredientName: 'BrÃ¶tchen',
          quantity: '',
          unit: 'Stk.',
          id: '8473daa0-7bbb-f007-52cc-c36d2898a790',
          editMode: false,
        },
        {
          ingredientName: 'Ei',
          quantity: '1',
          unit: 'Stk.',
          id: '3dd509a9-d47f-c6f3-9406-bb029d697270',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'TL-gestr.',
          id: '68eac87a-5170-9a94-13fa-912c58be9363',
          editMode: false,
        },
        {
          ingredientName: 'Senf ',
          quantity: '1',
          unit: 'TL',
          id: 'e6a1a758-6f2a-c62c-f42a-352e65680183',
          editMode: false,
        },
        {
          ingredientName: 'Majoran',
          quantity: '1',
          unit: 'TL-gestr.',
          id: 'fd566e60-80b1-a3d1-1411-68f086dd1674',
          editMode: false,
        },
        {
          ingredientName: 'Paprikapulver',
          quantity: '1',
          unit: 'TL',
          id: 'fb5e72fd-7df4-7791-536d-e39fefb230c0',
          editMode: false,
        },
        {
          ingredientName: 'Pfeffer',
          quantity: '1.5',
          unit: 'TL',
          id: '2351b584-f209-9090-5c0f-574ff1829735',
          editMode: false,
        },
        {
          ingredientName: 'Knoblauch',
          quantity: '2',
          unit: 'Stk.',
          id: '1726d1bd-2d04-c7e0-dde3-e14f80b761e0',
          editMode: false,
        },
        {
          ingredientName: 'Maggi ',
          quantity: '1',
          unit: 'TL',
          id: 'efc9565d-bcfb-812f-01ee-67ddc122d61f',
          editMode: false,
        },
        {
          ingredientName: 'Fetakäse',
          quantity: '1',
          unit: 'Stk.',
          id: 'd2198c6b-d055-92cf-e10b-f88256a2487d',
          editMode: false,
        },
        {
          ingredientName: 'Muskat',
          quantity: '1',
          unit: 'TL-gestr.',
          id: '8deb3d27-133d-3825-ba0d-1810de832542',
          editMode: false,
        },
      ],
      preparation:
        'Das Brötchen einweichen und ausdrÃ¼cken \nAlle Zutaten gut vermischen Frikadellen mit KÃ¤se in der Mitte Formen \nVon beiden Seiten scharf anbraten anschlieÃŸend ca 15 bis 20 Minuten auf mittlere Hitze braten',
      id: '26a31e77-ba2a-366f-ce01-94b78e656ab0',
    },
    {
      name: 'Kartoffelecken',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Kartoffeln',
          quantity: ' ',
          unit: ' ',
          id: '79c612eb-a1f2-6568-7322-90e2f7e085dc',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebeln',
          quantity: ' ',
          unit: ' ',
          id: 'a627cb76-2fad-6516-451e-3af5cd76c24b',
          editMode: false,
        },
      ],
      preparation: '',
      test: true,
      id: '43626c25-9b64-23f6-ae39-6c273f288758',
    },
    {
      name: 'Kartoffelpfannkuchen',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Kartoffel',
          quantity: '1.6',
          unit: 'kg',
          id: 'a2fbdc7a-aed8-d30f-12ad-4b1aba937df4',
          editMode: false,
        },
        {
          ingredientName: 'Karotte',
          quantity: '200',
          unit: 'g',
          id: 'd76d2579-4ebc-a195-553a-77a10721a9ed',
          editMode: false,
        },
        {
          ingredientName: 'Mehl',
          quantity: '150',
          unit: 'g',
          id: 'a5bd3828-15d1-b6e3-cdf5-400fc6f3fc96',
          editMode: false,
        },
        {
          ingredientName: 'Pfeffer',
          quantity: '8',
          unit: 'g',
          id: '59a68b2a-4200-26b1-c684-1e4a5ac9af57',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '4',
          unit: 'g',
          id: 'c577d7b2-799e-47e5-3ad1-21e377e5841e',
          editMode: false,
        },
        {
          ingredientName: 'Muskat ',
          quantity: '0.5',
          unit: 'TL-gestr.',
          id: 'e2cffcb1-6eac-2b53-c076-6ae7ae3edb2f',
          editMode: false,
        },
        {
          ingredientName: 'Eier ',
          quantity: '4',
          unit: 'Stk.',
          id: '1eb1fe64-7f2f-4edb-b875-06a93f059d80',
          editMode: false,
        },
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
        {
          ingredientName: 'Rinderhack',
          quantity: ' ',
          unit: ' ',
          id: '94887100-d99a-64f5-31fa-899e879f5bef',
          editMode: false,
        },
        {
          ingredientName: 'Lasagne Blätter',
          quantity: ' ',
          unit: ' ',
          id: '0d9c0c18-7502-4ef9-875a-f18097849533',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebeln',
          quantity: ' ',
          unit: ' ',
          id: 'c14f6076-04c7-13a4-78af-c2797c3ded86',
          editMode: false,
        },
        {
          ingredientName: 'Creme Fraiche',
          quantity: ' ',
          unit: ' ',
          id: '97413ddf-9954-3463-bf05-e81bbb5e38d1',
          editMode: false,
        },
      ],
      preparation: 'Rrrr\nR\nR\nR\nR\nR\n\nGgg\nF\n\nF\n\n\n',
      id: '79e8b3d5-cfb4-d371-2f43-ef7c45beba04',
    },
    {
      name: 'Majoran Klöße',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Kartoffel',
          quantity: '500',
          unit: 'g',
          id: '1b204714-facd-af21-513f-2776bf899c81',
          editMode: false,
        },
        {
          ingredientName: 'Ei',
          quantity: '1',
          unit: 'Stk.',
          id: '0ebc03ad-41a9-d00d-cad6-81d4a8e22f78',
          editMode: false,
        },
        {
          ingredientName: 'Eigelb ',
          quantity: '1',
          unit: 'Stk.',
          id: 'b9f15a93-8ef5-670f-8ccd-f22792bd2325',
          editMode: false,
        },
        {
          ingredientName: 'Mehl',
          quantity: '150',
          unit: 'g',
          id: '9ba86830-236f-6866-1907-21574f444d65',
          editMode: false,
        },
        {
          ingredientName: 'Majoran ',
          quantity: '4',
          unit: 'TL',
          id: 'f4dda866-09d2-c963-af67-09b8dda6080e',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'TL',
          id: '7130e917-2895-28a3-c0bb-ec922a159d9d',
          editMode: false,
        },
        {
          ingredientName: 'Pfeffer',
          quantity: '',
          unit: '--',
          id: '958f708c-ceeb-66fc-9e59-054b70e1ea06',
          editMode: false,
        },
      ],
      preparation:
        'Kartoffel ein Tag frÃ¼her kochen. \nca 20 Minuten bis sie von der Gabel rutschen \nKartoffel stampfen \nalle Zutaten vermischen \nKlÃ¶ÃŸe formen \nin salzwasser aufkochen \nDann ca 20 bis 25 Minuten bei mittlerer Hitze ziehen lassen bis sie schwimme.',
      id: '01304d6d-11b0-9302-9d7f-de6fd1915537',
    },
    {
      name: 'Maultaschen-Suppe',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Maultaschen',
          quantity: ' ',
          unit: ' ',
          id: '75125099-f0a8-fddc-04cd-cea58ede038f',
          editMode: false,
        },
        {
          ingredientName: 'Lauch',
          quantity: ' ',
          unit: ' ',
          id: 'e3a9c1a5-696c-b90d-fe69-1db66aa0a06a',
          editMode: false,
        },
        {
          ingredientName: 'WÃ¼rstchen',
          quantity: ' ',
          unit: ' ',
          id: 'ebcb987e-0a18-3696-6a17-ad7bd5ce0c1d',
          editMode: false,
        },
        {
          ingredientName: 'Brokkoli',
          quantity: ' ',
          unit: ' ',
          id: 'a409f42c-1dde-6cac-f645-d9bf5f7a6d0c',
          editMode: false,
        },
        {
          ingredientName: 'Karotten',
          quantity: ' ',
          unit: ' ',
          id: 'a584d583-5d90-48c5-d08a-41c3a236e25a',
          editMode: false,
        },
        {
          ingredientName: 'Chilli',
          quantity: ' ',
          unit: ' ',
          id: '772871fd-c860-50fb-a2cf-3d82fa4d2d40',
          editMode: false,
        },
        {
          ingredientName: 'Ingwer',
          quantity: ' ',
          unit: ' ',
          id: '51024e03-c266-8f31-f59d-dd1158a192a4',
          editMode: false,
        },
      ],
      preparation: '',
      test: true,
      id: '0e91d717-1c73-70c6-7681-9e081003f540',
    },
    {
      name: 'Pfannkuchen Spezial',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Kartoffel',
          quantity: '1.6',
          unit: 'kg',
          id: '263e84a0-16ff-3454-b7d6-a2fecd341797',
          editMode: false,
        },
        {
          ingredientName: 'Karotte',
          quantity: '200',
          unit: 'g',
          id: '27c8c0eb-7e5b-c7cc-ed2c-eb9684d57fbc',
          editMode: false,
        },
        {
          ingredientName: 'Mehl',
          quantity: '150',
          unit: 'g',
          id: '19a017e0-f8d9-95a6-a9be-a639370d6203',
          editMode: false,
        },
        {
          ingredientName: 'Pfeffer',
          quantity: '8',
          unit: 'g',
          id: 'e54d655b-024e-842d-a219-2c93de2a73ba',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '4',
          unit: 'g',
          id: '6e717448-1532-40f1-9c3c-d33469dcc6fd',
          editMode: false,
        },
        {
          ingredientName: 'Muskat ',
          quantity: '0.5',
          unit: 'TL-gestr.',
          id: '3c80ee67-d93b-1b06-03fb-af13d7372407',
          editMode: false,
        },
        {
          ingredientName: 'Eier ',
          quantity: '4',
          unit: 'Stk.',
          id: '51388fa3-3a8b-d313-88ee-03fd510b0537',
          editMode: false,
        },
      ],
      preparation: '',
      id: '0638cee2-4b4b-75a7-d6b5-aaa641aac1d5',
    },
    {
      name: 'Reis-Spezial',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Reis',
          quantity: '300',
          unit: 'g',
          id: '27402a71-044e-110c-92f0-da39a60a6ab4',
          editMode: false,
        },
      ],
      preparation: '',
      id: '23f25675-323f-bb0f-be96-25296f864ce3',
    },
    {
      name: 'Rennfahrersuppe',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Haferflocken',
          quantity: '4',
          unit: 'EL',
          id: 'ef7e8c71-aed4-b219-28a3-81227c24086a',
          editMode: false,
        },
        {
          ingredientName: 'Eier ',
          quantity: '1',
          unit: 'Stk.',
          id: 'da2d02fe-1fbc-9012-c85f-ebd5da105130',
          editMode: false,
        },
        {
          ingredientName: 'Klare Fleischbrühe',
          quantity: '2',
          unit: 'Stk.',
          id: '6c0f41af-d44c-a110-ab3d-18a1d884b66d',
          editMode: false,
        },
        {
          ingredientName: 'Wasser',
          quantity: '1',
          unit: 'l',
          id: '5f6d6286-6b7d-5b96-d474-94a654e45c11',
          editMode: false,
        },
        {
          ingredientName: 'HÃ¤hnchenfleisch',
          quantity: '400',
          unit: 'g',
          id: 'd16e848e-1411-d4ae-3edb-857675f64b79',
          editMode: false,
        },
      ],
      preparation: '',
      id: '93c89814-8009-8734-6b00-da6494e5fa47',
    },
    {
      name: 'Rindergulasch',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Rindfleisch',
          quantity: '1',
          unit: 'kg',
          id: '0c1a5fd1-2f5f-f3e0-7392-35e23bd6734e',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebel ',
          quantity: '2',
          unit: 'Stk.',
          id: 'b5c2b020-bf7a-1665-c01c-a59b52f2f1de',
          editMode: false,
        },
        {
          ingredientName: 'Paprikamark ',
          quantity: '4',
          unit: 'EL',
          id: 'aa36a9bb-0223-5bef-97e7-42d8550224e3',
          editMode: false,
        },
        {
          ingredientName: 'Paprika',
          quantity: '1',
          unit: 'Stk.',
          id: 'd128f94b-c995-bb5b-aa93-4a5d814aa522',
          editMode: false,
        },
        {
          ingredientName: 'Karotte',
          quantity: '2',
          unit: 'Stk.',
          id: '42c9c801-4b60-3f8e-ba0e-3f339e60dd0c',
          editMode: false,
        },
        {
          ingredientName: 'Zucker ',
          quantity: '1',
          unit: 'Priese',
          id: '998facfd-162c-8928-b70e-31589d6076dc',
          editMode: false,
        },
        {
          ingredientName: 'Knoblauchzehen',
          quantity: '4',
          unit: 'Stk.',
          id: '3298f62d-1169-4d62-bafb-82ee7e24d551',
          editMode: false,
        },
        {
          ingredientName: 'Salz Pfeffer',
          quantity: '1',
          unit: 'Priese',
          id: 'aecd4e04-48ba-c14a-1e50-37dc8bcdd412',
          editMode: false,
        },
        {
          ingredientName: 'Paprikapulver',
          quantity: '1',
          unit: 'Priese',
          id: '566e9bcf-e32e-9765-b825-51e3c2598d6d',
          editMode: false,
        },
        {
          ingredientName: 'Ã–l ',
          quantity: '',
          unit: '--',
          id: '2aa650db-f73c-3c0b-8fcb-beb3b85d185d',
          editMode: false,
        },
      ],
      preparation:
        'Fleisch abbrausen trocken würfeln in heißen Öl anbraten.\nSalz Knobi Pfeffer Papierpulver. \nZwiebeln wÃ¼rfeln und mit anbraten Paprikamarkt zufÃ¼gen \nAlles anschwitzen \n1,5 Liter rinderbrÃ¼he dazu\n90 Minuten kochen kleingestÃ¤nde Paprika und Karotten dazu mit 0,5 Liter RinderbrÃ¼he nochmals weiterkochen lassen zum Schluss abschmecken und etwas Zucker dazu.',
      id: '952be5dd-79f6-0924-b6bf-3920bbb436a1',
    },
    {
      name: 'Spaghetti',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Nudel',
          quantity: 300,
          unit: 'g',
          id: 'dbad8fe5-a581-761f-60b9-1a63144e45aa',
          editMode: false,
        },
        {
          ingredientName: 'TomatensoÃŸe',
          quantity: 1,
          unit: 'Stk.',
          id: 'ed11ec02-e3c1-e3f2-b8a2-13f13bbe360b',
          editMode: false,
        },
        {
          ingredientName: 'Passierte Tomaten',
          quantity: 1,
          unit: 'Stk.',
          id: '92a2aa15-8520-ab83-3416-4cfa8def70c2',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebel',
          quantity: '1',
          unit: 'g',
          id: '28106998-e305-bd1e-7b74-5decadd40dbb',
          editMode: false,
        },
      ],
      preparation: 'Zubereitung',
      test: true,
      id: 'f2295e8e-1e44-b79a-75bb-4e829358a7dd',
    },
    {
      name: 'ToGeNu-Pfanne',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Nudel',
          quantity: ' ',
          unit: ' ',
          id: '20d5764f-923f-2f5c-0910-1adeaddf46d2',
          editMode: false,
        },
        {
          ingredientName: 'Zucchini',
          quantity: ' ',
          unit: ' ',
          id: 'c2792fbd-fff7-c592-b754-827034a35e2f',
          editMode: false,
        },
        {
          ingredientName: 'Kohlrabi',
          quantity: ' ',
          unit: ' ',
          id: 'b5a46dd7-e484-34a4-3272-044ec376d2ef',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebel',
          quantity: '',
          unit: 'g',
          id: '007070b6-a9d4-b089-2aec-7fe3b8fdf6d8',
          editMode: false,
        },
      ],
      preparation: '',
      test: true,
      id: 'a3f8b645-a6ca-c482-f9b9-953b6e6a1295',
    },
    {
      name: 'Tortellini',
      fav: true,
      ingredients: [
        {
          ingredientName: 'Milch',
          quantity: ' ',
          unit: ' ',
          id: 'ae16a3b1-50da-35af-94a1-1955df3c4946',
          editMode: false,
        },
        {
          ingredientName: 'Tortellini',
          quantity: ' ',
          unit: ' ',
          id: 'fabaf07a-a7d5-27ae-de4f-cae9e3fc6bd2',
          editMode: false,
        },
        {
          ingredientName: 'Sahne ',
          quantity: '1',
          unit: 'Stk.',
          id: '3c564693-10ae-75a9-71c7-4fc8b9302660',
          editMode: false,
        },
      ],
      preparation: 'Tgggh\nTest 123\nXxx',
      id: '35b894c1-363b-b719-e317-4102195e8d3b',
    },
    {
      name: 'Wasserspatzen',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Mehl',
          quantity: '300',
          unit: 'g',
          id: '93285223-b9fb-5c58-8088-da812e13d120',
          editMode: false,
        },
        {
          ingredientName: 'Eier',
          quantity: '4',
          unit: 'Stk.',
          id: '01cc9d0f-defe-ff2b-02f4-ebcd4907531c',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'TL-gestr.',
          id: '597cfa6d-4360-5e27-3d7c-56da86d02658',
          editMode: false,
        },
        {
          ingredientName: 'Wasser',
          quantity: '130',
          unit: 'ml',
          id: 'f8ef7ae9-637f-6159-90c6-4f4e10855a31',
          editMode: false,
        },
      ],
      preparation: '',
      id: 'a46211e8-1b33-6ffe-09b7-b02f000ef178',
    },
    {
      name: 'Weltbester Kuchen',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Eier',
          quantity: '4',
          unit: 'Stk.',
          id: '9930eb7d-0eba-c350-31a4-f5abb8f585ca',
          editMode: false,
        },
        {
          ingredientName: 'Butter',
          quantity: '250',
          unit: 'g',
          id: 'ffc5712c-2797-96b5-0b2c-02c88d77a564',
          editMode: false,
        },
        {
          ingredientName: 'Mehl',
          quantity: '250',
          unit: 'g',
          id: '12b28824-469b-92f8-9370-14fcda555521',
          editMode: false,
        },
        {
          ingredientName: 'Zucker',
          quantity: '250',
          unit: 'g',
          id: 'c18819db-a1bc-090e-cf3c-baf5a300ae60',
          editMode: false,
        },
        {
          ingredientName: 'Backpulver',
          quantity: '1',
          unit: 'Stk.',
          id: 'a1b95ebe-f66f-a582-c6f8-d7ff2550e282',
          editMode: false,
        },
        {
          ingredientName: 'Vanillezucker',
          quantity: '1',
          unit: 'Stk.',
          id: '49c9a234-bc04-ed5a-72b4-f2c6cc1e53b6',
          editMode: false,
        },
        {
          ingredientName: 'Zimt',
          quantity: '1',
          unit: 'TL',
          id: 'ed75c73d-07fa-f63d-a69e-0fbd0393d737',
          editMode: false,
        },
        {
          ingredientName: 'Rotwein',
          quantity: '125',
          unit: 'ml',
          id: '0f19c97f-f793-f7de-b071-d87683cc8c28',
          editMode: false,
        },
        {
          ingredientName: 'Schokopuddingpulver',
          quantity: '1',
          unit: 'Stk.',
          id: '82f30034-d6ee-c31f-7567-d8755f6c2329',
          editMode: false,
        },
        {
          ingredientName: 'Schoko Splitter zartbitter',
          quantity: '1',
          unit: 'Stk.',
          id: '0b001b7f-acdc-365f-f7f0-7074f9dcdc92',
          editMode: false,
        },
        {
          ingredientName: 'Kuchenglasur zartbitter',
          quantity: '1',
          unit: 'Stk.',
          id: 'c6b21578-66db-0418-d729-9ce3ce846a34',
          editMode: false,
        },
      ],
      preparation:
        'Alle Zutaten vermengen.\nKuchenform mit Butter und  Paniermehl ausstreichen.\nBackofen auf 175 Grad \nBackzeit 60 Minuten \n\nTipp: \nBackform nicht zu voll \nmaximal 2/3',
      id: 'f08bbec8-4463-a665-24ca-1ca40f51f0a9',
    },
    {
      name: 'Wirsing-Gemüse',
      fav: false,
      ingredients: [
        {
          ingredientName: 'Wirsing',
          quantity: ' ',
          unit: ' ',
          id: '7de11347-84a5-9aa8-ca1c-82c0d4f52534',
          editMode: false,
        },
        {
          ingredientName: 'Zwiebeln',
          quantity: ' ',
          unit: ' ',
          id: '3537e470-a356-3866-c8ab-990c82853091',
          editMode: false,
        },
        {
          ingredientName: 'Milch',
          quantity: ' ',
          unit: ' ',
          id: 'efcafd18-7cff-9897-e55d-46ccd01a00fd',
          editMode: false,
        },
        {
          ingredientName: 'Muskat',
          quantity: ' ',
          unit: ' ',
          id: '64b1f858-26fc-9510-e8ff-bcc44b4afa7d',
          editMode: false,
        },
      ],
      preparation: 'Anleitung',
      id: '7fcd7c46-20ef-b983-265c-8f7f3748153e',
    },
  ],
  shoppingList: [
    {
      name: 'Testmenu',
      fav: false,
      weeklyPlan: true,
      ingredients: [
        {
          ingredientName: 'Mehl',
          quantity: '500',
          unit: 'g',
          id: 'c2b1602f-e6f7-7597-82be-600a7406bef',
          editMode: false,
        },
        {
          ingredientName: 'Eier',
          quantity: '5',
          unit: 'Stk.',
          id: 'c643a35b-efdb-0952-6dd8-6a5b4628d5a',
          editMode: false,
        },
        {
          ingredientName: 'Milch',
          quantity: '0.5',
          unit: 'l',
          id: 'e261f15d-7c42-e2b8-3295-c170e638f04',
          editMode: false,
        },
        {
          ingredientName: 'Sahne ',
          quantity: '1',
          unit: 'Stk.',
          id: '402f316c-60d7-274e-cf27-4exxxe756ca',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'TL-gestr.',
          id: '643a6fa8-722d-d2ca-78b1-81ecbe70ec7',
          editMode: false,
        },
      ],
      preparation: 'Mittlere Stufe am Herd \nBeidseitig ca 3 Minuten',
      id: '759e69c2-9ab5-231b-0d59-e153b60270',
    },
    {
      name: 'Arme Ritter',
      fav: false,
      weeklyPlan: true,
      ingredients: [
        {
          ingredientName: 'Mehl',
          quantity: '300',
          unit: 'g',
          id: 'c2b1602f-e6f7-7597-82be-600a740b6bef',
          editMode: false,
        },
        {
          ingredientName: 'Eier',
          quantity: '5',
          unit: 'Stk.',
          id: 'c643a35b-efdb-0952-6dd8-6a5b46228d5a',
          editMode: false,
        },
        {
          ingredientName: 'Milch',
          quantity: '300',
          unit: 'ml',
          id: 'e261f15d-7c42-e2b8-3295-c170e6b38f04',
          editMode: false,
        },
        {
          ingredientName: 'Toastbrot ',
          quantity: '0.5',
          unit: 'Stk.',
          id: '402f316c-60d7-274e-cf27-4ea68e75e6ca',
          editMode: false,
        },
        {
          ingredientName: 'Salz',
          quantity: '1',
          unit: 'TL-gestr.',
          id: '643a6fa8-722d-d2ca-78b1-81ecbe780ec7',
          editMode: false,
        },
      ],
      preparation: 'Mittlere Stufe am Herd \nBeidseitig ca 3 Minuten',
      id: '759e69c2-9ab5-231b-0d59-e15339b60270',
    },
  ],
};

//==================================================================
const dataReducer = (stateReducer, action) => {
  // input new recipe
  if (action.type === 'INPUT') {
    stateReducer.recipeList = [
      ...stateReducer.recipeList,
      action.dataUpdate.recipeInput,
    ];
    sortArray(stateReducer.recipeList);
    return stateReducer;
  }
  //==================================================================
  // update existing recipe
  if (action.type === UPDATERECIPE) {
    // replace existing recipe with updated version
    if (action.dataUpdate.recipeUpdate) {
      const index = stateReducer.recipeList
        .map(e => e.id)
        .indexOf(action.dataUpdate.recipeUpdate.id);
      stateReducer.recipeList.splice(index, 1, action.dataUpdate.recipeUpdate);
      sortArray(stateReducer.recipeList);
      return stateReducer;
    }
    //++++++++++++++++++++++++++++++++++++++++
    // update recipe fav state and update recipePage
    if (action.dataUpdate.favUpdate) {
      let currentFavState;
      stateReducer.recipeList = stateReducer.recipeList.map(el => {
        if (el.id === action.dataUpdate.recipe.id) {
          el.fav = !el.fav;
          currentFavState = el.fav;
        }
        return el;
      });
      action.dataUpdate.favUpdate('fav', currentFavState);
      return stateReducer;
    }
    //++++++++++++++++++++++++++++++++++++++++
    // update plan onClick recipePage
    if (action.dataUpdate.planUpdate) {
      // remove from plan
      if (action.dataUpdate.currentPlanState) {
        stateReducer.weeklyPlan = removeFromlist(
          stateReducer.weeklyPlan,
          action.dataUpdate.recipe.id
        );
        // action.dataUpdate.setPlanStateFromOutSide();
        action.dataUpdate.planUpdate('plan', false);
        return stateReducer;
      }
      // add to plan
      if (action.dataUpdate.currentPlanState === false) {
        stateReducer.weeklyPlan = addToList(
          stateReducer.weeklyPlan,
          action.dataUpdate.recipe
        );
        action.dataUpdate.planUpdate('plan', true);
        return stateReducer;
      }
    }
    //++++++++++++++++++++++++++++++++++++++++
    if (action.dataUpdate.listUpdate) {
      console.log('listUpdate');
    }
  }
  //==================================================================
  if (action.type === 'DELETE') {
    stateReducer.recipeList = stateReducer.recipeList.filter(el => {
      if (el.id !== action.dataUpdate.id) return el;
    });
    state.currentRecipe = { ...state.initialState };
    return stateReducer;
  }
  if (action.type === 'PLAN') {
    // add to plan => replace the plan with updated version
    if (action.dataUpdate.weeklyPlanState) {
      stateReducer.weeklyPlan = [...action.dataUpdate.weeklyPlanState];
      return stateReducer;
    }
    // remove from plan
    if (action.dataUpdate.itemId) {
      stateReducer.weeklyPlan = removeFromlist(
        stateReducer.weeklyPlan,
        action.dataUpdate.itemId
      );
      action.dataUpdate.setPlanStateFromOutSide();
      return stateReducer;
    }
  }
  return stateReducer;
};
//==================================================================
// manipulate weeklyPlan and shoppingList
const removeFromlist = (currentList, idToRemove) => {
  currentList = currentList.filter(el => {
    if (el.id !== idToRemove) return el;
  });
  return currentList;
};
const addToList = (currentList, objToAdd) => {
  return [...currentList, objToAdd];
};
//==================================================================
const sortArray = array => {
  array.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
};
//==================================================================
//==================================================================
const DataProvider = props => {
  const { isLoading, error, sendRequest } = useFetch(
    {
      url: 'https://react-app-c8bf3-default-rtdb.europe-west1.firebasedatabase.app/data.json',
    },
    data => console.log('fetch', data)
  );
  // useFetch(
  //   {
  //     url: 'https://react-app-c8bf3-default-rtdb.europe-west1.firebasedatabase.app/data.json',
  //   },
  //   data => console.log('fetch', data)
  // );
  //==================================================================
  // // // const [isLoading, setIsLoading] = useState(false);
  // // // const [error, setError] = useState(false);
  // // // const getDataHandler = useCallback(async () => {
  // // //   setIsLoading(true);
  // // //   setError(null);
  // // //   try {
  // // //     const response = await fetch(
  // // //       'https://react-app-c8bf3-default-rtdb.europe-west1.firebasedatabase.app/data.json'
  // // //     );
  // // //     const data = await response.json();
  // // //     if (!response.ok) {
  // // //       throw new Error('Der Server ist nicht erreichbar !');
  // // //     }
  // // //   } catch (error) {
  // // //     console.log('Error');
  // // //     setError(error.message);
  // // //   }
  // // //   setIsLoading(false);
  // // // }, []);
  // // // useEffect(() => {
  // // //   getDataHandler();
  // // // }, [getDataHandler]);
  //==================================================================
  const [dataState, dispatchData] = useReducer(dataReducer, dataInit);
  // const [headerText, setHeaderText] = useState('Gerichte');

  const dataUpdateFunction = (type, dataUpdate) => {
    if (
      type === 'INPUT' ||
      type === 'UPDATERECIPE' ||
      type === 'DELETE' ||
      type === 'PLAN'
    ) {
      dispatchData({ type, dataUpdate });
    }
    if (type === 'postFetch') {
      // sendData(dataUpdate);
    }
    if (type === 'getFetch') {
      sendRequest();
      // getDataHandler();
      console.log('provider');
    }
    // if (type === 'header') {
    //   setHeaderText(dataUpdate);
    // }
  };
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
