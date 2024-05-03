import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import classes from './EditModal.module.css';
import { Expense } from './ExpenseList';
import { IncomeSource } from './IncomeSourceList';
import { Goal } from './GoalList';

export interface IUpdateable<T> {
  toUpdate: T;
  update(item: T): Promise<number>;
}

const EditModal: React.FC<{
  onCloseHandler: () => void;
  updateable: IUpdateable<IncomeSource | Expense | Goal>;
}> = ({ onCloseHandler, updateable }) => {
  const [toUpdate, setToUpdate] = useState<any>(updateable.toUpdate);

  const overlayOnClickHandler = () => {
    onCloseHandler();
  };

  const containerClickHandler = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const changeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setToUpdate((values: any) => ({ ...values, [name]: value }));
  };

  const updateHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const status = await updateable.update(toUpdate);
    if (status == 204) {
      // need another modal or something to display success to user
      onCloseHandler();
    } else {
      console.log('failure');
    }
  };

  let details: (JSX.Element | undefined)[] = [];
  for (const [name, value] of Object.entries(updateable.toUpdate)) {
    if (name != 'id' && name != 'userId') {
      details.push(
        <div
          key={`${updateable.toUpdate.id}_${name}`}
          className={classes.itemDetails}
        >
          <div className={classes.detailRow}>
            <div className={classes.name}>{name}: </div>
            <input
              value={toUpdate[name] || ''}
              onChange={changeHandler}
              id={`${updateable.toUpdate.id}_${name}`}
              className={classes.inputElement}
              name={`${name}`}
              tabIndex={1}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className={classes.overlay} onClick={overlayOnClickHandler}>
      <div className={classes.container} onClick={containerClickHandler}>
        <div className={classes.containerTop}>
          <div className={classes.left}>
            <div className={classes.title}>Edit</div>
          </div>
          <div className={classes.right}>
            <div className={classes.onCloseButton} onClick={onCloseHandler}>
              <div className='icon'>
                <i className='fa fa-close'></i>
              </div>
            </div>
          </div>
        </div>
        <form
          className={classes.containerBottom}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className={classes.editingContainer}>
            {details}
            <div className={classes.buttonsContainer}>
              <button
                type='submit'
                onClick={updateHandler}
                className={classes.button}
              >
                Update
              </button>
              <button onClick={onCloseHandler} className={classes.button}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
