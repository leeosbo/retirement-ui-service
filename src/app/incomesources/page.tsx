'use client';
import FlexContainer from '@/components/FlexContainer';
import IncomeSourceList from '@/components/IncomeSourceList';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { useContext } from 'react';
import classes from '../../css/ListPages.module.css';
import useAuthContext from '@/hooks/useAuthContext';
import useIncomeSourceList from '@/hooks/useIncomeSourceList';

const IncomeSources = () => {
  const { incomeSourceList } = useContext(PageContext);
  useAuthContext();
  useIncomeSourceList();

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
