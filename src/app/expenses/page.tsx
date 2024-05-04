'use client';

import ExpenseList from '@/components/ExpenseList';
import FlexContainer from '@/components/FlexContainer';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { useContext } from 'react';
import classes from '../../css/ListPages.module.css';
import useAuthContext from '@/hooks/useAuthContext';
import useExpenseList from '@/hooks/useExpenseList';

const Expenses = () => {
  const { expenseList } = useContext(PageContext);
  useAuthContext();
  useExpenseList();

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
