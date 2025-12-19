import React, { FC } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../app/theme/ThemeProvider';
import { Search, X } from 'react-native-feather';
interface PayslipSearchBarProps {
  filter?: string;
  setFilter?: (filter: string) => void;
}
export const PayslipSearchBar: FC<PayslipSearchBarProps> = ({
  filter,
  setFilter,
}) => {
  const {
    theme: { colors, textStyles },
  } = useTheme();
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: colors.cardBackground }]}
        placeholder="Search Payslips by id , date or file type"
        onChangeText={setFilter}
        value={filter}
      />
      {filter ? (
        <TouchableOpacity
          onPress={() => setFilter?.('')}
          style={styles.iconStyle}
        >
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
