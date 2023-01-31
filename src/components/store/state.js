import { proxy } from 'valtio';

const state = proxy({
  navigation: 'btn1',
  headerText: 'Gericht',
  recipePageHide: true,
  currentRecipe: { name: '', ingredients: [], preparation: '' },
  initialState: { name: '', ingredients: [], preparation: '' },
});

export { state };
