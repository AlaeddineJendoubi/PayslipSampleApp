export type Payslip = {
  id: string;
  fromDate: string;
  toDate: string;
  file: string;
};

export type PaySlips = Payslip[];

export interface PaySlipState {
  payslips: PaySlips;
}
