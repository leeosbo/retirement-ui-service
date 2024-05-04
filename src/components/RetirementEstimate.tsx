import classes from './RetirementEstimate.module.css';
import { useCurrencyFormatter } from '@/hooks/useNumberFormatters';

export type Estimate = {
  userId: number;
  monthlyIncomeAvailable: number;
  monthlyExpenses: number;
  monthlyDisposable: number;
  onTrack: boolean;
  monthlyToSave: number;
  totalAdditionalSavings: number;
};

const loadingEstimate: Estimate = {
  userId: 0,
  monthlyIncomeAvailable: 0,
  monthlyExpenses: 0,
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
  const currencyFormatter = useCurrencyFormatter();

  return (
    <div className={classes.estimateContainer}>
      <div className={classes.estimateDisplay}>
        <span className={`${classes.displayRow} ${classes.title}`}>
          Retirement Estimate
        </span>
        <span className={classes.displayRow}>
          <label>Monthly Income Available: </label>

          <span>
            {currencyFormatter.format(estimateToDisplay.monthlyIncomeAvailable)}
          </span>
        </span>
        <span className={classes.displayRow}>
          <label>Monthly Expenses: </label>

          <span>
            {currencyFormatter.format(estimateToDisplay.monthlyExpenses)}
          </span>
        </span>
        <span className={classes.displayRow}>
          <label>Disposable Income: </label>

          <span>
            {currencyFormatter.format(estimateToDisplay.monthlyDisposable)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default RetirementEstimate;
