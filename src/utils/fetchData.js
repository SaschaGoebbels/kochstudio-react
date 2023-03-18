//
import { state } from '../components/store/state';

export const fetchExampleList = async () => {
  let res;
  state.loading = true;
  try {
    await fetch(
      `${process.env.REACT_APP_URL}/api/v1/recipe/getExampleRecipes`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then(response => response.json())
      .then(json => {
        console.log('✅', json);
        res = json;
      });
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return res;
};

export const fetchAppData = async () => {
  state.loading = true;
  let res;
  console.log(process.env.REACT_APP_URL);
  try {
    await fetch(`${process.env.REACT_APP_URL}/api/v1/recipe/getAppData`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('✅', json);
        res = json;
      });
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return res;
};
