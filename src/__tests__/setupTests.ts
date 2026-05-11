import '@testing-library/jest-dom';
import { server } from '../mocks';

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
