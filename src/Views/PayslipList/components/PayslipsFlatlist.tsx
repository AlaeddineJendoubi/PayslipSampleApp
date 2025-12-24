import React, { useCallback } from 'react';
import { Payslip, PaySlips } from '../../../modules/payslips/types';
import { FlatList, View } from 'react-native';
import { NavigationProp } from '../../../app/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { PayslipItem } from './PayslipItem';
import { EmptySearchResult } from './EmptySearchResult';

interface PayslipsFlatListProps {
  payslips: PaySlips;
  loadMore: () => void;
}

const UnmemoPayslipsFlatList: React.FC<PayslipsFlatListProps> = ({
  payslips,
  loadMore,
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={payslips}
        renderItem={renderPayslipItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptySearchResult}
        onEndReached={loadMore}
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
};

export const PayslipsFlatList = React.memo(UnmemoPayslipsFlatList);
