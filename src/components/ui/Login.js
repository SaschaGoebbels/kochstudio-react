import React, { useState, useContext } from 'react';
import classes from './Login.module.css';
import ButtonRound from './ButtonRound';
import useInput from '../../hooks/useInput';
import { DataContext } from '../store/DataProvider';
import { useDataUpdate } from '../store/DataProvider';
import { login } from '../../utils/loginLogic';
import { createAcc } from '../../utils/loginLogic';
import { fetchExampleList } from '../../utils/fetchData';
import { baseUrl } from '../../utils/env';
// import { state } from '../store/state';

const Login = props => {
  const dataCtx = useContext(DataContext);
  const updateData = useDataUpdate();
  //==================================================================
  const {
    value: nameValue,
    // isValid: nameIsValid,
    // hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(value => value.trim() !== '');
  //==================================================================
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(email => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  });

  //==================================================================
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(value => value.trim() !== '' && value.trim().length > 3);
  const {
    value: passwordConfirmValue,
    // isValid: passwordConfirmIsValid,
    // hasError: passwordConfirmInputHasError,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: passwordConfirmReset,
  } = useInput(value => value.trim() !== '' && value.trim().length > 3);
  //==================================================================
  const resetAllInputValues = () => {
    nameReset();
    emailReset();
    passwordReset();
    passwordConfirmReset();
  };
  const [createAccount, setCreateAccount] = useState(false);

  // create account
  const onClickHandler = async el => {
    if (el === 'x') {
      setCreateAccount(false);
    }
    if (el === 'check') {
      if (!emailIsValid) {
        props.message({
          title: `Error`,
          message: 'Bitte Emailadresse eingeben!',
          showBtnX: false,
        });
        return;
      }
      if (!passwordIsValid) {
        props.message({
          title: `Error`,
          message: 'Mindestens 4 Zeichen eingeben !',
          showBtnX: false,
        });
        return;
      }
      if (emailIsValid && passwordIsValid) {
        const user = {
          loggedIn: true,
          hideLogin: true,
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          passwordConfirm: passwordConfirmValue,
        };
        const data = dataCtx;
        const res = await createAcc(
          'https://cyan-pleasant-chicken.cyclic.app/api/v1/users/signup',
          user,
          props.message
        );
        if (
          res === null ||
          res === {} ||
          res.status === 'error' ||
          res.status === 'fail'
        ) {
          props.message({
            title: `Fehler`,
            message: res.message || 'Das hat leider nicht geklappt!',
            showBtnX: false,
          });
          return;
        }
        data.menuState.userData = user;
        props.onLoginHandler({ userData: user });
        setCreateAccount(false);
        resetAllInputValues();
        props.message({
          title: `Anmeldung erfolgreich`,
          message: 'Viel Spaß und guten Appetit!',
          showBtnX: false,
        });
      }
    }
  };

  const onCreateAccount = el => {
    el.preventDefault();
    setCreateAccount(true);
  };

  const loginFunction = (email, password) => {
    //
  };
  const onLoginHandler = async el => {
    el.preventDefault();
    props.toggleLoginHide(true);

    const res = await login(
      'https://cyan-pleasant-chicken.cyclic.app/api/v1/users/login',
      emailValue,
      passwordValue,
      props.message
    );
    console.log('✅', res);
    const user = {
      loggedIn: true,
      hideLogin: true,
      name: res.data.user.name,
      email: res.data.user.email,
    };
    const data = dataCtx;
    data.menuState.userData = user;
    data.appData = res.data.user.appData;
    resetAllInputValues();
    props.onLoginHandler({ userData: user });
    //==================================================================
    await fetch(
      'https://cyan-pleasant-chicken.cyclic.app/api/v1/recipe/getExampleRecipes'
    )
      .then(response => response.json())
      .then(data => console.log(data));
    //==================================================================
    if (res.status === 'success') return;
    props.message({
      title: `Error`,
      message: 'Die Anmeldedaten sind nicht korrekt !',
      showBtnX: false,
    });
  };

  const isValidClass = (isValid, hasError) => {
    if (!isValid && hasError) {
      return classes['login__inputBox__input--invalid'];
    }
  };

  const onDemoHandler = el => {
    el.preventDefault();
    props.message({
      title: 'Demo Mode aktivieren ?',
      message:
        'ACHTUNG ! \n\n Im Demo-Mode werden KEINE Daten gespeichert !\n Alle Eingaben sind nach einem Neustart gelöscht !\n\nEmail: demo-email@gmail.com \n Passwort: kochstudio',
      showBtnX: true,
      dismiss: cancelDemo,
      confirm: startDemo,
    });
  };
  const onPasswordForgotten = el => {
    el.preventDefault();
    props.message({
      title: `Error`,
      message:
        'In der Demo-Version ist noch keine Backend-Verbindung hergestellt. \n \nDemo-Login verwenden oder neuen Account anlegen.',
      showBtnX: false,
    });
  };
  const cancelDemo = el => {
    console.log('cancel demo');
  };

  const startDemo = async el => {
    // props hide login
    props.toggleLoginHide(true);
    const res = await login(
      `${baseUrl()}/api/v1/users/login`,
      'demo-email@gmail.com',
      'kochstudio',
      props.message
    );
    console.log('❌❌', res);
    if (res) {
      if (res.status === 'success') {
        const user = {
          loggedIn: true,
          hideLogin: true,
          name: 'Demo-User',
          email: 'demo-email@gmail.com',
        };
        updateData('LOGIN', user);
      }
      if (!res.status === 'fail') {
        props.message({
          title: `Login nicht möglich`,
          message: res.message,
          showBtnX: false,
        });
        setCreateAccount(true);
      }
      return;
    }
    props.message({
      title: `Fehler`,
      message: 'Bitte Netzwerkverbindung prüfen!',
      showBtnX: false,
    });
    props.toggleLoginHide(false);
  };

  //==================================================================
  return (
    <form className={`${classes.login}  ${props.hide && classes.login__hide}`}>
      <div className={classes.login__card}>
        <header className={classes.login__header}>
          <h2>{createAccount ? 'Account anlegen' : 'Login'}</h2>
        </header>
        <div className={classes.login__messageBox}>
          {createAccount && (
            <div className={classes.login__messageBox__inputBox}>
              <label htmlFor="">Name:</label>
              <input
                type="text"
                className={classes.login__inputBox__input}
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              ></input>
            </div>
          )}
          <div className={classes.login__messageBox__inputBox}>
            <label htmlFor="">Email:</label>
            <input
              type="email"
              className={`${classes.login__inputBox__input} ${isValidClass(
                emailIsValid,
                emailInputHasError
              )}`}
              value={emailValue}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            ></input>
          </div>
          <div className={classes.login__messageBox__inputBox}>
            <label htmlFor="">Password:</label>
            <input
              type="password"
              className={`${classes.login__inputBox__input} ${isValidClass(
                passwordIsValid,
                passwordInputHasError
              )}`}
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            ></input>
          </div>
          {createAccount && (
            <div className={`${classes.login__messageBox__inputBox}`}>
              <label htmlFor="">Password:</label>
              <input
                type="password"
                className={`${classes.login__inputBox__input} ${isValidClass(
                  passwordIsValid,
                  passwordInputHasError
                )}`}
                value={passwordConfirmValue}
                onChange={passwordConfirmChangeHandler}
                onBlur={passwordConfirmBlurHandler}
              ></input>
            </div>
          )}
          {/* <p>{props.message}</p> */}
        </div>
        <footer className={classes.login__footer}>
          {!createAccount && (
            <button
              className={classes.login__footer__loginBtn}
              onClick={onDemoHandler}
            >
              DEMO-Login
            </button>
          )}
          {!createAccount && (
            <button
              // autoFocus
              className={classes.login__footer__loginBtn}
              onClick={onLoginHandler}
            >
              LOGIN
            </button>
          )}
          {createAccount && (
            <ButtonRound
              btnId="x"
              className={classes.buttonAddEdit}
              buttonName={'x'}
              color={'#AD5050'}
              iconColor={''}
              isFav={''}
              onClickHandler={onClickHandler}
            />
          )}
          {createAccount && (
            <ButtonRound
              btnId="check"
              className={classes.buttonAddEdit}
              buttonName={'check'}
              color={''}
              iconColor={''}
              isFav={''}
              onClickHandler={onClickHandler}
            />
          )}
        </footer>
        <div className={classes.login__secondFooterBox}>
          <button
            className={classes.login__secondFooterBox__textBtn}
            onClick={onPasswordForgotten}
          >
            Password vergessen
          </button>
          <button
            onClick={onCreateAccount}
            className={classes.login__secondFooterBox__textBtn}
          >
            Account anlegen
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;

// fetching recipeData
// // // await fetch(
// // //   'https://cyan-pleasant-chicken.cyclic.app/api/v1/recipe/getExampleRecipes',
// // //   {
// // //     method: 'GET',
// // //     headers: {
// // //       accept: 'application/json',
// // //     },
// // //   }
// // // )
// // //   .then(response => response.json())
// // //   .then(json => console.log('❌', json));
