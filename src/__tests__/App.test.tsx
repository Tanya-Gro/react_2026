import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { App } from 'src/App';
import type { Card } from 'src/types';

const mockCards: Card[] = [
  {
    name: 'Ivan Ivanov',
    age: 18,
    email: 'iiii@ex.ru',
    password: '*******',
    gender: 'male',
    country: 'Russia',
    picture: 'dummy',
  },
  {
    name: 'Jane Smith',
    age: 25,
    email: 'jane@example.com',
    password: '*******',
    gender: 'female',
    country: 'Canada',
    picture: '',
  },
];

const createTestStore = (cardsItems = mockCards) => {
  return configureStore({
    reducer: {
      cards: () => ({ items: cardsItems }),
      countries: () => ({ items: ['USA', 'Canada'] }),
    },
  });
};

vi.mock('helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('helpers')>();
  return {
    ...actual,
    toBase64: vi.fn().mockResolvedValue('fakeBase64'),
  };
});

describe('App Component Integration', () => {
  const originalRAF = globalThis.requestAnimationFrame;
  const originalTimeout = globalThis.setTimeout;

  beforeEach(() => {
    globalThis.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
      cb();
      return 1;
    });
    globalThis.setTimeout = vi.fn().mockImplementation((cb) => {
      cb();
      return 1;
    }) as unknown as typeof globalThis.setTimeout;
  });

  afterEach(() => {
    globalThis.requestAnimationFrame = originalRAF;
    globalThis.setTimeout = originalTimeout;
    vi.clearAllMocks();
  });

  it('renders Header, Footer and global cards list from Redux', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
    expect(screen.getByText('© Tanya-Gro, 2026')).toBeInTheDocument();

    expect(screen.getByText('Ivan Ivanov')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('opens and closes Controlled Form modal via Portal', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(
      screen.queryByText('Controlled Form', { selector: 'h2' }),
    ).not.toBeInTheDocument();

    const controlledBtn = screen.getByText('Controlled Form', {
      selector: 'button',
    });
    await user.click(controlledBtn);

    const formHeading = screen.getByRole('heading', {
      level: 2,
      name: /controlled form/i,
    });
    expect(formHeading).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    await user.click(closeButton);

    expect(
      screen.queryByRole('heading', { level: 2, name: /controlled form/i }),
    ).not.toBeInTheDocument();
  });

  it('opens Uncontrolled Form modal via Portal', async () => {
    const user = userEvent.setup();
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const uncontrolledBtn = screen.getByText('Uncontrolled Form');
    await user.click(uncontrolledBtn);

    const formHeading = screen.getByRole('heading', {
      level: 2,
      name: /uncontrolled form/i,
    });
    expect(formHeading).toBeInTheDocument();
  });
});
