import { proxy } from 'valtio';

const globalState = proxy({
  navigation: 'btn1',
  header: 'Gericht',
});

export { globalState };
