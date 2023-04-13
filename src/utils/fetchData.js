//
import { state } from '../components/store/state';
import appError from './appError';
import { baseUrl } from './env';

//==================================================================
const defaultFetchBody = (method, body) => {
  if (!body) body = {};
  return {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ ...body }),
  };
};
//==================================================================

export const fetchExampleList = async infobox => {
  let res;
  state.loading = true;
  try {
    await fetch(
      `${baseUrl()}/api/v1/recipe/getExampleRecipes`,
      // `${process.env.REACT_APP_URL}/api/v1/recipe/getExampleRecipes`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
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
  console.log('✅ fetch get');
  try {
    await fetch(`${baseUrl()}/api/v1/users/appData`, {
      // await fetch(`${process.env.REACT_APP_URL}/api/v1/users/appData`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(json => {
        // console.log('✅ Fetch AppData Get', json); //DELETE
        res = json;
      });
  } catch (err) {
    console.log('❌', err);
    appError(infobox, err);
  }
  state.loading = false;
  return res;
};

export const fetchAppDataPost = async (appData, infobox) => {
  console.log('✅ fetch post');
  state.loading = true;
  let res;
  try {
    await fetch(`${baseUrl()}/api/v1/users/appData`, {
      // await fetch(`${process.env.REACT_APP_URL}/api/v1/users/appData`, {
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
  console.log('❌ updateSettings Fetch');
  try {
    await fetch(
      `${baseUrl()}/api/v1/users/updateSettings`,
      // `${process.env.REACT_APP_URL}/api/v1/users/updateSettings`,
      defaultFetchBody('POST', settings)
    )
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

export const updateRecipeList = async (action, obj, infobox) => {
  state.loading = true;
  let res;
  try {
    await fetch(
      `${baseUrl()}/api/v1/users/updateRecipeList`,
      // `${process.env.REACT_APP_URL}/api/v1/users/updateRecipeList`,
      defaultFetchBody('POST', { action, obj })
    )
      .then(response => response.json())
      .then(json => {
        res = json;
        console.log('✅', json.user);
      });
  } catch (err) {
    console.log('❌ updateRecipeList Err:', err);
  }
  state.loading = false;
  return res;
};

export const deleteRecipeList = async infobox => {
  state.loading = true;
  let res;
  try {
    await fetch(
      `${baseUrl()}/api/v1/users/deleteRecipeList`,
      // `${process.env.REACT_APP_URL}/api/v1/users/deleteRecipeList`,
      defaultFetchBody('POST')
    )
      .then(response => response.json())
      .then(json => (res = json));
  } catch (err) {
    console.log('❌ deleteRecipeList Err:', err);
  }
  state.loading = false;
  return res;
};

export const fetchRecipe = async (method, recipe, id, list, url) => {
  state.loading = true;
  let res;
  try {
    await fetch(
      `${baseUrl()}/api/v1/users/${url}/${id}/${list}`,
      // `${process.env.REACT_APP_URL}/api/v1/users/${url}/${id}/${list}`,
      defaultFetchBody(method, { recipe })
    )
      .then(response => response.json())
      .then(json => {
        res = json;
        console.log('✅', json);
      });
  } catch (err) {
    console.log('❌ postRecipe Err:', err);
  }
  state.loading = false;
  return res;
};

export const fetchWeeklyPlanOrShoppingList = async (
  method,
  updatePlanList,
  url
) => {
  state.loading = true;
  let res;
  try {
    await fetch(
      // `${process.env.REACT_APP_URL}/api/v1/users/${url}/${id}/${list}`,
      `${baseUrl()}/api/v1/users/${url}`,
      // `${process.env.REACT_APP_URL}/api/v1/users/${url}`,
      defaultFetchBody(method, { updatePlanList })
    )
      .then(response => response.json())
      .then(json => {
        res = json;
        // console.log('✅', json);
      });
  } catch (err) {
    console.log('❌ updatePlanList Err:', err);
  }
  state.loading = false;
  return res;
};
