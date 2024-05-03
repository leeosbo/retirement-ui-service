import { useContext, useState } from 'react';
import classes from './DetailList.module.css';
import EditModal, { IUpdateable } from './EditModal';
import { AuthContext } from '@/store/auth-context';
import { PageContext } from '@/store/page-context';
import DeleteModal, { IDeleteable } from './DeleteModal';

export type IncomeSource = {
  id: number;
  userId: number;
  name: string;
  accountBalance: number;
  returnRate: number;
  returnFrequency: number;
};

const IncomeSourceList: React.FC<{ incomeSourceList: IncomeSource[] }> = ({
  incomeSourceList,
}) => {
  const { basicAuthToken } = useContext(AuthContext);
  const { setLoadIncomeSources } = useContext(PageContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [updateable, setUpdateable] = useState<IUpdateable<IncomeSource>>();
  const [deleteable, setDeleteable] = useState<IDeleteable<IncomeSource>>();
  const [deleting, setDeleting] = useState<boolean>(false);

  const editHandler = (id: number) => {
    const incomeSource = incomeSourceList.find((source) => source.id == id);
    if (incomeSource != undefined) {
      const updateable: IUpdateable<IncomeSource> = {
        toUpdate: incomeSource,
        update: updateIncomeSource,
      };

      setUpdateable(updateable);
      setEditing(true);
    } else {
      console.error('somehow a non-existent income source is being updated?');
    }
  };

  const deleteHandler = (id: number) => {
    const incomeSource = incomeSourceList.find((source) => source.id == id);
    if (incomeSource != undefined) {
      const deleteable: IDeleteable<IncomeSource> = {
        toDelete: incomeSource,
        delete: deleteIncomeSource,
      };

      setDeleteable(deleteable);
      setDeleting(true);
    } else {
      console.error('somehow a non-existent income source is being deleting?');
    }
  };

  const closeHandler = () => {
    setEditing(false);
    setDeleting(false);
  };

  const updateIncomeSource = async (incomeSource: IncomeSource) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
        '/retirement/api/incomesources/' +
        incomeSource.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: basicAuthToken,
        },
        body: JSON.stringify(incomeSource),
      }
    );

    const status = response.status;
    if (status == 204) {
      setLoadIncomeSources(true);
    }

    return status;
  };

  const deleteIncomeSource = async (incomeSource: IncomeSource) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SERVICE_BASE_URL +
        '/retirement/api/incomesources/' +
        incomeSource.id,
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
      setLoadIncomeSources(true);
    }

    return status;
  };

  const incomeSourceComponents = incomeSourceList.map((item) => {
    return (
      <div key={item.id} className={classes.detailsContainer}>
        <div className={classes.itemDetails}>
          <div className={classes.detailRow}>
            <div className={classes.name}>{item.name}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Balance: </div>
            <div className={classes.value}>{item.accountBalance}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Return Rate: </div>
            <div className={classes.value}>{item.returnRate}</div>
          </div>
          <div className={classes.detailRow}>
            <div className={classes.name}>Return Frequency: </div>
            <div className={classes.value}>{item.returnFrequency}</div>
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
      {incomeSourceComponents}

      {editing && updateable != undefined && (
        <EditModal onCloseHandler={closeHandler} updateable={updateable} />
      )}
      {deleting && deleteable != undefined && (
        <DeleteModal onCloseHandler={closeHandler} deleteable={deleteable} />
      )}
    </div>
  );
};

export default IncomeSourceList;
