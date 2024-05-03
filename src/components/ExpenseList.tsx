import { useContext, useState } from 'react';
import classes from './DetailList.module.css';
import EditModal, { IUpdateable } from './EditModal';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import Link from 'next/link';
import DeleteModal, { IDeleteable } from './DeleteModal';

export type Expense = {
  id: number;
  userId: number;
  name: string;
  amount: number;
  frequencyPerYear: number | string;
};

const ExpenseList: React.FC<{ expenseList: Expense[] }> = ({ expenseList }) => {
  const { basicAuthToken } = useContext(AuthContext);
  const { setLoadExpenses } = useContext(PageContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [updateable, setUpdateable] = useState<IUpdateable<Expense>>();
  const [deleteable, setDeleteable] = useState<IDeleteable<Expense>>();
  const [deleting, setDeleting] = useState<boolean>(false);

  const editHandler = (id: number) => {
    const expense = expenseList.find((exp) => exp.id == id);
    if (expense != undefined) {
      const updateable: IUpdateable<Expense> = {
        toUpdate: expense,
        update: updateExpense,
      };
      setUpdateable(updateable);
      setEditing(true);
    } else {
      console.error('somehow a non-existent expense is being updated?');
    }
  };

  const deleteHandler = (id: number) => {
    const expense = expenseList.find((exp) => exp.id == id);
    if (expense != undefined) {
      const deleteable: IDeleteable<Expense> = {
        toDelete: expense,
        delete: deleteExpense,
      };

      setDeleteable(deleteable);
      setDeleting(true);
    } else {
      console.error('somehow a non-existent income source is being updated?');
    }
  };

  const closeHandler = () => {
    setEditing(false);
    setDeleting(false);
  };

  const updateExpense = async (expense: Expense) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
        '/retirement/api/expenses/' +
        expense.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: basicAuthToken,
        },
        body: JSON.stringify(expense),
      }
    );

    const status = response.status;
    if (status == 204) {
      setLoadExpenses(true);
    }

    return status;
  };

  const deleteExpense = async (expense: Expense) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
        '/retirement/api/expenses/' +
        expense.id,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: basicAuthToken,
        },
      }
    );

    const status = response.status;
    if (status == 204) {
      setLoadExpenses(true);
    }

    return status;
  };

  const expenseComponents = expenseList.map((item) => {
    return (
      <div key={item.id} className={classes.detailsContainer}>
        <div className={classes.itemDetails}>
          <div className={classes.detailRow}>
            <div className={classes.name}>{item.name}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Balance: </div>
            <div className={classes.value}>{item.amount}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Frequency: </div>
            <div className={classes.value}>{item.frequencyPerYear}</div>
          </div>
        </div>
        <div className={classes.buttonsContainer}>
          <button
            onClick={editHandler.bind(null, item.id)}
            className={classes.button}
          >
            Edit
          </button>
          <button
            onClick={deleteHandler.bind(null, item.id)}
            className={classes.button}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className={classes.flexContainer}>
      {expenseComponents}
      {editing && updateable != undefined && (
        <EditModal onCloseHandler={closeHandler} updateable={updateable} />
      )}
      {deleting && deleteable != undefined && (
        <DeleteModal onCloseHandler={closeHandler} deleteable={deleteable} />
      )}
    </div>
  );
};

export default ExpenseList;
