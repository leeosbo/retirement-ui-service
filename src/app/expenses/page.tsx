'use client';

import ExpenseList from '@/components/ExpenseList';
import FlexContainer from '@/components/FlexContainer';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useCallback, useContext, useEffect } from 'react';
import classes from '../../css/ListPages.module.css';

const Expenses = () => {
  const { loadExpenses, setLoadExpenses } = useContext(PageContext);
  const { basicAuthToken, userId } = useContext(AuthContext);
  const { expenseList, setExpenseList } = useContext(PageContext);

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
    if (basicAuthToken == '') {
      redirect('/login');
    }
    if (loadExpenses) {
      getExpenses(userId);
    }
  }, [basicAuthToken, getExpenses, userId, loadExpenses]);

  return (
    <FlexContainer>
      <div className={classes.top}>
        <h1>Expenses</h1>
        <Link href={`/expenses/addnew`} className={`${classes.link}`}>
          + Add New
        </Link>
      </div>
      <ExpenseList expenseList={expenseList} />
    </FlexContainer>
  );
};

export default Expenses;
