import React from 'react';
import { Label } from '../../../components/Label';
import { StyleSheet, View } from 'react-native';
import { Slash } from 'react-native-feather';
import { useTheme } from '../../../app/theme/ThemeProvider';
import { Line } from '../../../components/Line';

export const EmptySearchResult: React.FC = () => {
  const {
    theme: { textStyles },
  } = useTheme();
  return (
    <View style={styles.container}>
      <Slash width={40} height={40} color={textStyles?.error?.color} />
      <Line />
      <Label text="No payslips found matching your search." type="error" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
