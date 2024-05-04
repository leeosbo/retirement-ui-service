'use client';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import { useCallback, useContext, useEffect } from 'react';
import useAuthContext from './useAuthContext';

const useExpenseList: () => void = () => {
  const { basicAuthToken, userId } = useContext(AuthContext);
  const { setExpenseList, loadExpenses, setLoadExpenses } =
    useContext(PageContext);
  useAuthContext();

  const getExpenses = useCallback(
    async (id: number) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/expenses?user=' +
          id,
        {
          headers: {
            Authorization: basicAuthToken,
          },
        }
      );

      const expenses = await response.json();
      setExpenseList(expenses);
      setLoadExpenses(false);
    },
    [basicAuthToken, setExpenseList, setLoadExpenses]
  );

  useEffect(() => {
    if (loadExpenses && userId != 0) {
      getExpenses(userId);
    }
  }, [loadExpenses, getExpenses, userId]);
};

export default useExpenseList;
