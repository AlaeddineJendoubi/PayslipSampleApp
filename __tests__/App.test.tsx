/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-redux', () => ({
  Provider: ({ children }: any) => children,
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));
jest.mock('../src/app/state/store', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => children,
  DefaultTheme: {},
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  })),
}));

jest.mock('react-native-feather', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockIcon = () => <View />;
  return {
    Activity: MockIcon,
    Hash: MockIcon,
    Calendar: MockIcon,
    ArrowRight: MockIcon,
    FileText: MockIcon,
    Image: MockIcon,
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
