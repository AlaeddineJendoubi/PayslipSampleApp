import React from 'react';
import { PayslipItem } from './components/PayslipItem';

export const Paysliplist: React.FC = () => {
  return (
    <>
      <PayslipItem
        payslipData={{
          id: 'test1',
          fromDate: '2025-01-01',
          toDate: '2025-02-01',
          file: 'image.png',
        }}
      />
    </>
  );
};
