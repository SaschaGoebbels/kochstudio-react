import React, { useState, useContext } from 'react';
import classes from './Login.module.css';
import ButtonRound from './ButtonRound';
import useInput from '../../hooks/useInput';
import { DataContext } from '../store/DataProvider';

const Login = props => {
  const dataCtx = useContext(DataContext);
  //==================================================================
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameInputHasError,
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
  //==================================================================

  const [createAccount, setCreateAccount] = useState(false);

  // create account
  const onClickHandler = el => {
    if (el === 'x') {
      setCreateAccount(false);
    }
    if (el === 'check') {
      if (!emailIsValid) {
        props.message({
          title: `Error`,
          message: 'Bitte eine richtige Emailadresse eingeben!',
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
          userName: nameValue,
          email: emailValue,
          password: passwordValue,
        };
        const data = dataCtx;
        data.menuState.userData = user;
        localStorage.setItem('localData', JSON.stringify(data));
        props.onLoginHandler({ userData: user });
        setCreateAccount(false);
        props.message({
          title: `Anmeldung erfolgreich`,
          message: 'Viel Spaß mit der App!',
          showBtnX: false,
        });
      }
    }
  };

  const onCreateAccount = el => {
    el.preventDefault();
    setCreateAccount(true);
  };
  const onLoginHandler = el => {
    props.message({
      title: `Error`,
      message: 'Bitte Anmeldedaten eingeben oder Demo-Login verwenden !',
      showBtnX: false,
    });
    el.preventDefault();
  };
  const isValidClass = (isValid, hasError) => {
    if (!isValid && hasError) {
      return classes['login__inputBox__input--invalid'];
    }
  };
  const onDemoHandler = el => {
    el.preventDefault();
    props.message({
      title: 'Demo Modus aktivieren ?',
      message:
        'Im Demo-Modus werden die Daten nicht gespeichert, alle Daten gehen nach dem APP Neustart verloren !',
      showBtnX: true,
      dismiss: cancelDemo,
      confirm: startDemo,
    });
  };
  const onPasswordForgotten = el => {
    el.preventDefault();
    console.log('Password forgotten');
  };
  const cancelDemo = el => {
    console.log('cancel');
  };
  const startDemo = el => {
    const user = {
      loggedIn: true,
      hideLogin: true,
      userName: 'Demo-User',
      email: 'demo-email@gmail.com',
      password: '12345678',
    };
    const data = dataCtx;
    data.menuState.userData = user;
    localStorage.setItem('localData', JSON.stringify(data));
    props.onLoginHandler({ userData: user });
    setCreateAccount(false);
    props.message({
      title: `Demo-Modus`,
      message: 'Viel Spaß beim testen der App!',
      showBtnX: false,
    });
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
