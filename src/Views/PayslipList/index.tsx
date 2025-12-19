import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { PayslipItem } from './components/PayslipItem';
import { Payslip } from '../../modules/payslips/types';
import { NavigationProp } from '../../app/navigation/types';
import { useManagePayslips } from './hooks/useManagePayslips';
import { FlatList } from 'react-native';

export const PayslipsList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data } = useManagePayslips();

  const navigateToDetails = (payslip: Payslip) => {
    navigation.navigate('PayslipsDetails', { payslip });
  };
  const renderPayslipItem = ({ item }: { item: Payslip }) => (
    <PayslipItem payslipData={item} onPress={() => navigateToDetails(item)} />
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderPayslipItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};
