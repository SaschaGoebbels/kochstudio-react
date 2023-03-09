import AppError from './appError';

// import { useSnapshot } from 'valtio';
import { state } from '../components/store/state';

export const login = async (url, email, password, infoBox) => {
  state.loading = true;
  let res;
  try {
    await fetch(url, {
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
    ////////////////// TODO ////////////////// error handling no network
    console.log('❌', err);
    AppError(err, infoBox);
    return;
  }
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
      .then(json => {
        console.log(json);
        return json;
      });
  } catch (err) {
    console.log('❌', err);
    // new AppError('Something went wrong', 404);
  }
  state.loading = false;
};
