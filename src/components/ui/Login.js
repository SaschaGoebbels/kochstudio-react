import React, { useState, useContext } from 'react';
import classes from './Login.module.css';
import ButtonRound from './ButtonRound';
import useInput from '../../hooks/useInput';
import { DataContext } from '../store/DataProvider';
import { useDataUpdate } from '../store/DataProvider';
import { loginFetch } from '../../utils/loginLogic';
import { createAcc } from '../../utils/loginLogic';
import { passwordResetFetch } from '../../utils/loginLogic';
import { baseUrl } from '../../utils/env';

// import { fetchExampleList } from '../../utils/fetchData';
// import { useEffect } from 'react';

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
  const [passwordForgotten, setPasswordForgotten] = useState(false);
  const [login, setLogin] = useState(true);

  const switchLoginBox = (create, password, login) => {
    setCreateAccount(create);
    setPasswordForgotten(password);
    setLogin(login);
  };

  // create account
  const onClickHandler = async el => {
    if (el === 'x') {
      switchLoginBox(false, false, true);
      resetAllInputValues();
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
      if (passwordForgotten === true && login === false) {
        const url = `${baseUrl()}/api/v1/users/forgotPassword`;
        const res = await passwordResetFetch(url, emailValue, props.message);
        if (!res.status !== 'success') {
          props.message({
            title: `Fehler`,
            message: res.message,
            // message: 'Die Emailadresse wurde nicht gefunden !',
            showBtnX: false,
          });
          return;
        }
        switchLoginBox(false, false, true);
        resetAllInputValues();
        props.message({
          title: `Passwort zurücksetzen`,
          message:
            'Bitte gehen sie in Ihren Emailaccount und folgen dort den Schritten zum zurücksetzen.',
          showBtnX: false,
        });
        return;
      }
      if (!passwordIsValid) {
        props.message({
          title: `Passwort-Error`,
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
          `${baseUrl()}/api/v1/users/signup`,
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
        if (res) {
          if (res.status === 'success') {
            switchLoginBox(false, false, true);
            props.message({
              title: `Anmeldung erfolgreich`,
              message: 'Viel Spaß mit der App und guten Appetit !',
              showBtnX: false,
            });
            loginFunction(emailValue, passwordValue);
            return;
          }
        }
      }
    }
  };

  const onCreateAccount = el => {
    el.preventDefault();
    switchLoginBox(true, false, false);
  };

  const loginResUserUpdateCtx = res => {
    console.log(res);
    resetAllInputValues();
    updateData('LOGIN', res.data.user);
  };

  const loginFunction = async (email, password) => {
    // props hide login
    props.toggleLoginHide(true);
    const res = await loginFetch(
      `${baseUrl()}/api/v1/users/login`,
      email,
      password,
      props.message
    );
    if (res) {
      if (!res.status === 'fail') {
        props.message({
          title: `Login nicht möglich`,
          message: res.message,
          showBtnX: false,
        });
        setCreateAccount(true);
      }
      if (res.status === 'success') {
        loginResUserUpdateCtx(res);
        return;
      }
      props.toggleLoginHide(false);
      return;
    }
    props.message({
      title: `Fehler`,
      message: 'Bitte Netzwerkverbindung prüfen!',
      showBtnX: false,
    });
    props.toggleLoginHide(false);
  };

  const onLoginHandler = async el => {
    el.preventDefault();
    loginFunction(emailValue, passwordValue);
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
    switchLoginBox(false, true, false);
  };
  const cancelDemo = el => {
    console.log('cancel demo');
  };

  const startDemo = async el => {
    loginFunction('demo-email@gmail.com', 'kochstudio');
  };
  const headerText = (createAccount, passwordForgotten) => {
    if (createAccount === true) return 'Account anlegen';
    if (passwordForgotten === true) return 'Passwort zurücksetzen';
    return 'Login';
  };
  //==================================================================
  return (
    <form className={`${classes.login}  ${props.hide && classes.login__hide}`}>
      <div className={classes.login__card}>
        <header className={classes.login__header}>
          <h2>{headerText(createAccount, passwordForgotten)}</h2>
          {/* <h2>{createAccount ? 'Account anlegen' : 'Login'}</h2> */}
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
          {passwordForgotten && <p>Bitte geben Sie ihre Emailadresse ein.</p>}
          {!passwordForgotten && (
            <div className={classes.login__messageBox__inputBox}>
              <label htmlFor="">Passwort:</label>
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
          )}
          {createAccount && (
            <div className={`${classes.login__messageBox__inputBox}`}>
              <label htmlFor="">Passwort:</label>
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
          {login && (
            <button
              className={classes.login__footer__loginBtn}
              onClick={onDemoHandler}
            >
              DEMO-Login
            </button>
          )}
          {login && (
            <button
              // autoFocus
              className={classes.login__footer__loginBtn}
              onClick={onLoginHandler}
            >
              LOGIN
            </button>
          )}
          {!login && (
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
          {!login && (
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
        {login && (
          <div className={classes.login__secondFooterBox}>
            <button
              className={classes.login__secondFooterBox__textBtn}
              onClick={onPasswordForgotten}
            >
              Passwort vergessen
            </button>
            <button
              onClick={onCreateAccount}
              className={classes.login__secondFooterBox__textBtn}
            >
              Account anlegen
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
