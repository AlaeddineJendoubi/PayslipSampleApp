import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Payslip, PaySlipState } from './types';

// Initial state for the payslip slice
const initialState: PaySlipState = {
  payslips: [
    {
      id: 'A9F3K2Q',
      fromDate: '2025-01-01',
      toDate: '2025-01-15',
      file: 'payslipmock.pdf',
    },
    {
      id: 'B7M2X8R',
      fromDate: '2025-01-16',
      toDate: '2025-01-31',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'C4P9L6W',
      fromDate: '2025-02-01',
      toDate: '2025-02-15',
      file: 'payslipsample.pdf',
    },
    {
      id: 'D8Q5T1N',
      fromDate: '2025-02-16',
      toDate: '2025-02-28',
      file: 'payslipmock.pdf',
    },
    {
      id: 'E2R7M9K',
      fromDate: '2025-03-01',
      toDate: '2025-03-15',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'F6W3X8P',
      fromDate: '2025-03-16',
      toDate: '2025-03-31',
      file: 'assets/others/payslipsample.zip',
    },
    {
      id: 'G9N4Q2L',
      fromDate: '2025-04-01',
      toDate: '2025-04-15',
      file: 'payslipmock.pdf',
    },
    {
      id: 'H5K8R7T',
      fromDate: '2025-04-16',
      toDate: '2025-04-30',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'J3P6M2X',
      fromDate: '2025-05-01',
      toDate: '2025-05-15',
      file: 'payslipsample.pdf',
    },
    {
      id: 'K8L5Q9R',
      fromDate: '2025-05-16',
      toDate: '2025-05-31',
      file: 'payslipmock.pdf',
    },
    {
      id: 'L2T7W6N',
      fromDate: '2025-06-01',
      toDate: '2025-06-15',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'M9X4P3K',
      fromDate: '2025-06-16',
      toDate: '2025-06-30',
      file: 'payslipsample.pdf',
    },
    {
      id: 'N6R8Q5T',
      fromDate: '2025-07-01',
      toDate: '2025-07-15',
      file: 'payslipmock.pdf',
    },
    {
      id: 'P1K9M7L',
      fromDate: '2025-07-16',
      toDate: '2025-07-31',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'Q8T2X6R',
      fromDate: '2025-08-01',
      toDate: '2025-08-15',
      file: 'payslipsample.pdf',
    },
  ],
};

// Create the payslip slice
const paySlipSlice = createSlice({
  name: 'payslips',
  initialState,
  reducers: {
    // Define reducers to handle actions
    addPayslip(state, action: PayloadAction<Payslip>) {
      state.payslips.push(action.payload);
    },
    removePayslip(state, action: PayloadAction<string>) {
      state.payslips = state.payslips.filter(
        payslip => payslip.id !== action.payload,
      );
    },
  },
});

export const { addPayslip, removePayslip } = paySlipSlice.actions; // Export actions for use in components
export default paySlipSlice.reducer; // Export the reducer to be included in the store
