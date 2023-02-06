import React from 'react';
import { useState } from 'react';

const useCoin = ({ inputArray, favList }) => {
  const [coincidence, setCoincidence] = useState();

  const currentArray = (inputArray, favList) => {
    if (favList) {
      return inputArray.favList(el => {
        if (el.fav) return el;
      });
    } else return inputArray;
  };
  // console.log(currentArray);
  const randomNumber = arrayLength => {
    Math.trunc(Math.random() * arrayLength);
  };

  const coincidenceRecipeOutput = currentRecipe => {};

  return {
    recipe: 'Test',
    coincidenceRecipeOutput,
  };
};

export default useCoin;
