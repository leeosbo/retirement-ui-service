'use client';
import { AuthContext } from '@/store/auth-context';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

const useAuthContext: () => void = () => {
  const authContext = useContext(AuthContext);
  const { basicAuthToken, setBasicAuthToken } = authContext;

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/login');
    }
  }, [basicAuthToken]);
};

export default useAuthContext;
