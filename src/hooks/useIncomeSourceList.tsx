'use client';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import { useCallback, useContext, useEffect } from 'react';
import useAuthContext from './useAuthContext';

const useIncomeSourceList: () => void = () => {
  const { basicAuthToken, userId } = useContext(AuthContext);
  const { setIncomeSourceList, loadIncomeSources, setLoadIncomeSources } =
    useContext(PageContext);
  useAuthContext();

  const getIncomeSources = useCallback(
    async (id: number) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/incomesources?userId=' +
          id,
        {
          headers: {
            Authorization: basicAuthToken,
          },
        }
      );

      const data = await response.json();
      setIncomeSourceList(data);
      setLoadIncomeSources(false);
    },
    [basicAuthToken, setIncomeSourceList, setLoadIncomeSources]
  );

  useEffect(() => {
    if (loadIncomeSources && userId != 0) {
      getIncomeSources(userId);
    }
  }, [loadIncomeSources, getIncomeSources, userId]);
};

export default useIncomeSourceList;
