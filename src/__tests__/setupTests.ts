import '@testing-library/jest-dom';
import { server } from './mocks/server';

window.scrollTo = vi.fn();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
});
