'use client';
import { createContext, ReactNode, useState } from 'react';

type Retiree = {
  id: string;
  email: string;
};

interface IAuthContext {
  basicAuthToken: string;
  setBasicAuthToken: (token: string) => void;
  userId: number;
  setUserId: (userId: number) => void;
}

export const AuthContext = createContext<IAuthContext>({
  basicAuthToken: '',
  setBasicAuthToken: () => {},
  userId: 0,
  setUserId: () => {},
});

const AuthContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [basicAuthToken, setBasicAuthToken] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const authContextValue = {
    basicAuthToken: basicAuthToken,
    setBasicAuthToken: setBasicAuthToken,
    userId: userId,
    setUserId: setUserId,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
