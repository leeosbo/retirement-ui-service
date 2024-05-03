'use client';
import { useContext, useEffect, useState } from 'react';
import classes from '../../login/login.module.css';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Goal } from '@/components/GoalList';

const AddNewGoalForm = () => {
  const authContext = useContext(AuthContext);
  const { setLoadGoals } = useContext(PageContext);
  const { basicAuthToken, userId } = authContext;
  const [backToGoalList, setBackToGoalList] = useState<boolean>(false);
  const [goal, setGoal] = useState<Goal>({
    id: 0,
    userId: userId,
    name: '',
    disposableIncome: 0,
    frequency: 0,
    primaryGoal: 'false',
  });

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/home');
    }
    if (backToGoalList) {
      redirect('/goals');
    }
  }, [basicAuthToken, backToGoalList]);

  const changeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setGoal((values: any) => ({ ...values, [name]: value }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL + '/retirement/api/goals',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: basicAuthToken,
          },
          body: JSON.stringify(goal),
        }
      );
      if (response.status == 201) {
        setLoadGoals(true);
        setBackToGoalList(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add a New Goal</h1>
      <form
        id='new-goal-form'
        className={classes.loginForm}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='name'>Name</label>
          </div>

          <div className={classes.input}>
            <input
              id='name'
              className={classes.inputElement}
              type='text'
              name='name'
              placeholder='enter goal name'
              value={goal?.name || ''}
              onChange={changeHandler}
              tabIndex={1}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='disposableIncome'>Disposable Income</label>
          </div>
          <div className={classes.input}>
            <input
              id='disposableIncome'
              className={classes.inputElement}
              type='text'
              name='disposableIncome'
              placeholder='enter disposable income'
              value={goal?.disposableIncome || ''}
              onChange={changeHandler}
              tabIndex={2}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='frequency'>Frequency Per Year</label>
          </div>
          <div className={classes.input}>
            <input
              id='frequency'
              className={classes.inputElement}
              type='text'
              name='frequency'
              placeholder='enter frequency'
              value={goal?.frequency || ''}
              onChange={changeHandler}
              tabIndex={3}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='primaryGoal'>Set as Primary Goal?</label>
          </div>
          <div className={classes.input}>
            <select
              id='primaryGoal'
              className={classes.inputElement}
              name='primaryGoal'
              value={goal?.primaryGoal || 'FALSE'}
              onChange={changeHandler}
              tabIndex={4}
            >
              <option value='TRUE'>Yes</option>
              <option value='FALSE'>No</option>
            </select>
          </div>
        </div>
        <div className={classes.buttonContainer}>
          <button
            type='submit'
            onClick={submitForm}
            className={classes.loginButton}
          >
            Submit
          </button>
          <button className={classes.loginButton}>
            <Link href={`/goals`}>Cancel</Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewGoalForm;
