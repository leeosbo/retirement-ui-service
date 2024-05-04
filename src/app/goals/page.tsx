'use client';

import FlexContainer from '@/components/FlexContainer';
import GoalList from '@/components/GoalList';
import { PageContext } from '@/store/page-context';
import { useContext } from 'react';
import classes from '../../css/ListPages.module.css';
import Link from 'next/link';
import useGoalList from '@/hooks/useGoalList';
import useAuthContext from '@/hooks/useAuthContext';

const Goals = () => {
  const { goalList } = useContext(PageContext);

  useAuthContext();
  useGoalList();

  return (
    <FlexContainer>
      <div className={classes.top}>
        <h1>Goals</h1>
        <Link href={`/goals/addnew`} className={`${classes.link}`}>
          + Add New
        </Link>
      </div>
      <GoalList goalList={goalList} />
    </FlexContainer>
  );
};

export default Goals;
