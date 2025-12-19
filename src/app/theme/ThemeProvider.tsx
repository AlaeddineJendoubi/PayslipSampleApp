import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode, ThemeContextType } from './types';
import { darkTheme, lightTheme } from '.';

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: 'system',
  setMode: () => {},
  toggleTheme() {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const scheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('light');

  const setMode = (newMode: ThemeMode) => setModeState(newMode);

  const currentMode = mode === 'system' ? scheme || 'light' : mode;
  const theme = currentMode === 'dark' ? darkTheme : lightTheme;
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setModeState(newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
