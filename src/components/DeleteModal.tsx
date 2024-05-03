import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import classes from './EditModal.module.css';
import { Expense } from './ExpenseList';
import { IncomeSource } from './IncomeSourceList';
import { Goal } from './GoalList';

export interface IDeleteable<T> {
  toDelete: T;
  delete(item: T): Promise<number>;
}

const DeleteModal: React.FC<{
  onCloseHandler: () => void;
  deleteable: IDeleteable<IncomeSource | Expense | Goal>;
}> = ({ onCloseHandler, deleteable }) => {
  const overlayOnClickHandler = () => {
    onCloseHandler();
  };

  const containerClickHandler = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const deleteHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    const status = await deleteable.delete(deleteable.toDelete);
    if (status == 204) {
      // need another modal or something to display success to user
      onCloseHandler();
    } else {
      console.log('failure');
    }
  };

  return (
    <div className={classes.overlay} onClick={overlayOnClickHandler}>
      <div className={classes.container} onClick={containerClickHandler}>
        <div className={classes.containerTop}>
          <div className={classes.left}>
            <div className={classes.title}>Delete</div>
          </div>
          <div className={classes.right}>
            <div className={classes.onCloseButton} onClick={onCloseHandler}>
              <div className='icon'>
                <i className='fa fa-close'></i>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.editingContainer}>
          {`Are you sure you want to delete ${deleteable.toDelete.name}?`}
          <div className={classes.buttonsContainer}>
            <button onClick={deleteHandler} className={classes.button}>
              Delete Now
            </button>
            <button onClick={onCloseHandler} className={classes.button}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
