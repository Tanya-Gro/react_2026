import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { ControlledForm } from 'components';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { Card } from 'src/types';

const mockAddCard = vi.fn();
const mockAddCountry = vi.fn();

vi.mock('features', async (importOriginal) => {
  const actual = await importOriginal<typeof import('features')>();
  return {
    ...actual,
    addCard: (payload: { card: Card }) => {
      mockAddCard(payload);
      return actual.addCard(payload);
    },
    addCountry: (payload: string) => {
      mockAddCountry(payload);
      return actual.addCountry(payload);
    },
  };
});

vi.mock('helpers', () => ({
  toBase64: vi.fn().mockResolvedValue('fakeBase64'),
}));

const mockData: Card = {
  name: 'Ivan Ivanova',
  age: 18,
  email: 'iiii@ex.ru',
  password: '*******',
  gender: 'male',
  country: 'Russia',
  picture: 'dummy',
};

const createTestStore = (initialCountries = ['Russia', 'Moldova']) => {
  return configureStore({
    reducer: {
      countries: () => ({ items: initialCountries }),
    },
  });
};

describe('ControlledForm', () => {
  it('submits valid data and dispatches actions', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <ControlledForm onSuccess={onSuccess} />
      </Provider>,
    );

    await user.type(screen.getByLabelText(/name/i), mockData.name);
    await user.type(screen.getByLabelText(/age/i), mockData.age.toString());
    await user.type(screen.getByLabelText(/email/i), mockData.email);
    await user.type(screen.getByLabelText(/password/i), mockData.password);
    await user.selectOptions(screen.getByLabelText(/gender/i), mockData.gender);
    await user.type(screen.getByLabelText(/country/i), mockData.country);

    const file = new File(['dummy content'], 'avatar.png', {
      type: 'image/png',
    });
    const fileInput = screen.getByLabelText(/profile picture/i);
    await user.upload(fileInput, file);

    const submitButton = screen.getByRole('button', { name: /submit card/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    expect(mockAddCard).toHaveBeenCalledWith({
      card: {
        name: mockData.name,
        age: mockData.age,
        email: mockData.email,
        password: mockData.password,
        gender: mockData.gender,
        country: mockData.country,
        picture: 'fakeBase64',
      },
    });

    expect(mockAddCountry).not.toHaveBeenCalled();
  });

  it('dispatches addCountry action if country is new', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    const store = createTestStore(['Russia', 'Moldova']);

    render(
      <Provider store={store}>
        <ControlledForm onSuccess={onSuccess} />
      </Provider>,
    );

    await user.type(screen.getByLabelText(/name/i), mockData.name);
    await user.type(screen.getByLabelText(/age/i), mockData.age.toString());
    await user.type(screen.getByLabelText(/email/i), mockData.email);
    await user.type(screen.getByLabelText(/password/i), mockData.password);
    await user.selectOptions(screen.getByLabelText(/gender/i), mockData.gender);

    await user.type(screen.getByLabelText(/country/i), 'france');

    const file = new File(['dummy content'], 'avatar.png', {
      type: 'image/png',
    });
    await user.upload(screen.getByLabelText(/profile picture/i), file);

    await user.click(screen.getByRole('button', { name: /submit card/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });

    expect(mockAddCountry).toHaveBeenCalledWith('France');
  });
});
