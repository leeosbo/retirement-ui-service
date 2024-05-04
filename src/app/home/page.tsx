'use client';
import RetirementEstimate, { Estimate } from '@/components/RetirementEstimate';
import { AuthContext } from '@/store/auth-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import FlexContainer from '@/components/FlexContainer';
import SavingsProgress from '@/components/SavingsProgress';
import useIncomeSourceList from '@/hooks/useIncomeSourceList';
import useExpenseList from '@/hooks/useExpenseList';
import useAuthContext from '@/hooks/useAuthContext';

const Home = () => {
  const { basicAuthToken, userId } = useContext(AuthContext);
  const [estimate, setEstimate] = useState<Estimate>();
  useAuthContext();
  useIncomeSourceList();
  useExpenseList();

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
    if (userId != 0) {
      getCurrentEstimate(userId);
    }
  }, [getCurrentEstimate, userId]);

  return (
    <>
      {userId != 0 && (
        <FlexContainer title='Home'>
          <RetirementEstimate estimate={estimate}></RetirementEstimate>
          {estimate != undefined && (
            <SavingsProgress estimate={estimate}></SavingsProgress>
          )}
        </FlexContainer>
      )}
    </>
  );
};

export default Home;
