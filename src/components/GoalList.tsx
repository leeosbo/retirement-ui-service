import { useContext, useState } from 'react';
import classes from './DetailList.module.css';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import EditModal, { IUpdateable } from './EditModal';
import DeleteModal, { IDeleteable } from './DeleteModal';

export type Goal = {
  id: number;
  userId: number;
  name: string;
  disposableIncome: number;
  frequency: number;
  primaryGoal: string;
};

const GoalList: React.FC<{ goalList: Goal[] }> = ({ goalList }) => {
  const { basicAuthToken } = useContext(AuthContext);
  const { setLoadGoals } = useContext(PageContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [updateable, setUpdateable] = useState<IUpdateable<Goal>>();
  const [deleteable, setDeleteable] = useState<IDeleteable<Goal>>();
  const [deleting, setDeleting] = useState<boolean>(false);

  const editHandler = (id: number) => {
    const goal = goalList.find((goal) => goal.id == id);
    if (goal != undefined) {
      const updateable: IUpdateable<Goal> = {
        toUpdate: goal,
        update: updateGoal,
      };
      setUpdateable(updateable);
      setEditing(true);
    } else {
      console.error('somehow a non-existent goal is being updated?');
    }
  };

  const deleteHandler = (id: number) => {
    const goal = goalList.find((goal) => goal.id == id);
    if (goal != undefined) {
      const deleteable: IDeleteable<Goal> = {
        toDelete: goal,
        delete: deleteGoal,
      };

      setDeleteable(deleteable);
      setDeleting(true);
    } else {
      console.error('somehow a non-existent goal is being updated?');
    }
  };

  const closeHandler = () => {
    setEditing(false);
    setDeleting(false);
  };

  const updateGoal = async (goal: Goal) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
        '/retirement/api/goals/' +
        goal.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: basicAuthToken,
        },
        body: JSON.stringify(goal),
      }
    );

    const status = response.status;
    if (status == 204) {
      setLoadGoals(true);
    }

    return status;
  };

  const deleteGoal = async (goal: Goal) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
        '/retirement/api/goals/' +
        goal.id,
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
      setLoadGoals(true);
    }

    return status;
  };

  const goalComponents = goalList.map((item) => {
    return (
      <div key={item.id} className={classes.detailsContainer}>
        <div className={classes.itemDetails}>
          <div className={classes.detailRow}>
            <div className={classes.name}>{item.name}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Disposable Income: </div>
            <div className={classes.value}>{item.disposableIncome}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Frequency Per Year: </div>
            <div className={classes.value}>{item.frequency}</div>
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
      {goalComponents}
      {editing && updateable != undefined && (
        <EditModal onCloseHandler={closeHandler} updateable={updateable} />
      )}
      {deleting && deleteable != undefined && (
        <DeleteModal onCloseHandler={closeHandler} deleteable={deleteable} />
      )}
    </div>
  );
};

export default GoalList;
