import React, { useCallback } from 'react';
import { Payslip, PaySlips } from '../../../modules/payslips/types';
import { FlatList } from 'react-native';
import { NavigationProp } from '../../../app/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { PayslipItem } from './PayslipItem';
import { EmptySearchResult } from './EmptySearchResult';

interface PayslipsFlatListProps {
  payslips: PaySlips;
}

const UnmemoPayslipsFlatList: React.FC<PayslipsFlatListProps> = ({
  payslips,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const navigateToDetails = useCallback(
    (payslip: Payslip) => {
      navigation.navigate('PayslipsDetails', { payslip });
    },
    [navigation],
  );

  const renderPayslipItem = useCallback(
    ({ item }: { item: Payslip }) => (
      <PayslipItem payslipData={item} onPress={() => navigateToDetails(item)} />
    ),
    [navigateToDetails],
  );

  return (
    <FlatList
      data={payslips}
      renderItem={renderPayslipItem}
      keyExtractor={item => item.id}
      ListEmptyComponent={EmptySearchResult}
    />
  );
};

export const PayslipsFlatList = React.memo(UnmemoPayslipsFlatList);
