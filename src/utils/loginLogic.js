// import AppError from './appError';

// import { useSnapshot } from 'valtio';
import { state } from '../components/store/state';

export const createAcc = async (url, user, infoBox) => {
  let res;
  state.loading = true;

  try {
    let req = new Request(url, {
      // method: 'POST',
      mode: 'cors', //just a safe-guard indicating our intentions of what to allow
      credentials: 'include', //when will the cookies and authorization header be sent
    });
    await fetch(req)
      .then(resp => {
        let cookie = resp.headers.get('set-cookie');
        console.log('set-cookie header value', cookie);
        return resp.json();
      })
      .then(json => (res = json));
    // // // await fetch(url, {
    // // //   method: 'POST',
    // // //   // headers: { 'Content-type': 'application/json; charset=UTF-8' },
    // // //   // body: JSON.stringify(user),
    // // // })
    // // //   .then(response => response.json())
    // // //   .then(json => (res = json));
  } catch (err) {
    console.log('❌', err);
  }
  state.loading = false;
  return { ...res };
};

export const login = async (url, email, password, infoBox) => {
  state.loading = true;
  console.log('✅', url, email, password, infoBox);
  let res;
  const baseURL = 'http://localhost:5555/set'; // cross-site CORS
  try {
    // // let req = new Request(url, {
    // //   // mode: 'cors', //just a safe-guard indicating our intentions of what to allow
    // //   // credentials: 'include', //when will the cookies and authorization header be sent
    // //   method: 'POST',
    // //   mode: 'cors',
    // //   credentials: 'include',
    // //   headers: {
    // //     'Content-Type': 'application/json',
    // //   },
    // //   body: JSON.stringify({
    // //     name: 'John Doe',
    // //     email: 'johndoe@example.com',
    // //   }),
    // // });
    // // await fetch(req)
    // //   .then(resp => {
    // //     let cookie = resp.headers.get('set-cookie');
    // //     console.log('LOGIN set-cookie header value', cookie);
    // //     return resp.json();
    // //   })
    // //   .then(json => (res = json));
    //
    //
    await fetch(url, {
      credentials: 'include',
      method: 'POST',
      mode: 'cors',
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
