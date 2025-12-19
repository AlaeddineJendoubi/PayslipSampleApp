import { TextStyle } from 'react-native';
import { lightTheme } from './themes';

export type Theme = {
  colors: {
    background: string;
    cardBackground: string;
    text: string;
    subText: string;
    buttonBackground: string;
    buttonText: string;
  };
  textStyles?: {
    header?: TextStyle;
    subheader?: TextStyle;
    body?: TextStyle;
    link?: TextStyle;
    button?: TextStyle;
  };
};

export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemeContextType = {
  theme: typeof lightTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
};
