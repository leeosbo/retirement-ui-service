'use client';
import RetirementEstimate, { Estimate } from '@/components/RetirementEstimate';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import classes from './home.module.css';
import FlexContainer from '@/components/FlexContainer';

const Home = () => {
  const { basicAuthToken, userId } = useContext(AuthContext);
  const [estimate, setEstimate] = useState<Estimate>();

  const getCurrentEstimate = useCallback(
    async (id: number) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/estimates/' +
          id,
        {
          headers: {
            Authorization: basicAuthToken,
          },
        }
      );

      const data = await response.json();
      setEstimate(data);
    },
    [basicAuthToken]
  );

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/login');
    }
    if (userId != 0) {
      getCurrentEstimate(userId);
    }
  }, [basicAuthToken, getCurrentEstimate, userId]);

  return (
    <>
      <FlexContainer title='Home'>
        <RetirementEstimate estimate={estimate}></RetirementEstimate>
        <div className={classes.linksContainer}></div>
      </FlexContainer>
    </>
  );
};

export default Home;
