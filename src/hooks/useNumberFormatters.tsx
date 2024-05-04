'use client';
import { useMemo } from 'react';
import { CurrencyFormatter, PercentFormatter } from '@/ui/NumberFormatter';

export const useCurrencyFormatter: () => Intl.NumberFormat = () => {
  return useMemo(() => {
    return CurrencyFormatter();
  }, []);
};

export const usePercentFormatter: () => Intl.NumberFormat = () => {
  return useMemo(() => {
    return PercentFormatter();
  }, []);
};
