import { useCallback, useMemo, useState } from 'react';

import {
  ascFromDateFilter,
  ascIdFilter,
  asctoDateFilter,
  descFromDateFilter,
  descIdFilter,
  desctoDateFilter,
  payslipSearchFilter,
} from '../../../utils/filters';
import { useAppSelector } from '../../../app/state/hooks';
import { selectPayslips } from '../../../modules/payslips/selectors';
import { useDebounce } from '../../../hooks/useDebounce';
export type SortByOptions =
  | 'toDateASC'
  | 'toDateDESC'
  | 'fromDateASC'
  | 'fromDateDESC'
  | 'idASC'
  | 'idDESC'
  | undefined;
export const useManagePayslips = () => {
  const payslipData = useAppSelector(selectPayslips);

  const [filter, setFilterState] = useState<string>('');
  const [sortBy, setSortByState] = useState<SortByOptions>();
  const debouncedFilter = useDebounce(filter);
  const filteredAndSorted = useMemo(() => {
    if (debouncedFilter) {
      return payslipSearchFilter(payslipData, debouncedFilter);
    }

    if (sortBy === 'fromDateASC') {
      return ascFromDateFilter(payslipData);
    } else if (sortBy === 'fromDateDESC') {
      return descFromDateFilter(payslipData);
    } else if (sortBy === 'toDateASC') {
      return asctoDateFilter(payslipData);
    } else if (sortBy === 'toDateDESC') {
      return desctoDateFilter(payslipData);
    } else if (sortBy === 'idASC') {
      return ascIdFilter(payslipData);
    } else if (sortBy === 'idDESC') {
      return descIdFilter(payslipData);
    }

    return payslipData;
  }, [payslipData, debouncedFilter, sortBy]);

  const setFilter = useCallback((value: string) => {
    setFilterState(value);
  }, []);

  const setSortBy = useCallback((value: SortByOptions) => {
    setSortByState(value);
  }, []);

  return {
    data: filteredAndSorted,
    setFilter,
    setSortBy,
    hasValue: filter?.length > 0,
  };
};
