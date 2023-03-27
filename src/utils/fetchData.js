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
        // console.log('✅', json);
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
  try {
    await fetch(`${process.env.REACT_APP_URL}/api/v1/users/appData`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        // console.log('✅', json); //DELETE
        res = json;
      });
  } catch (err) {
    console.log('❌', err);
    ////////////////// TODO ////////////////// Error handling no network
  }
  state.loading = false;
  return res;
};

export const fetchAppDataPost = async appData => {
  state.loading = true;
  let res;
  try {
    await fetch(`${process.env.REACT_APP_URL}/api/v1/users/appData`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ appData }),
    })
      .then(response => response.json())
      .then(json => {
        res = json;
        console.log('✅', json);
      });
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return res;
};

export const updateSettings = async settings => {
  state.loading = true;
  let res;
  try {
    await fetch(`${process.env.REACT_APP_URL}/api/v1/users/updateAppData`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ settings }),
    })
      .then(response => response.json())
      .then(json => {
        res = json;
        console.log('✅', json);
      });
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return res;
};
