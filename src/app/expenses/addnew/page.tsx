'use client';
import { useContext, useEffect, useState } from 'react';
import classes from '../../login/login.module.css';
import { AuthContext } from '@/store/auth-context';
import { IncomeSource } from '@/components/IncomeSourceList';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Expense } from '@/components/ExpenseList';

const AddNewExpenseForm = () => {
  const authContext = useContext(AuthContext);
  const { setLoadExpenses } = useContext(PageContext);
  const { basicAuthToken, userId } = authContext;
  const [backToExpenseList, setBackToExpenseList] = useState<boolean>(false);
  const [expense, setExpense] = useState<Expense>({
    id: 0,
    userId: userId,
    name: '',
    amount: 0,
    frequencyPerYear: 0,
  });

  useEffect(() => {
    if (basicAuthToken == '') {
      redirect('/home');
    }
    if (backToExpenseList) {
      redirect('/expenses');
    }
  }, [basicAuthToken, backToExpenseList]);

  const changeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setExpense((values: any) => ({ ...values, [name]: value }));
  };

  const submitForm = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
          '/retirement/api/expenses',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: basicAuthToken,
          },
          body: JSON.stringify(expense),
        }
      );
      if (response.status == 201) {
        setLoadExpenses(true);
        setBackToExpenseList(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Add a New Expense</h1>
      <form
        id='new-expense-form'
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
              placeholder='enter expense name'
              value={expense?.name || ''}
              onChange={changeHandler}
              tabIndex={1}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='amount'>Amount</label>
          </div>
          <div className={classes.input}>
            <input
              id='amount'
              className={classes.inputElement}
              type='text'
              name='amount'
              placeholder='enter amount'
              value={expense?.amount || ''}
              onChange={changeHandler}
              tabIndex={2}
            ></input>
          </div>
        </div>
        <div className={classes.inputContainer}>
          <div className={classes.label}>
            <label htmlFor='frequencyPerYear'>
              Frequency of Expense Per Year
            </label>
          </div>
          <div className={classes.input}>
            <input
              id='frequencyPerYear'
              className={classes.inputElement}
              type='text'
              name='frequencyPerYear'
              placeholder='enter frequency'
              value={expense?.frequencyPerYear || ''}
              onChange={changeHandler}
              tabIndex={3}
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
            <Link href={`/expenses`}>Cancel</Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewExpenseForm;
