import React, { FC } from 'react';
import { Filter, ArrowUp, ArrowDown } from 'react-native-feather';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../app/theme/ThemeProvider';
import { Label } from '../../../components/Label';
import { SortByOptions } from '../hooks/useManagePayslips';

interface PayslipSortBarProps {
  setSortBy: (sortBy: SortByOptions) => void;
  testID?: string;
}
const UnMemoizedPayslipSortBar: FC<PayslipSortBarProps> = ({ setSortBy }) => {
  const {
    theme: { textStyles, colors },
  } = useTheme();

  return (
    <View style={styles.mainContainer}>
      <Filter width={20} height={20} color={textStyles?.body?.color} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => setSortBy('fromDateASC')}>
          <View
            style={[styles.filterItem, { backgroundColor: colors.subText }]}
          >
            <Label text="From Date" type="button" />
            <ArrowUp width={12} height={12} color={textStyles?.button?.color} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('fromDateDESC')}>
          <View
            style={[styles.filterItem, { backgroundColor: colors.subText }]}
          >
            <Label text="From Date" type="button" />
            <ArrowDown
              width={12}
              height={12}
              color={textStyles?.button?.color}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSortBy('toDateASC')}>
          <View
            style={[styles.filterItem, { backgroundColor: colors.subText }]}
          >
            <Label text="To Date" type="button" />
            <ArrowUp width={12} height={12} color={textStyles?.button?.color} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('toDateDESC')}>
          <View
            style={[styles.filterItem, { backgroundColor: colors.subText }]}
          >
            <Label text="To Date" type="button" />
            <ArrowDown
              width={12}
              height={12}
              color={textStyles?.button?.color}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('idASC')}>
          <View
            style={[styles.filterItem, { backgroundColor: colors.subText }]}
          >
            <Label text="ID" type="button" />
            <ArrowUp width={12} height={12} color={textStyles?.button?.color} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('idDESC')}>
          <View
            style={[styles.filterItem, { backgroundColor: colors.subText }]}
          >
            <Label text="ID" type="button" />
            <ArrowDown
              width={12}
              height={12}
              color={textStyles?.button?.color}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export const PayslipSortBar = React.memo(UnMemoizedPayslipSortBar);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  filterItem: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
});
