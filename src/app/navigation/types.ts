import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Payslip } from '../../modules/payslips/types';

export type RootStackParamList = {
  PayslipsList: undefined; // Payslips list screen
  PayslipsDetails: { payslip: Payslip }; // Payslip details screen with payslip data
};

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PayslipsList'
>;
