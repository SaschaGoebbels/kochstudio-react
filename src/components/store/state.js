import { proxy } from 'valtio';

const state = proxy({
  navigation: 'btn1',
  headerText: 'Rezepte',
  loading: false,
  searchBarHide: true,
  recipePageHide: true,
  recipeEdit: false,
  currentRecipe: { name: '', ingredients: [], preparation: '' },
  initialState: { name: '', ingredients: [], preparation: '' },
  buttonBoxContent: { coin: true, add: true, list: true, plan: true },
  weeklyPlan: { editMode: false },
  listEditHide: true,
  shoppingList: { editMode: true, updateList: '' },
});

export { state };
