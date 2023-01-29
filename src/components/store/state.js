import { proxy } from 'valtio';

const state = proxy({
  navigation: 'btn1',
  headerText: 'Gericht',
  recipePageHide: true,
  inputPageHide: true,
});

export { state };
