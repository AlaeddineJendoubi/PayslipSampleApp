/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/app/theme/ThemeProvider';
import AppNavigator from './src/app/navigation/AppNavigator';
import { store } from './src/app/state/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ThemeProvider>
          <SafeAreaView />
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
