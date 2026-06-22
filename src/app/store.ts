import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dataApi, detailsApi } from 'services';
import { selectedCardsReducer } from 'features';
import { useDispatch, useSelector, useStore } from 'react-redux';

const rootReducer = combineReducers({
  selectedCards: selectedCardsReducer,
  [dataApi.reducerPath]: dataApi.reducer,
  [detailsApi.reducerPath]: detailsApi.reducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(dataApi.middleware, detailsApi.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();