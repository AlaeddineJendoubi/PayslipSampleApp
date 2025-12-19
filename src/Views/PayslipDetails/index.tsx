import React from 'react';
import { Card } from '../../components/Card';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BackButton } from '../../components/BackButton';
import {
  Hash,
  Calendar,
  File,
  Image,
  HelpCircle,
  Download,
  Database,
} from 'react-native-feather';
import { Label } from '../../components/Label';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../app/navigation/types';
import { useTheme } from '../../app/theme/ThemeProvider';
import { Line } from '../../components/Line';
import { getFileType } from '../../utils/filters';
import { convertDateToReadableString } from '../../utils/dateConverters';
import { useSaveFile } from './hooks/useSaveFile';

export const PayslipDetails: React.FC = () => {
  const {
    params: { payslip },
  } = useRoute<RouteProp<RootStackParamList, 'PayslipsDetails'>>();

  const {
    theme: { textStyles, colors },
  } = useTheme();

  const fileType = getFileType(payslip.file);

  const convertedFromDate = convertDateToReadableString(payslip.fromDate);
  const convertedToDate = convertDateToReadableString(payslip.toDate);

  const { savedPath, handleSaveBundledFile, error } = useSaveFile(
    payslip?.file,
  );

  return (
    <View>
      <BackButton />
      <Card>
        <View style={styles.headerContainer}>
          <View style={styles.subContainer}>
            <Hash width={15} height={15} color={textStyles?.body?.color} />
            <Label text="Payslip ID" type="body" />
          </View>
          <Label text={payslip.id} type="body" />
        </View>
        <Line />

        <View style={styles.dataLineContainer}>
          <Calendar width={15} height={15} color={textStyles?.body?.color} />
          <Label text={` From: ${convertedFromDate}`} type="body" />
          <Label text={` To: ${convertedToDate}`} type="body" />
        </View>

        <View style={styles.dataLineContainer}>
          {fileType === 'PDF Document' ? (
            <File width={15} height={15} color={textStyles?.body?.color} />
          ) : fileType === 'Image File' ? (
            <Image width={15} height={15} color={textStyles?.body?.color} />
          ) : (
            <HelpCircle
              width={15}
              height={15}
              color={textStyles?.body?.color}
            />
          )}
          <Label text={` File type: ${fileType}`} type="body" />
        </View>

        <View style={styles.dataLineContainer}>
          <Database width={15} height={15} color={textStyles?.body?.color} />
          <Label text={` File Path: `} type="body" />
          <Label text={` ${payslip.file}`} type="link" />
        </View>
      </Card>
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          { backgroundColor: colors.buttonBackground },
        ]}
        onPress={handleSaveBundledFile}
      >
        <Label text="Download" type="button" />
        <Download width={15} height={15} color={textStyles?.button?.color} />
      </TouchableOpacity>

      <View style={styles.informationContainer}>
        {savedPath && (
          <Label
            text={`File succefully saved at ${savedPath}`}
            type="subheader"
          />
        )}
        {error && <Label text={`Could not save file ${error}`} type="error" />}
      </View>
    </View>
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
  },
  buttonStyle: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '30%',
    alignSelf: 'center',
    marginTop: 20,
  },
  informationContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});
