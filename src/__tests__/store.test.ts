import { store } from 'app/store';
import { dataApi, detailsApi } from 'services';

test('Store should be initialized with correct reducers and middleware', () => {
  const state = store.getState();

  expect(state.selectedCards).toBeDefined();
  expect(state[dataApi.reducerPath]).toBeDefined();
  expect(state[detailsApi.reducerPath]).toBeDefined();

  const dataApiQueries = state[dataApi.reducerPath].queries;
  expect(dataApiQueries).toBeDefined();
});
