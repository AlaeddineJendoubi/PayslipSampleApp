import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'react-native-feather';
import { useTheme } from '../../app/theme/ThemeProvider';

export const BackButton: FC = () => {
  const { goBack } = useNavigation();
  const {
    theme: { colors },
  } = useTheme();
  const backAction = () => {
    goBack();
  };
  return (
    <TouchableOpacity style={styles.container} onPress={backAction}>
      <ArrowLeft width={30} height={30} color={colors.text} />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingLeft: 5,
    paddingTop: 5,
    width: 40,
    height: 40,
    alignContent: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    backgroundColor: '#fff', // shadow is only visible if there is a background
    borderRadius: 8, // optional: round corners
  },
});
