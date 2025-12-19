import { useMemo, useState } from 'react';

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

  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortByOptions>();

  const filteredAndSorted = useMemo(() => {
    if (filter) {
      console.log('Applying search filter:', filter);
      return payslipSearchFilter(payslipData, filter);
    }
    console.log('sortBy', sortBy);
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
  }, [payslipData, filter, sortBy]);

  return { data: filteredAndSorted, setFilter, setSortBy, filter };
};
