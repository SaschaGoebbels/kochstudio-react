import appError from './appError';
////////////////// TODO ////////////////// error handling no network
import { state } from '../components/store/state';
// import { useSnapshot } from 'valtio';

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
    console.log('create❌xxxx', err);
    appError(err, infoBox);
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
    appError(err, infoBox);
  }
  state.loading = false;
  return { ...res };
};

export const logout = async (url, infoBox) => {
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
    appError(err, infoBox);
  }
  state.loading = false;
  // setTimeout(() => {
  //   window.location.reload();
  // }, 200);
};

export const passwordResetFetch = async (url, email, infoBox) => {
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
    appError(err, infoBox);
  }
  state.loading = false;
  return res;
};
