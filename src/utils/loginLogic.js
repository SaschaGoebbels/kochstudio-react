// import AppError from './appError';
////////////////// TODO ////////////////// error handling no network
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
    console.log('create❌', err);
  }
  console.log('create❌', res);
  state.loading = false;
  return { ...res };
};

export const loginFetch = async (url, email, password, infoBox) => {
  state.loading = true;
  let res;
  try {
    await fetch(url, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => (res = json));
  } catch (err) {
    console.log('❌', err);
    // AppError(err, infoBox);
    return;
  }
  console.log('login❌', res);
  state.loading = false;
  return { ...res };
};

export const logout = async url => {
  state.loading = true;
  try {
    await fetch(url, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(response => response.json())
      .then(json => json);
  } catch (err) {
    console.log('❌', err);
    // new AppError('Something went wrong', 404);
  }
  state.loading = false;
  // window.location.reload();
};

export const passwordResetFetch = async (url, email) => {
  state.loading = true;
  let res;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ email: email }),
    })
      .then(response => response.json())
      .then(json => (res = json));
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return res;
};
