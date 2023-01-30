import { proxy } from 'valtio';

const state = proxy({
  navigation: 'btn1',
  headerText: 'Gericht',
  recipePageHide: true,
  // inputCurrentValue: {},
  currentRecipe: {},
});

export { state };
