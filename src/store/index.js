import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './slices/companiesSlice';

export default configureStore({
  reducer: {
    companies: companiesReducer,
  },
})