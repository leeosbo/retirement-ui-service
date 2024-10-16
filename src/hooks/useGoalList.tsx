'use client';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import { useCallback, useContext, useEffect } from 'react';
import useAuthContext from './useAuthContext';

const useGoalList: () => void = () => {
  const { basicAuthToken, userId } = useContext(AuthContext);
  const { setGoalList, loadGoals, setLoadGoals } = useContext(PageContext);
  useAuthContext();

  const getGoals = useCallback(
    async (id: number) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/goals?userId=' +
          id,
        {
          headers: {
            Authorization: basicAuthToken,
          },
        }
      );

      const goals = await response.json();
      setGoalList(goals);
      setLoadGoals(false);
    },
    [basicAuthToken, setGoalList, setLoadGoals]
  );

  useEffect(() => {
    if (loadGoals && userId != 0) {
      getGoals(userId);
    }
  }, [loadGoals, getGoals, userId]);
};

export default useGoalList;
