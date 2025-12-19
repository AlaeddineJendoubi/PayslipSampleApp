import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PayslipItem } from './components/PayslipItem';
import { Payslip } from '../../modules/payslips/types';
import { NavigationProp } from '../../app/navigation/types';
import { useManagePayslips } from './hooks/useManagePayslips';
import { FlatList, View } from 'react-native';
import { PayslipSearchBar } from './components/PayslipsSearchBar';
import { EmptySearchResult } from './components/EmptySearchResult';
import { PayslipSortBar } from './components/PayslipSortBar';

export const PayslipsList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data, setFilter, setSortBy, filter } = useManagePayslips();

  const navigateToDetails = (payslip: Payslip) => {
    navigation.navigate('PayslipsDetails', { payslip });
  };
  const renderPayslipItem = ({ item }: { item: Payslip }) => (
    <PayslipItem payslipData={item} onPress={() => navigateToDetails(item)} />
  );

  return (
    <View>
      <PayslipSearchBar setFilter={setFilter} filter={filter} />
      <PayslipSortBar setSortBy={setSortBy} />
      <FlatList
        data={data}
        renderItem={renderPayslipItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptySearchResult}
      />
    </View>
  );
};
