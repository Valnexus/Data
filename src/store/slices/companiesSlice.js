import { createSlice } from '@reduxjs/toolkit';

export const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
  },
  reducers: {
    saveCompanies: (state, action) => {
      state.companies = action.payload
    },
  },
});

export const { saveCompanies } = companiesSlice.actions;

export default companiesSlice.reducer;