import React, { useState, useContext } from 'react';
// import DataUpdate from '../store/DataProvider';
import classes from './Login.module.css';
import ButtonRound from './ButtonRound';
import useInput from '../../hooks/useInput';

const Login = props => {
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

  const onClickHandler = el => {
    if (el === 'x') {
      // el.preventDefault();
      setCreateAccount(false);
      console.log('ok');
    }
  };

  const onCreateAccount = el => {
    el.preventDefault();
    setCreateAccount(true);
  };
  const onLoginHandler = el => {
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
        'Im Demo-Modus ist speichern nicht möglich, alle Daten gehen nach dem APP Neustart verloren !',
      showBtnX: true,
      dismiss: cancelDemo,
      confirm: startDemo,
    });
  };
  const onPasswordForgotten = el => {
    el.preventDefault();
    console.log('forgotten');
  };
  const cancelDemo = el => {
    console.log(el);
    console.log('cancel');
  };
  const startDemo = el => {
    console.log('start');
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
            Accont anlegen
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
