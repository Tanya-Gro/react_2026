import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card } from 'app';

export type StoredCards = Record<string, Card>;

export interface CardState {
  items: StoredCards;
}

const initialState: CardState = {
  items: {},
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<{ id: string; card: Card }>) => {
      const { id, card } = action.payload;
      if (id in state.items) {
        delete state.items[id];
      } else {
        state.items[id] = card;
      }
    },
    clearCards: (state) => {
      state.items = {};
    },
  },
});

export const { toggleCard, clearCards } = selectedCardsSlice.actions;

export default selectedCardsSlice.reducer;
