import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card } from 'app';

export type StoredCards = Record<string, Card | undefined>;

export type CardState = {
  items: StoredCards;
};

const initialState: CardState = {
  items: {},
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<{ id: string; card: Card }>) => {
      const { id, card } = action.payload;
      state.items[id] = id in state.items ? undefined : card;
    },
    clearCards: (state) => {
      state.items = {};
    },
  },
});

export const { toggleCard, clearCards } = selectedCardsSlice.actions;

export default selectedCardsSlice.reducer;
