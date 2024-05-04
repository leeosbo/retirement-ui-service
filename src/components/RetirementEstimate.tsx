import classes from './RetirementEstimate.module.css';

export type Estimate = {
  userId: number | string;
  monthlyIncomeAvailable: number | string;
  monthlyExpenses: number | string;
  monthlyDisposable: number;
  onTrack: boolean;
  monthlyToSave: number;
  totalAdditionalSavings: number;
};

const loadingEstimate: Estimate = {
  userId: '',
  monthlyIncomeAvailable: '',
  monthlyExpenses: '',
  monthlyDisposable: 0,
  onTrack: true,
  monthlyToSave: 0,
  totalAdditionalSavings: 0,
};

const RetirementEstimate: React.FC<{ estimate?: Estimate }> = ({
  estimate,
}) => {
  const estimateUndefined = estimate == undefined;
  const estimateToDisplay: Estimate = estimateUndefined
    ? loadingEstimate
    : estimate;

  return (
    <div className={classes.estimateContainer}>
      <div className={classes.estimateDisplay}>
        <span className={`${classes.displayRow} ${classes.title}`}>
          Retirement Estimate
        </span>
        <span className={classes.displayRow}>
          <label>Monthly Income Available: </label>

          <span>{estimateToDisplay.monthlyIncomeAvailable}</span>
        </span>
        <span className={classes.displayRow}>
          <label>Monthly Expenses: </label>

          <span>{estimateToDisplay.monthlyExpenses}</span>
        </span>
        <span className={classes.displayRow}>
          <label>Disposable Income: </label>

          <span>{estimateToDisplay.monthlyDisposable}</span>
        </span>
      </div>
    </div>
  );
};

export default RetirementEstimate;
