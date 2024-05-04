import { useCallback, useContext, useEffect, useState } from 'react';
import classes from './RetirementEstimate.module.css';
import { PageContext } from '@/store/page-context';
import useGoalList from '@/hooks/useGoalList';
import { Estimate } from './RetirementEstimate';
import { Goal } from './GoalList';
import { useCurrencyFormatter } from '@/hooks/useNumberFormatters';

const SavingsProgress: React.FC<{ estimate: Estimate }> = ({ estimate }) => {
  const { goalList, loadGoals } = useContext(PageContext);
  const [primaryGoal, setPrimaryGoal] = useState<Goal>();
  const currencyFormatter = useCurrencyFormatter();

  const getPrimaryGoal = useCallback(() => {
    if (!loadGoals) {
      const fetchedPrimaryGoal = goalList.find(
        (goal) => goal.primaryGoal != 'false'
      );
      setPrimaryGoal(fetchedPrimaryGoal);
    }
  }, [loadGoals, goalList]);

  useGoalList();

  useEffect(() => {
    getPrimaryGoal();
  }, [getPrimaryGoal, goalList]);

  const onTrack =
    primaryGoal != undefined &&
    estimate.monthlyDisposable - primaryGoal.disposableIncome > 0;

  return (
    <div className={classes.estimateContainer}>
      <div className={classes.estimateDisplay}>
        <span className={`${classes.displayRow} ${classes.title}`}>
          Savings Progress
        </span>
        <span className={classes.displayRow}>
          <label>Primary Goal: </label>

          <span>
            {currencyFormatter.format(primaryGoal?.disposableIncome || 0)}
          </span>
        </span>
        <span className={classes.displayRow}>
          <label>Frequency Per Year: </label>

          <span>{primaryGoal?.frequency}</span>
        </span>
        {onTrack && (
          <span className={classes.displayRow}>
            <span>{`Good job! You're on track!`}</span>
          </span>
        )}
        {!onTrack && (
          <span className={classes.displayRow}>
            <span>{`You need to save ${currencyFormatter.format(
              estimate.monthlyToSave
            )} more per month!`}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default SavingsProgress;
