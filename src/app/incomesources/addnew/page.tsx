'use client';
import { useContext, useEffect, useState } from 'react';
import classes from '../../login/login.module.css';
import { AuthContext } from '@/store/auth-context';
import { IncomeSource } from '@/components/IncomeSourceList';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const AddNewIncomeSourceForm = () => {
  const authContext = useContext(AuthContext);
  const { setLoadIncomeSources } = useContext(PageContext);
  const { basicAuthToken, userId } = authContext;
  const [backToIncomeSourceList, setBackToIncomeSourceList] =
    useState<boolean>(false);
  const [incomeSource, setIncomeSource] = useState<IncomeSource>({
    id: 0,
    userId: userId,
    name: '',
    accountBalance: 0,
    returnRate: 0,
    returnFrequency: 0,
  });

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/home');
    }
    if (backToIncomeSourceList) {
      redirect('/incomesources');
    }
  }, [basicAuthToken, backToIncomeSourceList]);

  const changeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setIncomeSource((values: any) => ({ ...values, [name]: value }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/incomesources',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: basicAuthToken,
          },
          body: JSON.stringify(incomeSource),
        }
      );
      if (response.status == 201) {
        setLoadIncomeSources(true);
        setBackToIncomeSourceList(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add a New Income Source</h1>
      <form
        id='income-source-form'
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
              placeholder='enter income source name'
              value={incomeSource?.name || ''}
              onChange={changeHandler}
              tabIndex={1}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='accountBalance'>Account Balance</label>
          </div>
          <div className={classes.input}>
            <input
              id='accountBalance'
              className={classes.inputElement}
              type='text'
              name='accountBalance'
              placeholder='enter account balance'
              value={incomeSource?.accountBalance || ''}
              onChange={changeHandler}
              tabIndex={2}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='returnRate'>Rate of Return</label>
          </div>
          <div className={classes.input}>
            <input
              id='returnRate'
              className={classes.inputElement}
              type='text'
              name='returnRate'
              placeholder='enter return rate'
              value={incomeSource?.returnRate || ''}
              onChange={changeHandler}
              tabIndex={3}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='returnFrequency'>Frequency of Return</label>
          </div>
          <div className={classes.input}>
            <input
              id='returnFrequency'
              className={classes.inputElement}
              type='text'
              name='returnFrequency'
              placeholder='enter frequency of return'
              value={incomeSource?.returnFrequency || ''}
              onChange={changeHandler}
              tabIndex={4}
            ></input>
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
            <Link href={`/incomesources`}>Cancel</Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewIncomeSourceForm;
