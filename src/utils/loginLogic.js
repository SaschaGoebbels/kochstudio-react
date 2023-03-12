import AppError from './appError';

// import { useSnapshot } from 'valtio';
import { state } from '../components/store/state';

export const createAcc = async (url, user, infoBox) => {
  let res;
  state.loading = true;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(json => (res = json));
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return { ...res };
};

export const login = async (url, email, password, infoBox) => {
  state.loading = true;
  let res;
  try {
    await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => (res = json));
  } catch (err) {
    ////////////////// TODO ////////////////// error handling no network
    console.log('❌', err);
    // AppError(err, infoBox);
    return;
  }
  console.log('😁', document.cookie);
  // localStorage.setItem('kochstudio', res.token);
  // document.cookie = 'Authorization=' + res.token;
  // document.cookie = `Authorization=${res.token}`;
  // console.log('🚩', document.cookie);
  state.loading = false;
  return { ...res };
};

export const logout = async url => {
  state.loading = true;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(response => response.json())
      .then(json => json);
  } catch (err) {
    console.log('❌', err);
    // new AppError('Something went wrong', 404);
  }
  localStorage.removeItem('kochstudio');
  state.loading = false;
};
