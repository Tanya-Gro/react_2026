import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Card } from 'src/types';

export type CardState = {
  items: Card[];
};

const initialState: CardState = {
  items: [
    {
      name: 'Card 1',
      age: 25,
      email: 'card1@example.com',
      password: 'password1',
      gender: 'male',
      country: 'Country1',
      picture: 'picture1.png',
    },
    {
      name: 'Card 2',
      age: 30,
      email: 'card2@example.com',
      password: 'password2',
      gender: 'female',
      country: 'Country2',
      picture: '',
    },
  ],
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
