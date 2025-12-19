import { Theme } from './types';

export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    cardBackground: '#F8F8F8',
    text: '#000000',
    subText: '#555555',
    buttonBackground: '#007BFF',
    buttonText: '#FFFFFF',
  },
  textStyles: {
    header: { color: '#000000', fontSize: 24 },
    subheader: { color: '#333333', fontSize: 18 },
    body: { color: '#000000', fontSize: 12 },
    link: { color: '#007BFF', fontSize: 12, textDecorationLine: 'underline' },
    button: { color: '#d8d6d6ff', fontSize: 10, fontWeight: 'bold' },
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#121212',
    cardBackground: '#1E1E1E',
    text: '#FFFFFF',
    subText: '#AAAAAA',
    buttonBackground: '#1E90FF',
    buttonText: '#FFFFFF',
  },
  textStyles: {
    header: { color: '#FFFFFF', fontSize: 24 },
    subheader: { color: '#CCCCCC', fontSize: 18 },
    body: { color: '#FFFFFF', fontSize: 12 },
    link: { color: '#007BFF', fontSize: 12, textDecorationLine: 'underline' },
    button: { color: '#d8d6d6ff', fontSize: 10, fontWeight: 'bold' },
  },
};
