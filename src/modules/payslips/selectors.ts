import { RootState } from '../../app/state/store';

export const selectPayslips = (state: RootState) => state.data.payslips;
