import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../app/theme/ThemeProvider';

interface CardProps {
  children?: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({ children }) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
