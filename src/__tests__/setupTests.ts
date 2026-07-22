import '@testing-library/jest-dom';
import { server } from 'mocks';

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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
