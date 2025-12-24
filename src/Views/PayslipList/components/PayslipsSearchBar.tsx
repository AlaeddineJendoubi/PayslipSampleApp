import React, { FC, useRef } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../app/theme/ThemeProvider';
import { Search, X } from 'react-native-feather';
interface PayslipSearchBarProps {
  hasValue?: boolean;
  setFilter?: (filter: string) => void;
}
const UnmemoisedPayslipSearchBar: FC<PayslipSearchBarProps> = ({
  hasValue,
  setFilter,
}) => {
  const {
    theme: { colors, textStyles },
  } = useTheme();
  const inputRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    setFilter?.(text);
  };
  const handleClear = () => {
    setFilter?.('');
    inputRef.current?.clear();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[styles.input, { backgroundColor: colors.cardBackground }]}
        placeholder="Search Payslips by id , date or file type"
        onChangeText={handleTextChange}
      />
      {hasValue ? (
        <TouchableOpacity onPress={handleClear} style={styles.iconStyle}>
          <X width={15} height={15} color={textStyles?.body?.color} />
        </TouchableOpacity>
      ) : (
        <Search
          width={15}
          height={15}
          color={textStyles?.body?.color}
          style={styles.iconStyle}
        />
      )}
    </View>
  );
};

export const PayslipSearchBar = React.memo(UnmemoisedPayslipSearchBar);
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  iconStyle: {
    marginRight: 20,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});
