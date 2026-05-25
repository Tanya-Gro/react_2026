import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card } from 'app';

export interface CounterState {
  items: Record<string, Card>;
}

const initialState: CounterState = {
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
  },
});

export const { toggleCard } = selectedCardsSlice.actions;

export default selectedCardsSlice.reducer;
