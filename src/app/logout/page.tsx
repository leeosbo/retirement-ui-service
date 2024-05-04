'use client';
import { AuthContext } from '@/store/auth-context';
import { useContext } from 'react';
import classes from '../../css/InputForms.module.css';
import FlexContainer from '@/components/FlexContainer';
import useAuthContext from '@/hooks/useAuthContext';
import Link from 'next/link';

const Logout = () => {
  const { setBasicAuthToken } = useContext(AuthContext);
  useAuthContext();

  const logoutHandler = () => {
    setBasicAuthToken('');
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
          <button className={classes.button}>
            <Link href={`/home`}>Cancel</Link>
          </button>
        </div>
      </div>
    </FlexContainer>
  );
};

export default Logout;
