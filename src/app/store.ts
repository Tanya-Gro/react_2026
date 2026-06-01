import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { selectedCardsReducer } from 'features';
import { dataApi, detailsApi } from 'services';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware, detailsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
