import { proxy } from 'valtio';

const state = proxy({
  navigation: 'btn1',
  headerText: 'Gerichte',
  searchBarHide: true,
  recipePageHide: true,
  currentRecipe: { name: '', ingredients: [], preparation: '' },
  initialState: { name: '', ingredients: [], preparation: '' },
  buttonBoxContent: { coin: true, add: true, list: true, plan: true },
  weeklyPlan: { editMode: false },
  listEditHide: true,
  shoppingList: { editMode: true },
});

export { state };
