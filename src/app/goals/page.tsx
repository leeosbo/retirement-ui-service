'use client';

import FlexContainer from '@/components/FlexContainer';
import GoalList from '@/components/GoalList';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import { redirect } from 'next/navigation';
import { useCallback, useContext, useEffect } from 'react';
import classes from '../../css/ListPages.module.css';
import Link from 'next/link';

const Goals = () => {
  const { loadGoals, setLoadGoals } = useContext(PageContext);
  const { basicAuthToken, userId } = useContext(AuthContext);
  const { goalList, setGoalList } = useContext(PageContext);

  const getGoals = useCallback(
    async (id: number) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/goals?user=' +
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
    if (basicAuthToken == '') {
      redirect('/login');
    }
    if (loadGoals) {
      getGoals(userId);
    }
  }, [basicAuthToken, getGoals, userId, loadGoals]);

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
