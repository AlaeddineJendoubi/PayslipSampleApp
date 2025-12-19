import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { useTheme } from '../theme/ThemeProvider';
import { Paysliplist } from '../../Views/PayslipList';
import { PayslipDetails } from '../../Views/PayslipDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="PayslipsList"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="PayslipsList"
          component={Paysliplist}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen name="PayslipsDetails" component={PayslipDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
