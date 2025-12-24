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
    {
      id: 'R3F7K1Q',
      fromDate: '2025-08-16',
      toDate: '2025-08-31',
      file: 'payslipmock.pdf',
    },
    {
      id: 'S9M2X4R',
      fromDate: '2025-09-01',
      toDate: '2025-09-15',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'T6P3L9W',
      fromDate: '2025-09-16',
      toDate: '2025-09-30',
      file: 'payslipsample.pdf',
    },
    {
      id: 'U8Q5T2N',
      fromDate: '2025-10-01',
      toDate: '2025-10-15',
      file: 'payslipmock.pdf',
    },
    {
      id: 'V2R9M6K',
      fromDate: '2025-10-16',
      toDate: '2025-10-31',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'W6W4X8P',
      fromDate: '2025-11-01',
      toDate: '2025-11-15',
      file: 'assets/others/payslipsample.zip',
    },
    {
      id: 'X9N1Q3L',
      fromDate: '2025-11-16',
      toDate: '2025-11-30',
      file: 'payslipmock.pdf',
    },
    {
      id: 'Y5K2R7T',
      fromDate: '2025-12-01',
      toDate: '2025-12-15',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'Z3P4M6X',
      fromDate: '2025-12-16',
      toDate: '2025-12-31',
      file: 'payslipsample.pdf',
    },
    {
      id: 'A1L7Q9R',
      fromDate: '2026-01-01',
      toDate: '2026-01-15',
      file: 'payslipmock.pdf',
    },
    {
      id: 'B4T2W6N',
      fromDate: '2026-01-16',
      toDate: '2026-01-31',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'C9X3P2K',
      fromDate: '2026-02-01',
      toDate: '2026-02-15',
      file: 'payslipsample.pdf',
    },
    {
      id: 'D6R4Q8T',
      fromDate: '2026-02-16',
      toDate: '2026-02-28',
      file: 'payslipmock.pdf',
    },
    {
      id: 'E1K5M9L',
      fromDate: '2026-03-01',
      toDate: '2026-03-15',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'F8T2X4R',
      fromDate: '2026-03-16',
      toDate: '2026-03-31',
      file: 'payslipsample.pdf',
    },
    {
      id: 'G3F7K5Q',
      fromDate: '2026-04-01',
      toDate: '2026-04-15',
      file: 'payslipmock.pdf',
    },
    {
      id: 'H9M1X2R',
      fromDate: '2026-04-16',
      toDate: '2026-04-30',
      file: 'payslipmock.jpeg',
    },
    {
      id: 'J6P4L8W',
      fromDate: '2026-05-01',
      toDate: '2026-05-15',
      file: 'payslipsample.pdf',
    },
    {
      id: 'K8Q3T2N',
      fromDate: '2026-05-16',
      toDate: '2026-05-31',
      file: 'payslipmock.pdf',
    },
    {
      id: 'L2R9M1K',
      fromDate: '2026-06-01',
      toDate: '2026-06-15',
      file: 'payslipmock.jpeg',
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
