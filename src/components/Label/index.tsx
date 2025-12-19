import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../app/theme/ThemeProvider';

interface LabelProps {
  text: string;
  type?: 'header' | 'subheader' | 'body' | 'link' | 'button';
}
export const Label: React.FC<LabelProps> = ({ text, type = 'body' }) => {
  const {
    theme: { textStyles },
  } = useTheme();
  return (
    <Text
      style={
        type === 'header'
          ? textStyles?.header
          : type === 'subheader'
          ? textStyles?.subheader
          : type === 'link'
          ? textStyles?.link
          : type === 'button'
          ? textStyles?.button
          : textStyles?.body
      }
    >
      {text}
    </Text>
  );
};
