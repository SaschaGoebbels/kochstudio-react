import React, { useState, useContext } from 'react';
// import DataUpdate from '../store/DataProvider';
import classes from './Login.module.css';
import ButtonRound from './ButtonRound';

const Login = props => {
  const [createAccount, setCreateAccount] = useState(false);
  // const dataUpdate = useContext(DataUpdate);
  const onClickHandler = el => {
    if (el === 'x') {
      setCreateAccount(false);
    }
  };
  const onCreateAccount = () => {
    setCreateAccount(true);
  };
  return (
    <div className={`${classes.login}  ${props.hide && classes.login__hide}`}>
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
              ></input>
            </div>
          )}
          <div className={classes.login__messageBox__inputBox}>
            <label htmlFor="">Email:</label>
            <input
              type="email"
              className={classes.login__inputBox__input}
            ></input>
          </div>
          <div className={classes.login__messageBox__inputBox}>
            <label htmlFor="">Password:</label>
            <input
              type="password"
              className={classes.login__inputBox__input}
            ></input>
          </div>
          {/* <p>{props.message}</p> */}
        </div>
        <footer className={classes.login__footer}>
          {!createAccount && (
            <button className={classes.login__footer__loginBtn}>
              DEMO-Login
            </button>
          )}
          {!createAccount && (
            <button className={classes.login__footer__loginBtn}>LOGIN</button>
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
          <button className={classes.login__secondFooterBox__textBtn}>
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
    </div>
  );
};

export default Login;
