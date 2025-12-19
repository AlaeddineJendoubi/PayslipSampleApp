import { configureStore } from '@reduxjs/toolkit';
import payslipReducer from '../../modules/payslips/slice';

export const store = configureStore({
  reducer: { data: payslipReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
