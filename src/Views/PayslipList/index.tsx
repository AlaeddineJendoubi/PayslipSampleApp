import React, { useRef } from 'react';
import { useManagePayslips } from './hooks/useManagePayslips';
import { View } from 'react-native';
import { PayslipSearchBar } from './components/PayslipsSearchBar';
import { PayslipSortBar } from './components/PayslipSortBar';
import { PayslipsFlatList } from './components/PayslipsFlatlist';

export const PayslipsList: React.FC = () => {
  const { data, setFilter, setSortBy, hasValue, loadMore } =
    useManagePayslips();

  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <View style={{ flex: 1 }}>
      <PayslipSearchBar setFilter={setFilter} hasValue={hasValue} />
      <PayslipSortBar setSortBy={setSortBy} />
      <PayslipsFlatList payslips={data} loadMore={loadMore} />
    </View>
  );
};
