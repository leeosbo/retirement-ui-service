'use client';
import { useContext, useEffect, useState } from 'react';
import classes from './login.module.css';
import { AuthContext } from '@/store/auth-context';
import { redirect } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = useContext(AuthContext);
  const { basicAuthToken, setBasicAuthToken, setUserId } = authContext;
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (basicAuthToken != '') {
      redirect('/home');
    }
  }, [basicAuthToken]);

  const usernameChangeHandler = (event: any) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL + '/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Basic ' + btoa(username + ':' + password),
          },
        }
      );
      if (response.status == 200) {
        setBasicAuthToken('Basic ' + btoa(username + ':' + password));
        const userId = await response.json();
        setFailedLogin(false);
        setUserId(userId);
      } else if (response.status == 401) {
        // failed authentication
        setFailedLogin(true);
        setErrorMessage('*Invalid Credentials Provided');
      } else {
        // system issue
        setErrorMessage(
          'Unexpected System Error. Please try again or contact the administrator'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form
        id='login-form'
        className={classes.loginForm}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='username'>Email</label>
          </div>

          <div className={classes.input}>
            <input
              id='username'
              className={classes.inputElement}
              type='text'
              name='username'
              placeholder='enter username'
              value={username}
              onChange={usernameChangeHandler}
              tabIndex={1}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='password'>Password</label>
          </div>
          <div className={classes.input}>
            <input
              id='password'
              className={classes.inputElement}
              type='password'
              name='password'
              placeholder='enter password'
              value={password}
              onChange={passwordChangeHandler}
              tabIndex={2}
            ></input>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button type='submit' onClick={login} className={classes.loginButton}>
            Login
          </button>
          <button
            onClick={() => console.log('register')}
            className={classes.loginButton}
          >
            Register
          </button>
        </div>
      </form>
      {failedLogin && <div>{errorMessage}</div>}
    </>
  );
};

export default Login;
