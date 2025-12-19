import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../app/theme/ThemeProvider';

export const Line: FC = () => {
  const {
    theme: { textStyles },
  } = useTheme();
  return (
    <View style={[styles.line, { backgroundColor: textStyles?.body?.color }]} />
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    marginVertical: 8,
    opacity: 0.4,
  },
});
