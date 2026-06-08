import { configureStore } from '@reduxjs/toolkit';
import { cardsSliceReducer, countrySliceReducer } from 'features';

export const store = configureStore({
  reducer: {
    cards: cardsSliceReducer,
    countries: countrySliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
