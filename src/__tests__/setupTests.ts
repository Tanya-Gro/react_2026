import '@testing-library/jest-dom';
import { server } from 'mocks';

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
