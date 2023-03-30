//
import { state } from '../components/store/state';
import appError from './appError';

export const fetchExampleList = async infobox => {
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
    appError(infobox, err);
  }
  state.loading = false;
  return res;
};

export const fetchAppData = async infobox => {
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
    appError(infobox, err);
  }
  state.loading = false;
  return res;
};
//==================================================================
const defaultFetchBody = (method, body) => {
  return {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ body }),
  };
};
//==================================================================

export const fetchAppDataPost = async (appData, infobox) => {
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
    appError(infobox, err);
  }
  state.loading = false;
  return res;
};

export const updateSettings = async (settings, infobox) => {
  state.loading = true;
  let res;
  // const fetchBody = defaultFetchBody('POST', settings);
  // console.log('✅', fetchBody);
  try {
    await fetch(
      `${process.env.REACT_APP_URL}/api/v1/users/updateSettings`,
      // fetchBody
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ settings }),
      }
    )
      .then(response => response.json())
      .then(json => {
        res = json;
        console.log('✅', json.user);
      });
  } catch (err) {
    console.log('❌', err);
    appError(infobox, err);
  }
  state.loading = false;
  return res;
};

export const updateRecipeList = async (action, obj, infobox) => {
  state.loading = true;
  let res;
  try {
    await fetch(
      `${process.env.REACT_APP_URL}/api/v1/users/updateRecipeList`,
      defaultFetchBody('POST', { action, obj })
    )
      .then(response => response.json())
      .then(json => {
        res = json;
        console.log('✅', json.user);
      });
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return res;
};
