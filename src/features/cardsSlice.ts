import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card } from 'src/types';

export type CardState = {
  items: Card[];
};

const initialState: CardState = {
  items: [],
};

export const cardsSlice = createSlice({
  name: 'storedCards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<{ card: Card }>) => {
      const { card } = action.payload;
      state.items.push(card);
    },
  },
});

export const { addCard } = cardsSlice.actions;

export default cardsSlice.reducer;
