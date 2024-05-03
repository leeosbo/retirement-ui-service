'use client';
import { AuthContext } from '@/store/auth-context';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';
import classes from '../../css/InputForms.module.css';
import FlexContainer from '@/components/FlexContainer';

const Logout = () => {
  const { basicAuthToken, setBasicAuthToken } = useContext(AuthContext);

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/login');
    }
  }, [basicAuthToken]);

  const logoutHandler = () => {
    setBasicAuthToken('');
    redirect('/login');
  };

  return (
    <FlexContainer title='Logout'>
      <div className={classes.inputContainer}>
        <div className={classes.inputElement}>
          Are you sure you want to logout?
        </div>
        <div className={classes.buttonsContainer}>
          <button onClick={logoutHandler} className={classes.button}>
            Logout
          </button>
        </div>
      </div>
    </FlexContainer>
  );
};

export default Logout;
