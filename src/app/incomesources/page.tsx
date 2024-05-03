'use client';
import FlexContainer from '@/components/FlexContainer';
import IncomeSourceList from '@/components/IncomeSourceList';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useCallback, useContext, useEffect } from 'react';
import classes from '../../css/ListPages.module.css';

const IncomeSources = () => {
  const { basicAuthToken, userId } = useContext(AuthContext);
  const { incomeSourceList, setIncomeSourceList } = useContext(PageContext);
  const { loadIncomeSources, setLoadIncomeSources } = useContext(PageContext);

  const getIncomeSources = useCallback(
    async (id: number) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/incomesources?user=' +
          id,
        {
          headers: {
            Authorization: basicAuthToken,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setIncomeSourceList(data);
      setLoadIncomeSources(false);
    },
    [basicAuthToken, setIncomeSourceList, setLoadIncomeSources]
  );

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/login');
    }

    if (loadIncomeSources) {
      getIncomeSources(userId);
    }
  }, [basicAuthToken, getIncomeSources, userId, loadIncomeSources]);

  return (
    <FlexContainer>
      <div className={classes.top}>
        <h1>Income Sources</h1>
        <Link href={`/incomesources/addnew`} className={`${classes.link}`}>
          + Add New
        </Link>
      </div>
      <IncomeSourceList incomeSourceList={incomeSourceList} />
    </FlexContainer>
  );
};
export default IncomeSources;
