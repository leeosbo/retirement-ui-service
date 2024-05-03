'use client';
import { Expense } from '@/components/ExpenseList';
import { Goal } from '@/components/GoalList';
import { IncomeSource } from '@/components/IncomeSourceList';
import { createContext, ReactNode, useState } from 'react';

type Retiree = {
  id: string;
  email: string;
};

interface IPageContext {
  loadIncomeSources: boolean;
  setLoadIncomeSources: (loadIncomeSources: boolean) => void;
  incomeSourceList: IncomeSource[];
  setIncomeSourceList: (incomeSourceList: IncomeSource[]) => void;
  loadExpenses: boolean;
  setLoadExpenses: (loadExpenses: boolean) => void;
  expenseList: Expense[];
  setExpenseList: (expenseList: Expense[]) => void;
  loadGoals: boolean;
  setLoadGoals: (loadGoals: boolean) => void;
  goalList: Goal[];
  setGoalList: (goalList: Goal[]) => void;
}

export const PageContext = createContext<IPageContext>({
  loadIncomeSources: true,
  setLoadIncomeSources: () => {},
  incomeSourceList: [],
  setIncomeSourceList: () => {},
  loadExpenses: true,
  setLoadExpenses: () => {},
  expenseList: [],
  setExpenseList: () => {},
  loadGoals: true,
  setLoadGoals: () => {},
  goalList: [],
  setGoalList: () => {},
});

const PageContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [loadIncomeSources, setLoadIncomeSources] = useState<boolean>(true);
  const [incomeSourceList, setIncomeSourceList] = useState<IncomeSource[]>([]);
  const [loadExpenses, setLoadExpenses] = useState<boolean>(true);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [loadGoals, setLoadGoals] = useState<boolean>(true);
  const [goalList, setGoalList] = useState<Goal[]>([]);

  const pageContextValue = {
    loadIncomeSources: loadIncomeSources,
    setLoadIncomeSources: setLoadIncomeSources,
    incomeSourceList: incomeSourceList,
    setIncomeSourceList: setIncomeSourceList,
    loadExpenses: loadExpenses,
    setLoadExpenses: setLoadExpenses,
    expenseList: expenseList,
    setExpenseList: setExpenseList,
    loadGoals: loadGoals,
    setLoadGoals: setLoadGoals,
    goalList: goalList,
    setGoalList: setGoalList,
  };

  return (
    <PageContext.Provider value={pageContextValue}>
      {props.children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
