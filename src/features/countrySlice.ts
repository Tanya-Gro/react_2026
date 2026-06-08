import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type CountryState = {
  items: string[];
};

const COUNTRIES = ['Moldova', 'Russia', 'Ukraine', 'Belarus', 'Poland'];

const initialState = { items: COUNTRIES };

export const countrySlice = createSlice({
  name: 'countryState',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<string>) => {
      const country = action.payload;
      state.items.push(country);
    },
  },
});

export const { addCountry } = countrySlice.actions;

export default countrySlice.reducer;
