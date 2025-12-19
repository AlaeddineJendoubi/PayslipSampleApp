import React from 'react';
import { Card } from '../../../components/Card';
import { Label } from '../../../components/Label';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Hash, Calendar, ArrowRight } from 'react-native-feather';
import { useTheme } from '../../../app/theme/ThemeProvider';
import { Payslip } from '../../../modules/payslips/types';
import { Line } from '../../../components/Line';
import { convertDateToReadableString } from '../../../utils/dateConverters';

interface PayslipItemProps {
  payslipData: Payslip;
  onPress?: () => void;
  testID?: string;
}
export const PayslipItem: React.FC<PayslipItemProps> = ({
  payslipData,
  onPress,
}) => {
  const {
    theme: { textStyles },
  } = useTheme();

  const convertedFromDate = convertDateToReadableString(payslipData.fromDate);
  const convertedToDate = convertDateToReadableString(payslipData.toDate);
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <View style={styles.headerContainer}>
          <View style={styles.subContainer}>
            <Hash width={15} height={15} color={textStyles?.body?.color} />
            <Label text="Payslip ID" type="body" />
          </View>
          <Label text={payslipData.id} type="body" />
        </View>
        <Line />

        <View style={styles.dataLineContainer}>
          <Label text={` From: `} type="body" />
          <Calendar width={15} height={15} color={textStyles?.body?.color} />
          <Label text={` ${convertedFromDate}`} type="body" />
          <ArrowRight
            width={15}
            height={15}
            color={textStyles?.body?.color}
            style={styles.iconStyle}
          />

          <Label text={` To: `} type="body" />
          <Calendar width={15} height={15} color={textStyles?.body?.color} />

          <Label text={` ${convertedToDate}`} type="body" />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.5,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-evenly',
  },
  iconStyle: {
    marginHorizontal: 5,
  },
});
