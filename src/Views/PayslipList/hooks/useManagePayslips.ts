import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [page, setPage] = useState<number>(1);

  const setFilter = useCallback((value: string) => {
    setFilterState(value);
  }, []);

  const setSortBy = useCallback((value: SortByOptions) => {
    setSortByState(value);
  }, []);

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

  const data = useMemo(() => {
    return filteredAndSorted?.slice(0, page * 10);
  }, [filteredAndSorted, page]);

  const loadMore = useCallback(() => {
    if (data.length < filteredAndSorted.length) {
      setPage(p => p + 1);
    }
  }, [data.length, filteredAndSorted.length]);

  useEffect(() => {
    setPage(1);
  }, [filter, sortBy]);

  return {
    data,
    setFilter,
    setSortBy,
    hasValue: filter?.length > 0,
    loadMore,
  };
};
